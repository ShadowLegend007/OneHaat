import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import path from 'path'

function extractNameFromEmail(email: string): string {
  if (!email || !email.includes('@')) return 'Friend';
  const prefix = email.split('@')[0];
  const cleaned = prefix.replace(/[._\-+]/g, ' ');
  const words = cleaned
    .split(/\s+/)
    .map((w) => w.replace(/\d+/g, '').trim())
    .filter(Boolean);

  if (words.length === 0) return 'Neighbor';

  return words
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

function generateThankYouHtml(userName: string, email: string, userHandle: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Welcome to OneHaat Early Access</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #0f172a;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 32px 16px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" style="max-width: 580px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.05);">
                
                <!-- Brand Header Bar -->
                <tr>
                  <td style="background: linear-gradient(135deg, #059669 0%, #0d9488 100%); padding: 32px 28px; text-align: left;">
                    <div style="display: inline-block; padding: 4px 12px; background-color: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.35); border-radius: 9999px; font-size: 11px; font-weight: 700; color: #ffffff; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 12px;">
                      VIP Early Access Confirmed
                    </div>
                    <h1 style="color: #ffffff; font-size: 26px; font-weight: 800; line-height: 1.2; margin: 0 0 6px 0;">
                      Welcome to OneHaat, ${userName}! 🌿
                    </h1>
                    <p style="color: #d1fae5; font-size: 14px; margin: 0; line-height: 1.4;">
                      Your neighborhood haat is entering the digital age — honest, fresh, and zero markup.
                    </p>
                  </td>
                </tr>

                <!-- Main Body Content -->
                <tr>
                  <td style="padding: 28px;">
                    <p style="font-size: 15px; line-height: 1.6; color: #334155; margin: 0 0 20px 0;">
                      Hi <strong>${userName}</strong>,
                    </p>
                    <p style="font-size: 14px; line-height: 1.6; color: #475569; margin: 0 0 24px 0;">
                      Thank you for reserving your spot. We are rolling out colony by colony across Bengaluru to empower genuine neighborhood grocers and bring fair, transparent pricing back to daily essentials.
                    </p>

                    <!-- Reservation Summary Card -->
                    <div style="background: linear-gradient(135deg, #f0fdf4 0%, #f8fafc 100%); border: 1px solid #bbf7d0; border-radius: 14px; padding: 20px; margin-bottom: 24px;">
                      <div style="font-size: 11px; font-weight: 800; color: #059669; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 10px;">
                        Your Reserved Access Details
                      </div>
                      <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                        <tr>
                          <td style="padding: 4px 0; color: #64748b;">Registered Email:</td>
                          <td style="padding: 4px 0; color: #0f172a; font-weight: 700; text-align: right;">${email}</td>
                        </tr>
                        <tr>
                          <td style="padding: 4px 0; color: #64748b;">Reserved Username:</td>
                          <td style="padding: 4px 0; color: #059669; font-weight: 800; text-align: right;">@${userHandle}</td>
                        </tr>
                        <tr>
                          <td style="padding: 4px 0; color: #64748b;">VIP Onboarding Tier:</td>
                          <td style="padding: 4px 0; color: #0f172a; font-weight: 700; text-align: right;">Beta Wave 1 (First in Line)</td>
                        </tr>
                      </table>
                    </div>

                    <!-- Key VIP Perks -->
                    <div style="margin-bottom: 24px;">
                      <div style="font-size: 13px; font-weight: 800; color: #0f172a; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
                        What you get as an Early VIP:
                      </div>

                      <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                          <td style="padding: 10px 0; vertical-align: top; width: 36px;">
                            <div style="width: 26px; height: 26px; border-radius: 8px; background-color: #ecfdf5; border: 1px solid #a7f3d0; text-align: center; line-height: 26px; font-size: 13px;">
                              🚀
                            </div>
                          </td>
                          <td style="padding: 10px 0 10px 10px; vertical-align: top;">
                            <div style="font-size: 13px; font-weight: 700; color: #0f172a;">Exclusive Beta Version Access</div>
                            <div style="font-size: 12px; color: #64748b; line-height: 1.4; margin-top: 2px;">
                              You'll receive the direct invite link to test-drive the OneHaat mobile app before general colony rollout.
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <td style="padding: 10px 0; vertical-align: top; width: 36px;">
                            <div style="width: 26px; height: 26px; border-radius: 8px; background-color: #ecfdf5; border: 1px solid #a7f3d0; text-align: center; line-height: 26px; font-size: 13px;">
                              🏷️
                            </div>
                          </td>
                          <td style="padding: 10px 0 10px 10px; vertical-align: top;">
                            <div style="font-size: 13px; font-weight: 700; color: #0f172a;">First to Grab Your Unique Username</div>
                            <div style="font-size: 12px; color: #64748b; line-height: 1.4; margin-top: 2px;">
                              Your personal handle <strong>@${userHandle}</strong> is prioritized so you claim your identity before anyone else.
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <td style="padding: 10px 0; vertical-align: top; width: 36px;">
                            <div style="width: 26px; height: 26px; border-radius: 8px; background-color: #ecfdf5; border: 1px solid #a7f3d0; text-align: center; line-height: 26px; font-size: 13px;">
                              🛒
                            </div>
                          </td>
                          <td style="padding: 10px 0 10px 10px; vertical-align: top;">
                            <div style="font-size: 13px; font-weight: 700; color: #0f172a;">100% Counter-Shelf Honest Pricing</div>
                            <div style="font-size: 12px; color: #64748b; line-height: 1.4; margin-top: 2px;">
                              No hidden 20–30% dark store markup. You pay the exact same counter price with a printed GST bill.
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <td style="padding: 10px 0; vertical-align: top; width: 36px;">
                            <div style="width: 26px; height: 26px; border-radius: 8px; background-color: #ecfdf5; border: 1px solid #a7f3d0; text-align: center; line-height: 26px; font-size: 13px;">
                              ⚡
                            </div>
                          </td>
                          <td style="padding: 10px 0 10px 10px; vertical-align: top;">
                            <div style="font-size: 13px; font-weight: 700; color: #0f172a;">9 Min 59 Sec Average Delivery</div>
                            <div style="font-size: 12px; color: #64748b; line-height: 1.4; margin-top: 2px;">
                              Packed by the shopkeeper you trust and delivered within your 2.5 km colony radius.
                            </div>
                          </td>
                        </tr>
                      </table>
                    </div>

                    <!-- Community Support & Feedback -->
                    <div style="padding: 16px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; font-size: 12px; color: #475569; line-height: 1.5;">
                      <strong>Have a favorite grocer or chemist in your neighborhood?</strong><br />
                      Reply directly to this email or write to us at <a href="mailto:access.onehaat@gmail.com" style="color: #059669; font-weight: 700; text-decoration: none;">access.onehaat@gmail.com</a> with their shop name, and we will make sure they are onboarded for your launch.
                    </div>

                    <div style="margin-top: 24px; font-size: 13px; color: #334155; line-height: 1.5;">
                      Warm regards,<br />
                      <strong>The OneHaat Team</strong>
                    </div>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 20px 28px; text-align: center; font-size: 11px; color: #94a3b8;">
                    <div>© ${new Date().getFullYear()} OneHaat Technologies Pvt. Ltd. All rights reserved.</div>
                    <div style="margin-top: 4px;">
                      One Market. Every Need. • Dedicated Support: <a href="mailto:access.onehaat@gmail.com" style="color: #059669; text-decoration: none; font-weight: 600;">access.onehaat@gmail.com</a>
                    </div>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

function resendApiPlugin() {
  return {
    name: 'resend-api-middleware',
    configureServer(server: any) {
      server.middlewares.use('/api/reserve', async (req: any, res: any) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        let body = '';
        req.on('data', (chunk: any) => {
          body += chunk;
        });
        req.on('end', async () => {
          try {
            const parsed = JSON.parse(body || '{}');
            const email = parsed?.email?.trim();
            if (!email || !email.includes('@')) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Valid email address is required' }));
              return;
            }

            const apiKey = process.env.RESEND_API_KEY || process.env.VITE_RESEND_API_KEY || '';

            const userName = extractNameFromEmail(email);
            const userHandle = email.split('@')[0].replace(/[^a-zA-Z0-9_]/g, '').toLowerCase() || 'neighbor';
            const submissionTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
            const thankYouHtml = generateThankYouHtml(userName, email, userHandle);

            // 1. Send Admin Notification to access.onehaat@gmail.com
            const adminPromise = fetch('https://api.resend.com/emails', {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                from: 'OneHaat Launchpad <onboarding@resend.dev>',
                to: ['access.onehaat@gmail.com'],
                reply_to: email,
                subject: `🚀 New VIP Reservation: ${userName} (${email})`,
                html: `
                  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
                    <div style="border-bottom: 2px solid #10b981; padding-bottom: 12px; margin-bottom: 20px;">
                      <h2 style="color: #059669; margin: 0; font-size: 22px; font-weight: 800;">OneHaat — New VIP Early Access Reservation</h2>
                      <p style="color: #64748b; font-size: 13px; margin: 4px 0 0 0;">Priority Waitlist & Beta Access Submission</p>
                    </div>
                    
                    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; margin-bottom: 20px;">
                      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                        <tr>
                          <td style="padding: 6px 0; color: #64748b; font-weight: 600; width: 140px;">Name:</td>
                          <td style="padding: 6px 0; color: #0f172a; font-weight: 700;">${userName}</td>
                        </tr>
                        <tr>
                          <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Email:</td>
                          <td style="padding: 6px 0; color: #059669; font-weight: 700;">${email}</td>
                        </tr>
                        <tr>
                          <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Reserved Handle:</td>
                          <td style="padding: 6px 0; color: #0f172a; font-weight: 700;">@${userHandle}</td>
                        </tr>
                        <tr>
                          <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Perks:</td>
                          <td style="padding: 6px 0; color: #0f172a;">Beta Version Access • Priority Username Claim</td>
                        </tr>
                        <tr>
                          <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Submitted At:</td>
                          <td style="padding: 6px 0; color: #64748b;">${submissionTime} IST</td>
                        </tr>
                      </table>
                    </div>

                    <p style="font-size: 13px; color: #475569; line-height: 1.5; margin: 0 0 16px 0;">
                      This customer reserved their VIP Early Access pass on the OneHaat website. You can reply directly to this email to reach them.
                    </p>

                    <div style="border-top: 1px solid #f1f5f9; padding-top: 16px; font-size: 12px; color: #94a3b8;">
                      OneHaat Launchpad • Contact: <a href="mailto:access.onehaat@gmail.com" style="color: #059669; text-decoration: none;">access.onehaat@gmail.com</a>
                    </div>
                  </div>
                `,
              }),
            });

            // 2. Send Styled Thank-You Email to Customer
            const userPromise = fetch('https://api.resend.com/emails', {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                from: 'OneHaat <onboarding@resend.dev>',
                to: [email],
                reply_to: 'access.onehaat@gmail.com',
                subject: `Welcome to OneHaat Early Access, ${userName}! 🎉 Your Beta Pass & Username Reserved`,
                html: thankYouHtml,
              }),
            });

            // 3. Send Thank-You copy to access.onehaat@gmail.com
            const adminCopyPromise =
              email.toLowerCase() !== 'access.onehaat@gmail.com'
                ? fetch('https://api.resend.com/emails', {
                    method: 'POST',
                    headers: {
                      Authorization: `Bearer ${apiKey}`,
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      from: 'OneHaat <onboarding@resend.dev>',
                      to: ['access.onehaat@gmail.com'],
                      reply_to: email,
                      subject: `[User Copy: ${userName}] Welcome to OneHaat Early Access! 🎉`,
                      html: thankYouHtml,
                    }),
                  })
                : Promise.resolve(null);

            const [adminRes, userRes, adminCopyRes] = await Promise.allSettled([
              adminPromise,
              userPromise,
              adminCopyPromise,
            ]);

            let userDeliveryStatus = 'sent';
            let userDeliveryError: any = null;

            if (userRes.status === 'fulfilled') {
              const userJson = await userRes.value.json().catch(() => ({}));
              if (!userRes.value.ok) {
                userDeliveryStatus = 'requires_domain_verification';
                userDeliveryError = userJson;
                console.warn('[Resend Warning]:', userJson);
              }
            } else {
              userDeliveryStatus = 'failed';
              userDeliveryError = userRes.reason?.message;
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(
              JSON.stringify({
                success: true,
                message: 'VIP early access pass reserved',
                userName,
                userHandle,
                userDeliveryStatus,
                userDeliveryError,
              })
            );
          } catch (err: any) {
            console.error('[API Reserve Error]:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err.message || 'Internal server error' }));
          }
        });
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  process.env = { ...process.env, ...env };

  return {
    plugins: [react(), resendApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 5173,
      host: true,
    },
  };
});
