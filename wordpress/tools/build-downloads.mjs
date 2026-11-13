#!/usr/bin/env node
/**
 * Builds the two downloadable packages into public/downloads/:
 *
 *   mr-store-elementor.zip   – WordPress plugin + the 9 Elementor templates +
 *                              tools + README + a ready-to-upload plugin zip
 *   mr-store-standalone.zip  – the React prototype compiled to ONE standalone
 *                              index.html (CSS + JS inlined, hash routing) plus
 *                              the hero media files
 *
 * Run it inside the app container (needs node_modules), e.g.
 *   docker compose --project-name app --project-directory "$BASE44_PROJECT_ROOT" \
 *     -f "$BASE44_CONFIG_ROOT/docker-compose.base44.yml" \
 *     exec -T web node wordpress/tools/build-downloads.mjs
 */
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { deflateRawSync } from 'node:zlib'
import { fileURLToPath } from 'node:url'

const toolsDir = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(toolsDir, '../..')
const wpDir = path.join(root, 'wordpress')
const outDir = path.join(root, 'public', 'downloads')

/* ------------------------------------------------------------------ *
 * Minimal ZIP writer (deflate, UTF-8 names) — no external dependency  *
 * ------------------------------------------------------------------ */
const CRC_TABLE = (() => {
  const table = new Int32Array(256)
  for (let i = 0; i < 256; i += 1) {
    let c = i
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    table[i] = c
  }
  return table
})()

function crc32(buffer) {
  let crc = -1
  for (let i = 0; i < buffer.length; i += 1) {
    crc = (crc >>> 8) ^ CRC_TABLE[(crc ^ buffer[i]) & 0xff]
  }
  return (crc ^ -1) >>> 0
}

function dosDateTime(date) {
  const time = (date.getHours() << 11) | (date.getMinutes() << 5) | (date.getSeconds() >> 1)
  const day = ((date.getFullYear() - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate()
  return { time, day }
}

function writeZip(zipPath, entries) {
  const { time, day } = dosDateTime(new Date())
  const locals = []
  const central = []
  let offset = 0

  for (const entry of entries) {
    const name = Buffer.from(entry.name, 'utf8')
    const raw = entry.data
    const deflated = deflateRawSync(raw, { level: 9 })
    const useDeflate = deflated.length < raw.length
    const data = useDeflate ? deflated : raw
    const crc = crc32(raw)

    const local = Buffer.alloc(30)
    local.writeUInt32LE(0x04034b50, 0)
    local.writeUInt16LE(20, 4)
    local.writeUInt16LE(0x0800, 6)
    local.writeUInt16LE(useDeflate ? 8 : 0, 8)
    local.writeUInt16LE(time, 10)
    local.writeUInt16LE(day, 12)
    local.writeUInt32LE(crc, 14)
    local.writeUInt32LE(data.length, 18)
    local.writeUInt32LE(raw.length, 22)
    local.writeUInt16LE(name.length, 26)
    local.writeUInt16LE(0, 28)
    locals.push(local, name, data)

    const dir = Buffer.alloc(46)
    dir.writeUInt32LE(0x02014b50, 0)
    dir.writeUInt16LE(0x031e, 4)
    dir.writeUInt16LE(20, 6)
    dir.writeUInt16LE(0x0800, 8)
    dir.writeUInt16LE(useDeflate ? 8 : 0, 10)
    dir.writeUInt16LE(time, 12)
    dir.writeUInt16LE(day, 14)
    dir.writeUInt32LE(crc, 16)
    dir.writeUInt32LE(data.length, 20)
    dir.writeUInt32LE(raw.length, 24)
    dir.writeUInt16LE(name.length, 28)
    dir.writeUInt16LE(0, 30)
    dir.writeUInt16LE(0, 32)
    dir.writeUInt16LE(0, 34)
    dir.writeUInt16LE(0, 36)
    dir.writeUInt32LE((0o100644 << 16) >>> 0, 38)
    dir.writeUInt32LE(offset, 42)
    central.push(dir, name)

    offset += local.length + name.length + data.length
  }

  const centralBuffer = Buffer.concat(central)
  const eocd = Buffer.alloc(22)
  eocd.writeUInt32LE(0x06054b50, 0)
  eocd.writeUInt16LE(0, 4)
  eocd.writeUInt16LE(0, 6)
  eocd.writeUInt16LE(entries.length, 8)
  eocd.writeUInt16LE(entries.length, 10)
  eocd.writeUInt32LE(centralBuffer.length, 12)
  eocd.writeUInt32LE(offset, 16)
  eocd.writeUInt16LE(0, 20)

  fs.mkdirSync(path.dirname(zipPath), { recursive: true })
  fs.writeFileSync(zipPath, Buffer.concat([...locals, centralBuffer, eocd]))
  return fs.statSync(zipPath).size
}

/** Collect every file below `dir` as { relativePath, absolutePath }. */
function walk(dir, base = dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .sort((a, b) => a.name.localeCompare(b.name))
    .flatMap((entry) => {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) return walk(full, base)
      return [{ rel: path.relative(base, full).split(path.sep).join('/'), full }]
    })
}

const entriesFrom = (dir, prefix = '') =>
  walk(dir).map(({ rel, full }) => ({ name: prefix + rel, data: fs.readFileSync(full) }))

/* ------------------------------------------------------------------ *
 * 1. WordPress package                                                *
 * ------------------------------------------------------------------ */
const packageReadme = `${fs.readFileSync(path.join(wpDir, 'README.md'), 'utf8').trim()}

---

## محتوای این آرشیو (mr-store-elementor.zip)

\`\`\`
mr-store-wordpress/
├── README.md                         ← همین راهنما (نصب، Import، تنظیمات)
├── mr-store-elementor/               ← افزونه وردپرس (PHP + CSS + JS + media + data)
├── templates/                        ← ۹ فایل JSON المنتور
│   ├── home.json          products.json      suppliers.json
│   ├── wholesale.json     partnership.json   about.json
│   ├── contact.json       header.json        footer.json
├── tools/                            ← ساخت و اعتبارسنجی قالب‌ها (Node 18+)
│   ├── build-templates.mjs
│   ├── validate-templates.mjs
│   └── check-assets.mjs
└── wp-install/mr-store-elementor-plugin.zip  ← همین افزونه، آمادهٔ «بارگذاری افزونه»
\`\`\`

مسیر رسانه‌ها (فیلم و پوستر هیرو) داخل افزونه:
\`mr-store-elementor/assets/media/\` — از پنل ویجت «هیرو سینمایی» هم می‌توانید فایل دیگری انتخاب کنید.

### دارایی‌های بیرونی

| مورد | محل |
|---|---|
| فیلم و پوستر هیرو | همراه آرشیو، داخل افزونه |
| فونت‌ها (Vazirmatn، Fraunces) | Google Fonts — افزونه آن‌ها را enqueue می‌کند؛ برای سایت ایرانی از Elementor → Custom Fonts استفاده کنید |
| تصاویر قالب‌ها | فعلاً از Unsplash بارگذاری می‌شوند؛ در ادیتور با تصویر کتابخانه رسانه جایگزین کنید |
| دادهٔ کاتالوگ، بازارها، تأمین‌کنندگان، مرزهای جغرافیایی | \`mr-store-elementor/assets/data/*.json\` |

### نصب سریع

1. \`wp-install/mr-store-elementor-plugin.zip\` را از **افزونه‌ها → افزودن → بارگذاری افزونه** نصب و فعال کنید.
2. برای هفت صفحه، در ادیتور المنتور از پوشهٔ قالب‌ها فایل JSON همان صفحه را Import کنید.
3. \`header.json\` و \`footer.json\` را در **Theme Builder** ببندید.
4. جزئیات کامل در بخش‌های ۲ تا ۱۱ همین README.
`

const pluginZip = path.join(os.tmpdir(), 'mr-store-elementor-plugin.zip')
writeZip(pluginZip, entriesFrom(path.join(wpDir, 'mr-store-elementor'), 'mr-store-elementor/'))

const wpEntries = [
  { name: 'mr-store-wordpress/README.md', data: Buffer.from(packageReadme, 'utf8') },
  ...entriesFrom(path.join(wpDir, 'mr-store-elementor'), 'mr-store-wordpress/mr-store-elementor/'),
  ...entriesFrom(path.join(wpDir, 'templates'), 'mr-store-wordpress/templates/'),
  ...entriesFrom(path.join(wpDir, 'tools'), 'mr-store-wordpress/tools/'),
  { name: 'mr-store-wordpress/wp-install/mr-store-elementor-plugin.zip', data: fs.readFileSync(pluginZip) },
]
const wpSize = writeZip(path.join(outDir, 'mr-store-elementor.zip'), wpEntries)

/* ------------------------------------------------------------------ *
 * 2. Standalone single-file HTML build                                *
 * ------------------------------------------------------------------ */
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'mr-standalone-'))
const read = (rel) => fs.readFileSync(path.join(root, rel), 'utf8')
const write = (rel, content) => {
  fs.mkdirSync(path.dirname(path.join(temp, rel)), { recursive: true })
  fs.writeFileSync(path.join(temp, rel), content)
}

fs.cpSync(path.join(root, 'src'), path.join(temp, 'src'), { recursive: true })
write('index.html', read('index.html'))

// Hash routing + document-relative media so the file works from any folder
// (and straight from the filesystem).
write(
  'src/main.jsx',
  read('src/main.jsx')
    .replaceAll('BrowserRouter', 'HashRouter'),
)
write(
  'src/components/CinematicHero.jsx',
  read('src/components/CinematicHero.jsx')
    .replace("const HERO_VIDEO = '/hero-cinematic.mp4'", "const HERO_VIDEO = './media/hero-cinematic.mp4'")
    .replace("const POSTER = '/hero-poster.jpg'", "const POSTER = './media/hero-poster.jpg'"),
)

fs.symlinkSync(path.join(root, 'node_modules'), path.join(temp, 'node_modules'), 'dir')

write(
  'vite.config.mjs',
  `import fs from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Inline the emitted CSS/JS into index.html so the export is one portable file.
function singleFile() {
  return {
    name: 'mr-single-file',
    apply: 'build',
    enforce: 'post',
    writeBundle(options) {
      const dir = options.dir
      const assetsDir = path.join(dir, 'assets')
      const htmlPath = path.join(dir, 'index.html')
      let html = fs.readFileSync(htmlPath, 'utf8')
      for (const file of fs.readdirSync(assetsDir)) {
        const body = fs.readFileSync(path.join(assetsDir, file), 'utf8')
        // Function replacers: bundle text contains \`$\` sequences that a plain
        // replacement string would interpret.
        if (file.endsWith('.css')) {
          html = html.replace(/<link[^>]*>/g, (tag) =>
            tag.includes(file) ? '<style>\\n' + body + '\\n</style>' : tag,
          )
        } else if (file.endsWith('.js')) {
          html = html.replace(/<script[^>]*><\\/script>/g, (tag) =>
            tag.includes(file) ? '<script type="module">\\n' + body + '\\n</script>' : tag,
          )
        }
      }
      fs.rmSync(assetsDir, { recursive: true, force: true })
      fs.writeFileSync(htmlPath, html)
    },
  }
}

export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss(), singleFile()],
  build: {
    target: 'es2019',
    modulePreload: false,
    cssCodeSplit: false,
    assetsInlineLimit: 100000000,
    rollupOptions: {
      output: {
        format: 'iife',
        inlineDynamicImports: true,
        entryFileNames: 'assets/app.js',
        assetFileNames: 'assets/app.[ext]',
      },
    },
  },
})
`,
)

execFileSync(
  process.execPath,
  [path.join(root, 'node_modules', 'vite', 'bin', 'vite.js'), 'build', '--logLevel', 'warn'],
  { cwd: temp, stdio: 'inherit' },
)

const distHtml = fs.readFileSync(path.join(temp, 'dist', 'index.html'), 'utf8')
if (!distHtml.includes('<style>') || distHtml.includes('assets/app.js')) {
  throw new Error('standalone build did not inline its CSS/JS')
}

const standaloneReadme = `# MR Store — نسخهٔ استاتیک مستقل (Standalone HTML)

این پوشه، کل سایت (هفت صفحه، هیرو سینمایی، قاب گیاهی، نقشه اوراسیا، سبد استعلام) را در یک فایل
\`index.html\` دارد: تمام CSS و JavaScript داخل همان فایل inline شده‌اند و مسیریابی از نوع hash
(\`#/products\`) است.

## استفاده

- ساده‌ترین راه: فایل \`index.html\` را با دوبار کلیک در مرورگر باز کنید.
- یا روی هر هاست استاتیک (Netlify، Cloudflare Pages، یک پوشه روی هاست اشتراکی، …) کل پوشه را آپلود کنید.

برای سرو محلی:

\`\`\`bash
cd mr-store-standalone
python3 -m http.server 8080
# سپس http://localhost:8080
\`\`\`

## مسیرها

\`#/\` خانه · \`#/products\` محصولات · \`#/suppliers\` تأمین‌کنندگان · \`#/wholesale\` عمده‌فروشی ·
\`#/partnership\` همکاری · \`#/about\` درباره ما · \`#/contact\` تماس

## نکته‌ها

- فونت‌ها (Vazirmatn و Fraunces) و تصاویر محصولات از CDN (Google Fonts و Unsplash) بارگذاری می‌شوند؛
  برای اجرای کاملاً آفلاین باید آن‌ها را محلی کنید.
- فیلم و پوستر هیرو در پوشهٔ \`media/\` هستند و همان‌جا باید بمانند.
- نسخهٔ وردپرسی (قابل ویرایش در المنتور) در آرشیو \`mr-store-elementor.zip\` است.
`

const standaloneEntries = [
  { name: 'mr-store-standalone/index.html', data: Buffer.from(distHtml, 'utf8') },
  { name: 'mr-store-standalone/README.md', data: Buffer.from(standaloneReadme, 'utf8') },
  { name: 'mr-store-standalone/media/hero-cinematic.mp4', data: fs.readFileSync(path.join(root, 'public/hero-cinematic.mp4')) },
  { name: 'mr-store-standalone/media/hero-poster.jpg', data: fs.readFileSync(path.join(root, 'public/hero-poster.jpg')) },
]
const standaloneSize = writeZip(path.join(outDir, 'mr-store-standalone.zip'), standaloneEntries)

fs.rmSync(temp, { recursive: true, force: true })
fs.rmSync(pluginZip, { force: true })

console.log(`mr-store-elementor.zip  ${(wpSize / 1024 / 1024).toFixed(2)} MB · ${wpEntries.length} files`)
console.log(`mr-store-standalone.zip  ${(standaloneSize / 1024 / 1024).toFixed(2)} MB · ${standaloneEntries.length} files`)
console.log(`output: ${outDir}`)
