export const otpEmailTemplate = (otp) => {
return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SmartX · OTP verification</title>
  <!-- inline styles for email compatibility -->
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    }
    body {
      background-color: #eef3fa;
      padding: 24px 12px;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      max-width: 560px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 24px;
      box-shadow: 0 16px 40px rgba(0, 20, 40, 0.06);
      overflow: hidden;
    }
    td {
      padding: 0;
      vertical-align: top;
    }
    .container {
      padding: 32px 34px 38px;
    }
    /* header */
    .header {
      text-align: center;
      padding-bottom: 14px;
      border-bottom: 2px solid #edf3fa;
    }
    .brand {
      display: inline-block;
      font-size: 30px;
      font-weight: 700;
      letter-spacing: -0.3px;
      color: #0b1e33;
    }
    .brand span {
      color: #1f6fe0;
    }
    .tagline {
      font-size: 14px;
      color: #5a6f89;
      margin-top: 4px;
      letter-spacing: 0.4px;
    }
    /* content */
    .content {
      padding: 26px 0 8px;
    }
    .greeting {
      font-size: 20px;
      font-weight: 600;
      color: #142b44;
      margin-bottom: 6px;
    }
    .message {
      font-size: 16px;
      line-height: 1.6;
      color: #2a4058;
      margin-bottom: 18px;
    }
    .otp-box {
      background: #f2f8ff;
      border-radius: 18px;
      padding: 22px 12px;
      text-align: center;
      margin: 18px 0 22px;
      border: 1px solid #d6e6fc;
    }
    .otp-code {
      font-size: 44px;
      font-weight: 700;
      letter-spacing: 14px;
      color: #0a1f33;
      background: white;
      display: inline-block;
      padding: 6px 26px 6px 34px;
      border-radius: 14px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.02);
      font-family: 'Courier New', monospace;
    }
    .otp-expiry {
      font-size: 15px;
      color: #3a5a7a;
      margin-top: 14px;
      font-weight: 500;
      background: #e3edfb;
      display: inline-block;
      padding: 4px 20px;
      border-radius: 30px;
    }
    .expiry-icon {
      margin-right: 6px;
    }
    .divider {
      height: 1px;
      background: #e6eef8;
      margin: 22px 0 20px;
    }
    /* founder */
    .founder-section {
      display: flex;
      align-items: center;
      background: #f7faff;
      padding: 12px 18px;
      border-radius: 60px;
      margin: 8px 0 12px;
    }
    .founder-avatar {
      background: #1f6fe0;
      color: white;
      font-weight: 600;
      font-size: 18px;
      width: 46px;
      height: 46px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 14px;
      flex-shrink: 0;
    }
    .founder-info {
      font-size: 15px;
      color: #1f3348;
    }
    .founder-name {
      font-weight: 700;
      color: #0a1f33;
    }
    .founder-title {
      font-size: 13px;
      color: #5a6f89;
    }
    .contact-line {
      margin-top: 6px;
      font-size: 14px;
      background: #eaf1fb;
      padding: 4px 14px;
      border-radius: 40px;
      display: inline-block;
      color: #0b2a4a;
    }
    .contact-line a {
      color: #1f6fe0;
      text-decoration: none;
      font-weight: 500;
    }
    .footer-note {
      font-size: 13px;
      color: #5b738f;
      text-align: center;
      padding-top: 14px;
      border-top: 1px solid #eef3f9;
      margin-top: 22px;
    }
    .footer-note a {
      color: #1f6fe0;
      text-decoration: none;
    }
    .btn-resend {
      background: #eaf1fb;
      border-radius: 40px;
      padding: 4px 18px;
      font-size: 13px;
      color: #1f3b5a;
      display: inline-block;
    }
    .footer-extra {
      text-align: center;
      font-size: 12px;
      color: #8ba0ba;
      margin-top: 14px;
    }
    @media (max-width: 480px) {
      .container { padding: 22px 16px 28px; }
      .otp-code { font-size: 30px; letter-spacing: 8px; padding: 6px 12px; }
      .brand { font-size: 24px; }
      .founder-section { flex-wrap: wrap; justify-content: center; text-align: center; }
      .founder-avatar { margin-right: 0; margin-bottom: 6px; }
      .contact-line { display: block; text-align: center; }
    }
  </style>
</head>
<body>
  <table cellpadding="0" cellspacing="0" border="0" role="presentation">
    <tr>
      <td>
        <div class="container">
          <!-- HEADER -->
          <div class="header">
            <div class="brand">Smart<span>X</span></div>
            <div class="tagline">intelligent · secure · seamless</div>
          </div>

          <!-- MAIN CONTENT -->
          <div class="content">
            <div class="greeting">🔐 Your OTP verification</div>
            <div class="message">
              Hello, <br>
              Use the one‑time password below to verify your identity. 
              <strong style="color:#0a1f33;">This OTP expires in 10 minutes.</strong>
            </div>

            <!-- OTP + expiry (explicit) -->
            <div class="otp-box">
              <div class="otp-code">${otp}</div>
              <div class="otp-expiry">
                <span class="expiry-icon">⏱️</span> expires in 10 minutes
              </div>
            </div>

            <div class="message" style="font-size: 15px; margin-top: -2px; color: #3d5b7a;">
              If you didn't request this code, please ignore this email.
            </div>

            <div class="divider"></div>

            <!-- FOUNDER + CONTACT (explicit) -->
            <div class="founder-section">
              <div class="founder-avatar">SS</div>
              <div class="founder-info">
                <span class="founder-name">Shreya Shruti</span> 
                <span style="color:#1f6fe0; font-weight:500;">·</span>
                <span class="founder-title">Founder &amp; CEO, SmartX</span>
                <!-- contact email displayed prominently -->
                <div class="contact-line">
                  ✉️ <a href="mailto:shrybits01@gmail.com">shrybits01@gmail.com</a>
                </div>
              </div>
            </div>

            <!-- FOOTER with resend and extra contact hint -->
            <div class="footer-note">
              <span>Didn't receive the code? </span>
              <span class="btn-resend" style="background:#eaf1fb; padding:4px 18px; border-radius:40px; margin-left:4px;">Resend OTP</span>
              <br>
              <span style="display:inline-block; margin-top:10px; font-size:12px; color:#5f7a96;">
                For help, contact us at <a href="mailto:shrybits01@gmail.com" style="font-weight:500;">shrybits01@gmail.com</a>
              </span>
            </div>

            <!-- small extra: expiry reminder again and copyright -->
            <div class="footer-extra">
              <span style="background:#f1f6fd; padding:2px 14px; border-radius:40px; font-size:12px;">⏳ OTP valid for 10 minutes only</span>
              <div style="margin-top: 10px; color:#9aafc7; letter-spacing:0.3px;">
                © 2026 SmartX — built with care by Shreya Shruti
              </div>
            </div>

          </div>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>

    
    `
}