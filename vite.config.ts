import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import path from 'path';
import fs from 'fs';
import nodemailer from 'nodemailer';

/**
 * Extracts and capitalizes a display name from an email address string.
 *
 * @param email - Raw email address string
 * @returns Cleaned title-case name string
 */
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

/**
 * Generates the glassmorphic HTML email template for early access applicants.
 *
 * @param userName - Cleaned name of the applicant
 * @param email - Registered email address
 * @param userHandle - Reserved vanity handle
 * @returns Fully formatted HTML document
 */
function generateThankYouHtml(userName: string, email: string, userHandle: string): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Welcome to OneHaat Early Access</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #0f172a;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: linear-gradient(180deg, #ecfdf5 0%, #f8fafc 40%, #f1f5f9 100%); padding: 40px 16px;">
          <tr>
            <td align="center">
              
              <!-- Glassmorphic Outer Card Container -->
              <table role="presentation" width="100%" style="max-width: 600px; background-color: #ffffff; border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 24px; overflow: hidden; box-shadow: 0 20px 50px -10px rgba(15, 23, 42, 0.08), 0 1px 3px rgba(0, 0, 0, 0.04);">
                
                <!-- Logo Header Bar -->
                <tr>
                  <td style="padding: 28px 32px 20px 32px; background: #ffffff; border-bottom: 1px solid #f1f5f9; text-align: left;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td align="left" style="vertical-align: middle;">
                          <img src="cid:onehaat-logo" alt="OneHaat" width="150" height="auto" style="display: block; width: 150px; max-width: 150px; height: auto; border: 0;" />
                        </td>
                        <td align="right" style="vertical-align: middle;">
                          <div style="display: inline-block; padding: 6px 14px; background-color: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 9999px; font-size: 11px; font-weight: 700; color: #047857; text-transform: uppercase; letter-spacing: 0.8px;">
                            VIP Early Access
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Brand Hero Banner (Emerald to Teal Gradient) -->
                <tr>
                  <td style="background: linear-gradient(135deg, #059669 0%, #0d9488 100%); padding: 36px 32px; text-align: left;">
                    <h1 style="color: #ffffff; font-size: 26px; font-weight: 800; line-height: 1.25; margin: 0 0 8px 0; letter-spacing: -0.5px;">
                      Welcome to OneHaat, ${userName}
                    </h1>
                    <p style="color: #d1fae5; font-size: 14px; margin: 0; line-height: 1.5; font-weight: 400;">
                      Your neighborhood haat is entering the digital age. Counter-shelf honest pricing and zero dark store markup.
                    </p>
                  </td>
                </tr>

                <!-- Main Content Area -->
                <tr>
                  <td style="padding: 32px;">
                    <p style="font-size: 15px; line-height: 1.6; color: #334155; margin: 0 0 20px 0;">
                      Hello <strong>${userName}</strong>,
                    </p>
                    <p style="font-size: 14px; line-height: 1.6; color: #475569; margin: 0 0 24px 0;">
                      Thank you for reserving your priority spot. We are rolling out colony by colony across Bengaluru to empower genuine neighborhood grocers and bring fair, transparent pricing back to daily essentials.
                    </p>

                    <!-- Glassmorphic Details Card -->
                    <div style="background: linear-gradient(135deg, rgba(236, 253, 245, 0.75) 0%, rgba(248, 250, 252, 0.95) 100%); border: 1px solid #bbf7d0; border-radius: 16px; padding: 22px; margin-bottom: 28px; box-shadow: 0 4px 16px -4px rgba(5, 150, 105, 0.06);">
                      <div style="font-size: 11px; font-weight: 800; color: #059669; text-transform: uppercase; letter-spacing: 0.9px; margin-bottom: 12px; border-bottom: 1px solid #bbf7d0; padding-bottom: 6px;">
                        Reservation Summary
                      </div>
                      <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                        <tr>
                          <td style="padding: 6px 0; color: #64748b; font-weight: 500;">Registered Email:</td>
                          <td style="padding: 6px 0; color: #0f172a; font-weight: 700; text-align: right;">${email}</td>
                        </tr>
                        <tr>
                          <td style="padding: 6px 0; color: #64748b; font-weight: 500;">Reserved Handle:</td>
                          <td style="padding: 6px 0; color: #059669; font-weight: 800; text-align: right;">@${userHandle}</td>
                        </tr>
                        <tr>
                          <td style="padding: 6px 0; color: #64748b; font-weight: 500;">Onboarding Queue:</td>
                          <td style="padding: 6px 0; color: #0f172a; font-weight: 700; text-align: right;">Wave 1 Priority Access</td>
                        </tr>
                      </table>
                    </div>

                    <!-- VIP Perks Section -->
                    <div style="margin-bottom: 28px;">
                      <div style="font-size: 12px; font-weight: 800; color: #0f172a; margin-bottom: 14px; text-transform: uppercase; letter-spacing: 0.6px;">
                        Included Early Access Benefits:
                      </div>

                      <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                          <td style="padding: 10px 0; vertical-align: top; width: 34px;">
                            <div style="width: 24px; height: 24px; border-radius: 6px; background-color: #ecfdf5; border: 1px solid #a7f3d0; text-align: center; line-height: 24px; font-size: 11px; font-weight: 800; color: #059669;">
                              01
                            </div>
                          </td>
                          <td style="padding: 8px 0 10px 10px; vertical-align: top;">
                            <div style="font-size: 13px; font-weight: 700; color: #0f172a;">Exclusive Beta Access</div>
                            <div style="font-size: 12px; color: #64748b; line-height: 1.4; margin-top: 2px;">
                              Direct invite link to test-drive the OneHaat mobile app before public launch.
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <td style="padding: 10px 0; vertical-align: top; width: 34px;">
                            <div style="width: 24px; height: 24px; border-radius: 6px; background-color: #ecfdf5; border: 1px solid #a7f3d0; text-align: center; line-height: 24px; font-size: 11px; font-weight: 800; color: #059669;">
                              02
                            </div>
                          </td>
                          <td style="padding: 8px 0 10px 10px; vertical-align: top;">
                            <div style="font-size: 13px; font-weight: 700; color: #0f172a;">Priority Username Claim</div>
                            <div style="font-size: 12px; color: #64748b; line-height: 1.4; margin-top: 2px;">
                              Your unique handle @${userHandle} is held for your account.
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <td style="padding: 10px 0; vertical-align: top; width: 34px;">
                            <div style="width: 24px; height: 24px; border-radius: 6px; background-color: #ecfdf5; border: 1px solid #a7f3d0; text-align: center; line-height: 24px; font-size: 11px; font-weight: 800; color: #059669;">
                              03
                            </div>
                          </td>
                          <td style="padding: 8px 0 10px 10px; vertical-align: top;">
                            <div style="font-size: 13px; font-weight: 700; color: #0f172a;">Zero Dark-Store Markup</div>
                            <div style="font-size: 12px; color: #64748b; line-height: 1.4; margin-top: 2px;">
                              100% counter-shelf pricing with an authentic printed GST bill from your local shop.
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <td style="padding: 10px 0; vertical-align: top; width: 34px;">
                            <div style="width: 24px; height: 24px; border-radius: 6px; background-color: #ecfdf5; border: 1px solid #a7f3d0; text-align: center; line-height: 24px; font-size: 11px; font-weight: 800; color: #059669;">
                              04
                            </div>
                          </td>
                          <td style="padding: 8px 0 10px 10px; vertical-align: top;">
                            <div style="font-size: 13px; font-weight: 700; color: #0f172a;">Colony-Radius Delivery</div>
                            <div style="font-size: 12px; color: #64748b; line-height: 1.4; margin-top: 2px;">
                              Orders packed by trusted neighborhood merchants and delivered within your local cluster.
                            </div>
                          </td>
                        </tr>
                      </table>
                    </div>

                    <!-- Community Support Note -->
                    <div style="padding: 16px 18px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; font-size: 12px; color: #475569; line-height: 1.5;">
                      <strong>Have a preferred grocer or pharmacy in your locality?</strong><br />
                      Reply to this email or write to <a href="mailto:access.onehaat@gmail.com" style="color: #059669; font-weight: 700; text-decoration: none;">access.onehaat@gmail.com</a> with their shop name and colony, and our onboarding team will reach out to them.
                    </div>

                    <div style="margin-top: 28px; font-size: 13px; color: #334155; line-height: 1.5;">
                      Sincerely,<br />
                      <strong>The OneHaat Team</strong>
                    </div>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 22px 32px; text-align: center; font-size: 11px; color: #94a3b8;">
                    <div>OneHaat Technologies Pvt. Ltd. All rights reserved.</div>
                    <div style="margin-top: 4px;">
                      One Market. Every Need. | Contact: <a href="mailto:access.onehaat@gmail.com" style="color: #059669; text-decoration: none; font-weight: 600;">access.onehaat@gmail.com</a>
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

/**
 * Generates the internal team notification email template when a new applicant reserves access.
 *
 * @param userName - Cleaned name of the applicant
 * @param email - Registered email address
 * @param userHandle - Reserved vanity handle
 * @param submissionTime - Formatted timestamp string in IST
 * @param adminEmail - Team alert recipient email address
 * @returns Fully formatted HTML document
 */
function generateAdminAlertHtml(
  userName: string,
  email: string,
  userHandle: string,
  submissionTime: string,
  adminEmail: string
): string {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
      <div style="border-bottom: 2px solid #10b981; padding-bottom: 12px; margin-bottom: 20px;">
        <h2 style="color: #059669; margin: 0; font-size: 20px; font-weight: 800;">OneHaat - New VIP Early Access Reservation</h2>
        <p style="color: #64748b; font-size: 13px; margin: 4px 0 0 0;">Priority Waitlist Submission</p>
      </div>
      
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; margin-bottom: 20px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 6px 0; color: #64748b; font-weight: 600; width: 140px;">Applicant Name:</td>
            <td style="padding: 6px 0; color: #0f172a; font-weight: 700;">${userName}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Applicant Email:</td>
            <td style="padding: 6px 0; color: #059669; font-weight: 700;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Reserved Handle:</td>
            <td style="padding: 6px 0; color: #0f172a; font-weight: 700;">@${userHandle}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Priority Tier:</td>
            <td style="padding: 6px 0; color: #0f172a;">Wave 1 Priority Access</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Submitted At:</td>
            <td style="padding: 6px 0; color: #64748b;">${submissionTime} IST</td>
          </tr>
        </table>
      </div>

      <p style="font-size: 13px; color: #475569; line-height: 1.5; margin: 0 0 16px 0;">
        This applicant reserved their VIP Early Access pass on the OneHaat website. You can reply directly to this email notification to contact them.
      </p>

      <div style="border-top: 1px solid #f1f5f9; padding-top: 16px; font-size: 12px; color: #94a3b8;">
        OneHaat Launchpad Notification System | Contact: <a href="mailto:${adminEmail}" style="color: #059669; text-decoration: none;">${adminEmail}</a>
      </div>
    </div>
  `;
}

/**
 * Custom Vite plugin providing the local development `/api/reserve` endpoint.
 * Mirrors the serverless production behavior using Gmail SMTP.
 */
function reserveApiPlugin() {
  return {
    name: 'reserve-api-middleware',
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

            const gmailUser = process.env.GMAIL_USER || 'access.onehaat@gmail.com';
            const gmailPass = (process.env.GMAIL_APP_PASSWORD || '').replace(/\s+/g, '');
            const fromName = process.env.EMAIL_FROM_NAME || 'OneHaat';
            const adminEmail = process.env.CONTACT_EMAIL || process.env.VITE_CONTACT_EMAIL || 'access.onehaat@gmail.com';

            const userName = extractNameFromEmail(email);
            const userHandle = email.split('@')[0].replace(/[^a-zA-Z0-9_]/g, '').toLowerCase() || 'neighbor';
            const submissionTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

            const thankYouHtml = generateThankYouHtml(userName, email, userHandle);
            const adminAlertHtml = generateAdminAlertHtml(userName, email, userHandle, submissionTime, adminEmail);

            const logoPath = path.join(process.cwd(), 'public', 'logo.png');
            const attachments = fs.existsSync(logoPath)
              ? [
                  {
                    filename: 'logo.png',
                    path: logoPath,
                    cid: 'onehaat-logo',
                  },
                ]
              : [];

            let userDeliveryStatus = 'sent';
            let userDeliveryError: any = null;

            if (!gmailPass) {
              console.warn('GMAIL_APP_PASSWORD is not set in development environment');
            } else {
              const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                  user: gmailUser,
                  pass: gmailPass,
                },
              });

              const adminPromise = transporter.sendMail({
                from: `"${fromName}" <${gmailUser}>`,
                to: adminEmail,
                replyTo: email,
                subject: `New VIP Reservation: ${userName} (${email})`,
                html: adminAlertHtml,
              });

              const userPromise = transporter.sendMail({
                from: `"${fromName}" <${gmailUser}>`,
                to: email,
                replyTo: adminEmail,
                subject: `Welcome to OneHaat Early Access, ${userName} - Beta Pass and Username Reserved`,
                html: thankYouHtml,
                attachments,
              });

              const [adminRes, userRes] = await Promise.allSettled([adminPromise, userPromise]);

              if (userRes.status === 'rejected') {
                userDeliveryStatus = 'failed';
                userDeliveryError = userRes.reason?.message || 'Gmail SMTP failed';
                console.error('Dev Server User Delivery Error:', userRes.reason);
              }

              if (adminRes.status === 'rejected') {
                console.error('Dev Server Admin Delivery Error:', adminRes.reason);
              }
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
            console.error('Dev server reservation error:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err.message || 'Internal server error' }));
          }
        });
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  process.env = { ...process.env, ...env };

  return {
    plugins: [react(), reserveApiPlugin()],
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
