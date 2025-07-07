const express = require("express");
const app = express();
const path = require("path");

const PORT = process.env.PORT || 3000;
const logs = []; // 🗂 ذخیره لاگ‌های کاربران در حافظه موقتی

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// 📄 صفحه اصلی
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// 📥 ثبت اطلاعات هر کاربر
app.post("/api/log", (req, res) => {
  const { userId } = req.body;

  // جلوگیری از ثبت چندباره‌ی userId
  const existing = logs.find(log => log.userId === userId);
  if (existing) {
    existing.sun = req.body.sun;
    existing.energy = req.body.energy;
    existing.tapCount = req.body.tapCount;
    existing.inviteCount = req.body.inviteCount;
    existing.cup = req.body.cup;
    existing.timestamp = new Date().toISOString();
  } else {
    logs.push({
      ...req.body,
      timestamp: new Date().toISOString()
    });
  }

  console.log("📥 Log received:", req.body);
  res.sendStatus(200);
});

// 📊 API برای نمایش آمار کلی سیستم
app.get("/api/stats", (req, res) => {
  const uniqueUsers = new Set(logs.map(log => log.userId));
  const totalSun = logs.reduce((sum, log) => sum + (Number(log.sun) || 0), 0);

  res.json({
    totalUsers: uniqueUsers.size,
    totalSun: totalSun.toFixed(2)
  });
});

// 🧑‍💻 پنل لاگ‌های مدیریتی
app.get("/admin/logs", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>ZerinSun Logs</title>
        <style>
          body { background: #111; color: #0f0; font-family: monospace; padding: 20px; }
          .log { border-bottom: 1px dashed #333; margin-bottom: 16px; padding-bottom: 10px; }
        </style>
      </head>
      <body>
        <h1>🛰️ ZerinSun – User Logs</h1>
        ${logs.map(log => `
          <div class="log">
            🆔 <strong>${log.userId}</strong><br/>
            ☀️ SUN: ${log.sun} | ⚡ Energy: ${log.energy} | 🎯 Taps: ${log.tapCount}<br/>
            🤝 Invites: ${log.inviteCount} | 🏆 Cup: ${log.cup}<br/>
            ⏱️ ${log.timestamp}
          </div>
        `).join("")}
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`🚀 ZerinSun server running at http://localhost:${PORT}`);
});
