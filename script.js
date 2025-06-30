// مطمئن می‌شویم که Telegram Web App API بارگذاری شده است
if (window.Telegram && window.Telegram.WebApp) {
    const WebApp = window.Telegram.WebApp;

    // وب اپ را برای کاربر آماده نمایش می‌کنیم
    WebApp.ready();

    // متغیر برای نگهداری امتیاز
    let score = 0;
    const scoreDisplay = document.getElementById('currentScore');
    const tapButton = document.getElementById('tapButton');
    const sunIcon = document.querySelector('.sun-icon');

    // تابع برای افزایش امتیاز
    function increaseScore() {
        score += 1; // هر تپ 1 امتیاز
        scoreDisplay.textContent = score;

        // انیمیشن کوچک شدن آیکون خورشید هنگام تپ
        sunIcon.style.transform = 'scale(0.9)';
        setTimeout(() => {
            sunIcon.style.transform = 'scale(1)';
        }, 100); // سریع برگردد به حالت اولیه
    }

    // اضافه کردن رویداد کلیک به دکمه تپ
    tapButton.addEventListener('click', increaseScore);

    // آماده کردن دکمه اصلی تلگرام (اختیاری، برای عملیات های مهم مثل برداشت)
    // این دکمه در پایین صفحه تلگرام ظاهر می‌شود
    WebApp.MainButton.setText("برداشت SUN").show();
    WebApp.MainButton.onClick(function() {
        WebApp.showAlert(`شما ${score} SUN جمع آوری کرده اید!`);
        // در اینجا منطق اتصال به بک‌اند برای برداشت توکن اضافه می‌شود
    });

    // نمایش اطلاعات اولیه کاربر در کنسول (برای دیباگ)
    if (WebApp.initDataUnsafe && WebApp.initDataUnsafe.user) {
        const user = WebApp.initDataUnsafe.user;
        console.log("اطلاعات کاربر:", user);
        // این پیام را فقط برای تست می‌بینید
        // WebApp.showAlert(`سلام ${user.first_name || 'کاربر عزیز'}! به زرین سان خوش آمدید.`);
    }

} else {
    // اگر API تلگرام بارگذاری نشد (مثلاً در مرورگر معمولی)
    console.error("Telegram Web App API بارگذاری نشد. لطفاً این را در تلگرام باز کنید.");
    document.body.innerHTML = '<h1>لطفاً این مینی‌اپ را در داخل تلگرام باز کنید.</h1><p>برای تست و اجرای صحیح، نیاز است که این لینک در محیط تلگرام باز شود.</p>';
    document.body.style.display = 'block'; // برای اطمینان از نمایش متن در مرورگر
}