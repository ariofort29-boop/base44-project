# تبدیل MR Store به ساختار Native وردپرس + المنتور

این پوشه خروجی کامل و واقعی وردپرس/المنتور است: یک **افزونه وردپرس** با ویجت‌های اختصاصی المنتور، **فایل‌های JSON استاندارد المنتور** برای هفت صفحه و برای هدر/فوتر، و فایل‌های **CSS و JavaScript** موردنیاز.

هیچ بخشی از سایت با «HTML Widget» ساخته نشده است. هر جا المنتور قابلیت Native داشت (Container، Heading، Text Editor، Image، Button، Icon Box، Image Box، Icon List، Counter، Divider، Video، Nav Menu، Form) از همان ویجت استفاده شده؛ و هر جا Native وجود نداشت (فیلم هیرو با اسکرول، قاب گیاهی، نقشه اوراسیا، شبکه کاتالوگ) یک **ویجت واقعی المنتور** در افزونه ثبت شده که مثل بقیه ویجت‌ها در پنل المنتور شناسه، تنظیمات و کنترل دارد.

---

## ۰. دانلود آرشیوهای ZIP

دو آرشیو آماده در همین محیط ساخته شده و از خود سایت قابل دانلود است:

| آرشیو | آدرس در پیش‌نمایش | محتوا |
|---|---|---|
| `mr-store-elementor.zip` | `/downloads/mr-store-elementor.zip` | افزونهٔ کامل + ۹ قالب JSON المنتور + ابزارها + README + `wp-install/mr-store-elementor-plugin.zip` (آمادهٔ بارگذاری در وردپرس) |
| `mr-store-standalone.zip` | `/downloads/mr-store-standalone.zip` | نسخهٔ استاتیک تک‌فایلی سایت (`index.html` با CSS/JS داخلی) + فیلم و پوستر هیرو + README |

آدرس کامل هر فایل روی همان دامنه‌ای است که پیش‌نمایش را باز کرده‌اید (پورت ۳۰۰۰).

### بازتولید آرشیوها

هر دو ZIP با یک اسکریپت ساخته می‌شوند (از داخل سرویس اپ که `node_modules` دارد):

```bash
docker compose --project-name app --project-directory "$BASE44_PROJECT_ROOT" \
  -f "$BASE44_CONFIG_ROOT/docker-compose.base44.yml" \
  exec -T web node wordpress/tools/build-downloads.mjs
```

اسکریپت ابتدا کل پروژهٔ React را در یک فایل `index.html` مستقل بیلد می‌کند (مسیریابی hash،
مسیرهای نسبی رسانه) و بعد هر دو ZIP را در `public/downloads/` می‌نویسد.

---

## ۱. محتوای بسته

```
wordpress/
├── mr-store-elementor/                  ← افزونه وردپرس (این پوشه را در wp-content/plugins قرار دهید)
│   ├── mr-store-elementor.php            ثبت ویجت‌ها، دسته «MR Store»، بارگذاری CSS/JS، لوکیشن هدر/فوتر
│   ├── includes/
│   │   ├── class-mr-store-data.php        خواندن داده‌های کاتالوگ/بازارها از JSON
│   │   ├── class-mr-store-quote-basket.php سبد استعلام (CPT + AJAX + ایمیل + دیالوگ)
│   │   └── widgets/
│   │       ├── class-mr-store-widget-hero.php            ویجت «هیرو سینمایی»
│   │       ├── class-mr-store-widget-botanical-card.php  ویجت «کارت گیاهی»
│   │       ├── class-mr-store-widget-eurasia-map.php     ویجت «نقشه بازارهای اوراسیا»
│   │       └── class-mr-store-widget-catalog-grid.php    ویجت «شبکه محصولات و تأمین‌کنندگان»
│   ├── assets/
│   │   ├── css/mr-store.css              استایل‌های پایه و انیمیشن‌ها
│   │   ├── js/mr-hero.js                 اسکراب فیلم با اسکرول
│   │   ├── js/mr-botanical.js            رسم قاب گیاهی
│   │   ├── js/mr-map.js                  نقشه اوراسیا (Albers equal-area)
│   │   ├── js/mr-quote.js                سبد استعلام
│   │   ├── media/hero-cinematic.mp4      فیلم هیرو (همراه بسته)
│   │   ├── media/hero-poster.jpg         پوستر هیرو
│   │   └── data/*.json                   محصولات، تأمین‌کنندگان، بازارها، مرزهای جغرافیایی
├── templates/                           ← فایل‌های Import المنتور
│   ├── home.json            (type: page)
│   ├── products.json        (type: page)
│   ├── suppliers.json       (type: page)
│   ├── wholesale.json       (type: page)
│   ├── partnership.json     (type: page)
│   ├── about.json           (type: page)
│   ├── contact.json         (type: page)
│   ├── header.json          (type: header — Theme Builder)
│   └── footer.json          (type: footer — Theme Builder)
└── tools/
    ├── build-templates.mjs      بازتولید فایل‌های JSON
    ├── validate-templates.mjs   اعتبارسنجی ساختار Elementor
    └── check-assets.mjs         بررسی هم‌خوانی مارک‌آپ PHP با CSS/JS
```

---

## ۲. پیش‌نیازها

| مورد | حداقل | توضیح |
|---|---|---|
| WordPress | ۶٫۲ | — |
| PHP | ۷٫۴ | — |
| Elementor | **۳٫۱۶** | با **Flexbox Container فعال** (پیش‌فرض از ۳٫۱۶). قالب‌ها با Container ساخته شده‌اند، نه Section/Column قدیمی. |
| Elementor Pro | آخرین نسخه | فقط برای **ویجت Form** (صفحه تماس)، **ویجت Nav Menu** (هدر) و **Theme Builder** (هدر/فوتر). بدون Pro، بقیه صفحات کار می‌کنند؛ فرم را با Contact Form 7 یا فرم Elementor Free جایگزین کنید. |
| قالب | Hello Elementor | قالب سبک و سازگار با Theme Builder. |

---

## ۳. نصب

1. پوشه `mr-store-elementor` را در `wp-content/plugins/` کپی کنید (یا از آن یک zip بسازید و از **افزونه‌ها → افزودن → بارگذاری افزونه** نصب کنید):

   ```bash
   cd wordpress && zip -r mr-store-elementor.zip mr-store-elementor
   ```

2. **افزونه‌ها → افزونه‌های نصب‌شده → MR Store — Elementor Marketplace Kit → فعال‌سازی**.
3. در پنل المنتور، دسته **MR Store** با چهار ویجت ظاهر می‌شود:
   - MR — هیرو سینمایی
   - MR — کارت گیاهی
   - MR — نقشه بازارهای اوراسیا
   - MR — شبکه محصولات و تأمین‌کنندگان

> اگر پیام «MR Store templates need Elementor 3.16…» را دیدید، المنتور نصب/فعال نیست یا نسخه‌اش قدیمی‌تر است.

---

## ۴. تنظیمات پایه المنتور (یک‌بار)

**Elementor → Site Settings**

- **Global Colors** (اختیاری، چون رنگ‌ها در خود ویجت‌ها هم ست شده‌اند):
  `#071710` (پس‌زمینه) · `#05100b` (عمیق) · `#10291f` (سطح) · `#0a1e16` (سطح ۲) · `#1f8a5f` (سبز برند) · `#45c58c` (سبز روشن) · `#c98a5e` (خاکی) · `#f0d9b8` (طلایی روشن) · `#a9c3b2` (متن) · `#f6f1e6` (عاجی)
- **Global Fonts**: `Vazirmatn` برای متن و `Fraunces` برای تیترهای نمایشی.
  اگر این دو فونت در فهرست المنتور نبودند: **Elementor → Custom Fonts** و فایل‌های woff2 را اضافه کنید (افزونه هم Google Fonts را enqueue می‌کند، ولی Custom Fonts برای سایت ایرانی مطمئن‌تر است).
- **Layout → Content Width**: `1140px` (قالب‌ها با `boxed` کار می‌کنند).
- **زبان سایت**: اگر سایت فارسی است، `fa_IR` را تنظیم کنید تا المنتور RTL بسازد. چیدمان قالب‌ها طوری نوشته شده که در هر دو حالت درست بماند.

**Appearance → Menus**: یک منو با نام/اسلاگ `main-menu` بسازید (صفحات: خانه، محصولات، تأمین‌کنندگان، عمده‌فروشی، همکاری، درباره ما، تماس). ویجت Nav Menu در هدر به همین منو وصل است؛ از پنل ویجت می‌توانید منوی دیگری انتخاب کنید.

---

## ۵. Import صفحات

برای هر صفحه از `templates/` دو راه دارید:

**راه الف — از داخل صفحه (ساده‌تر)**

1. **برگه‌ها → افزودن برگه** (مثلاً «خانه») → **Edit with Elementor**.
2. در ادیتور، روی آیکن **پوشه (Add Template)** کلیک کنید → تب **My Templates** → **Import** → فایل `home.json` را بدهید → **Insert**.
3. **Publish**. اگر المنتور پرسید «Apply the template's page settings?» گزینه تأیید را بزنید (قالب صفحه = Elementor Full Width، عنوان صفحه مخفی).

**راه ب — از کتابخانه قالب‌ها**

1. **Templates → Saved Templates → Import Templates** → فایل JSON را بارگذاری کنید.
2. سپس در صفحه، از پوشه قالب‌ها همان قالب را Insert کنید.

> برای هر برگه فقط یک قالب Insert کنید. اگر محتوای قبلی مانده بود، اول آن را پاک کنید.

نگاشت فایل‌ها به صفحات:

| فایل | صفحه وردپرس | اسلاگ پیشنهادی |
|---|---|---|
| `home.json` | خانه | `/` |
| `products.json` | محصولات | `/products/` |
| `suppliers.json` | تأمین‌کنندگان | `/suppliers/` |
| `wholesale.json` | عمده‌فروشی | `/wholesale/` |
| `partnership.json` | همکاری | `/partnership/` |
| `about.json` | درباره ما | `/about/` |
| `contact.json` | تماس | `/contact/` |

> اگر اسلاگ‌ها را تغییر می‌دهید، لینک دکمه‌ها را در المنتور به‌روزرسانی کنید (لینک‌ها در قالب‌ها به شکل `/products/` و… نوشته شده‌اند).

---

## ۶. هدر و فوتر (Theme Builder — Elementor Pro)

1. **Templates → Theme Builder → Header → Add New**.
2. نام بگذارید و **Edit with Elementor** را بزنید؛ سپس از پوشه قالب‌ها `header.json` را Insert کنید (یا اگر پس از Import در `templates/header.json` در فهرست Headers دیده شد، مستقیم ویرایشش کنید).
3. **Publish → Display Conditions → Entire Site** (یا فقط صفحات داخلی، اگر می‌خواهید هیرو صفحه اصلی نوار برند خودش را داشته باشد).
4. همین کار را با `footer.json` برای **Footer** تکرار کنید.

---

## ۷. سبد استعلام (به‌جای قیمت)

- همه دکمه‌های «تماس با ما» و «استعلام قیمت عمده» به سبد استعلام اضافه می‌کنند؛ سبد در پایین صفحه شناور است و با `localStorage` بین بازدیدها می‌ماند.
- ارسال فرم به `admin-ajax.php` می‌رود و در پیشخوان، منوی **استعلام‌های عمده** ذخیره می‌شود (نام، شرکت، ایمیل، کشور، اقلام، متن) و به ایمیل مدیر سایت (`admin_email`) ارسال می‌شود.
- برای دریافت ایمیل درست، **تنظیمات → عمومی → ایمیل مدیر** را بررسی کنید و یک افزونه SMTP نصب کنید.

---

## ۸. نگاشت کامپوننت‌های پروژه به المنتور

| بخش سایت (React) | ساختار المنتور |
|---|---|
| `CinematicHero` | ویجت `mr-hero` (فیلم + اسکراب + نوار برند + آمار) |
| `TrustBadges` | Container + چهار `icon-box` |
| `CategoryStrip` | Container + هشت `icon-box` با `_element_width: 12.5%` |
| `MainCategories` | Heading + Button + سه ویجت `mr-botanical-card` |
| `FeaturedProducts` | ویجت `mr-catalog-grid` (منبع: محصولات) |
| `WholesaleBand` | Container با Background Image + Overlay + دو Button + سه `icon-box` |
| `EurasiaMarkets` / `EurasiaMap` | ویجت `mr-eurasia-map` |
| `MidSection` | سه ستون: `icon-list` + دو `image-box` + `icon-list` و Button |
| `ExplorePaths` | شش ستون: `icon-box` + Button |
| `TradeContact` | Container تیره + Heading/Text/Button + چهار `icon-box` |
| `PageHeader` (همه صفحات) | Container + `text-editor` (برچسب) + `heading` (H1) + `text-editor` |
| صفحه محصولات (جستجو/فیلتر/مرتب‌سازی) | ویجت `mr-catalog-grid` با `show_filters: yes` |
| صفحه تأمین‌کنندگان | ویجت `mr-catalog-grid` (منبع: تأمین‌کنندگان) |
| فرم تماس | ویجت `form` (Elementor Pro) با فیلدهای واقعی |
| سبد استعلام | افزونه (خارج از محتوا، در `wp_footer`) |

---

## ۹. چه چیزی تأیید شد و چه چیزی باید روی وردپرس خودتان تست شود

در این محیط، وردپرس/المنتور نصب نیست؛ بنابراین Import و رندر ادیتور **اینجا قابل اجرا نیست**. به‌جای آن این بررسی‌ها اجرا و پاس شده‌اند:

| بررسی | ابزار | نتیجه |
|---|---|---|
| ساختار JSON هر ۹ قالب (elType/widgetType/id/settings/elements/isInner/یکتایی id/page_settings) | `tools/validate-templates.mjs` | ✅ پاس |
| وجود ویجت‌های استفاده‌شده (۱۱ نوع Native + ۴ ویجت افزونه) و پرشدن کنترل‌های الزامی هر ویجت | همان اسکریپت | ✅ پاس |
| این‌که هر تنظیم ویجت‌های اختصاصی در JSON، کنترلی واقعی در PHP همان ویجت باشد | همان اسکریپت | ✅ پاس |
| نبود ویجت `html` در هیچ قالبی | همان اسکریپت | ✅ پاس |
| نحو PHP همه فایل‌های افزونه (`php -l` روی PHP 8.2) | `php -l` | ✅ پاس |
| نحو JavaScript فایل‌های افزونه (`node --check`) | Node 22 | ✅ پاس |
| هم‌خوانی کلاس‌ها و هوک‌های مارک‌آپ PHP با CSS/JS | `tools/check-assets.mjs` | ✅ پاس |

بعد از Import، این موارد را یک‌بار چشمی تست کنید (چون فقط در وردپرس واقعی معنا دارند):

- باز شدن هر صفحه در Elementor Editor بدون «در حال بارگذاری» یا محتوای ناقص.
- ویرایش متن/تصویر/رنگ هر ویجت و دیدن تغییر در Preview.
- نمایش درست در حالت موبایل (دکمه Responsive در پایین ادیتور) — قالب‌ها برای موبایل Padding و اندازه فونت جدا دارند.
- اسکرول هیرو (فیلم باید جلو/عقب برود؛ اگر دستگاه `prefers-reduced-motion` فعال داشته باشد، پوستر ثابت می‌ماند — این عمدی است).
- ارسال یک استعلام تستی و دیدن آن در منوی «استعلام‌های عمده».

---

## ۱۰. بازتولید و ویرایش قالب‌ها

بعد از هر تغییر در محتوا می‌توانید JSON را از نو بسازید (نیاز به وردپرس ندارد، فقط Node 18+):

```bash
cd wordpress/tools
node build-templates.mjs        # بازنویسی templates/*.json
node validate-templates.mjs     # اعتبارسنجی ساختار
node check-assets.mjs           # بررسی CSS/JS
```

محتوا و چیدمان در `build-templates.mjs` تعریف شده‌اند (هر صفحه یک تابع). ویرایش‌های بعدی را می‌توانید هم در همان فایل انجام دهید و JSON را دوباره بسازید، هم مستقیم در ادیتور المنتور.

---

## ۱۱. نکات و محدودیت‌ها

- **تصاویر**: تصاویر قالب‌ها فعلاً از Unsplash بارگذاری می‌شوند. برای سایت نهایی، هر Image/Image Box را با تصویر کتابخانه رسانه خودتان عوض کنید (روی تصویر در ادیتور کلیک کنید).
- **فیلم هیرو**: مسیر پیش‌فرض `/wp-content/plugins/mr-store-elementor/assets/media/` است؛ از کنترل «فیلم هیرو» می‌توانید فایل رسانه خودتان را انتخاب کنید.
- **ویجت‌های Pro**: `form` و `nav-menu` فقط با Elementor Pro کار می‌کنند. اگر Pro ندارید، این دو ویجت را حذف/جایگزین کنید؛ بقیه صفحات مستقل هستند.
- **قاب گیاهی و نقشه**: با JavaScript رسم می‌شوند. بدون JS، متن و لینک‌ها و دکمه‌ها همچنان کار می‌کنند (نقشه به فهرست کشورها تکیه می‌کند).
- **آمار هیرو و Counterها** اعدادی هستند که در پروژه وجود داشتند؛ از پنل ویجت قابل ویرایش‌اند و «تأییدشده» فقط یک برچسب است، نه داده واقعی.
- **فیلتر صنعت در صفحه محصولات**: با پارامتر `?category=cosmetics|fmcg|organic` کار می‌کند؛ جستجو با `?mr_q=` و مرتب‌سازی با `?mr_sort=rating|name`.
- **کشورهای نقشه** از داده Natural Earth (public domain) می‌آیند؛ ویرایش متن بازارها در `assets/data/markets.json` است.
