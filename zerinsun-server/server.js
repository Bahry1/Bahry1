const express = require("express");
const app = express();
const path = require("path");

const PORT = process.env.PORT || 3000;
const logs = []; // 🗂 ذخیره لاگ‌های کاربران

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json()); // ← برای پردازش JSON ارسالی از کلاینت

// 📄 صفحه اصلی
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// 📥 دریافت لاگ از کاربر
app.post("/api/log", (req, res) => {
  const log = {
    ...req.body,
    timestamp: new Date().toISOString()
  };
  logs.push(log);
  console.log("📥 Log received:", log);
  res.sendStatus(200);
});

// 🔎 نمایش همه لاگ‌ها در پنل admin
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
  console.log(`🚀 ZerinSun server is running on http://localhost:${PORT}`);
});
