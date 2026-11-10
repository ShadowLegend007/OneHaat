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
  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>Welcome to OneHaat VIP Early Access</title>
    <!--[if mso]>
    <noscript>
      <xml>
        <o:OfficeDocumentSettings>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
    </noscript>
    <![endif]-->
    <style>
      /* Reset & Baseline */
      body, table, td, p, a, li, blockquote {
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      table, td {
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }
      img {
        -ms-interpolation-mode: bicubic;
        border: 0;
        outline: none;
        text-decoration: none;
      }
      * {
        box-sizing: border-box;
      }

      /* Mobile Layout (Max width: 520px - Matches Mockup Pic 2) */
      @media only screen and (max-width: 520px) {
        .email-outer-td {
          padding: 12px 8px !important;
        }
        .email-main-card {
          width: 100% !important;
          max-width: 100% !important;
          border-radius: 20px !important;
        }
        .email-inner-pad {
          padding: 20px 16px 20px 16px !important;
        }
        .header-logo {
          width: 115px !important;
          max-width: 115px !important;
        }
        .header-badge {
          padding: 5px 10px !important;
          font-size: 10px !important;
        }
        .hero-banner-table {
          display: block !important;
          border-radius: 18px !important;
        }
        .hero-left-td {
          display: block !important;
          width: 100% !important;
          padding: 22px 18px 12px 18px !important;
        }
        .hero-right-td {
          display: block !important;
          width: 100% !important;
          text-align: center !important;
          padding: 0 18px 20px 18px !important;
        }
        .hero-main-title {
          font-size: 21px !important;
          line-height: 1.25 !important;
        }
        .hero-graphic-img {
          max-width: 190px !important;
          margin: 0 auto !important;
        }
        /* Stack benefit cards vertically on mobile */
        .benefit-col {
          display: block !important;
          width: 100% !important;
          margin-bottom: 12px !important;
          padding-left: 0 !important;
          padding-right: 0 !important;
        }
        .benefit-spacer {
          display: none !important;
        }
        .summary-badge-cell {
          text-align: right !important;
          padding-top: 4px !important;
        }
        .summary-badge {
          font-size: 11px !important;
          padding: 4px 10px !important;
          word-break: break-all !important;
        }
        .footer-cell {
          padding: 20px 16px !important;
          border-radius: 0 0 20px 20px !important;
        }
      }

      /* Tablet Layout (521px to 680px - Matches Mockup Pic 3) */
      @media only screen and (min-width: 521px) and (max-width: 680px) {
        .email-main-card {
          width: 100% !important;
          max-width: 620px !important;
        }
        .email-inner-pad {
          padding: 26px 24px 22px 24px !important;
        }
        .hero-main-title {
          font-size: 23px !important;
        }
        .benefit-col {
          width: 48.5% !important;
        }
      }

      /* Desktop Layout (> 680px - Matches Mockup Pic 4) */
      @media only screen and (min-width: 681px) {
        .email-main-card {
          width: 640px !important;
        }
        .benefit-col {
          width: 48.5% !important;
        }
      }
    </style>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f1f8f4; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #0f172a;">
    
    <!-- Outer Full-Width Container -->
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: linear-gradient(180deg, #ecfdf5 0%, #f4fbf6 40%, #f1f8f4 100%); padding: 36px 12px;">
      <tr>
        <td class="email-outer-td" align="center" style="padding: 20px 12px;">
          
          <!-- Main White Card Container with Subtle Green Accent Border -->
          <table role="presentation" class="email-main-card" width="100%" cellspacing="0" cellpadding="0" style="max-width: 640px; background-color: #ffffff; border: 1px solid #dcfce7; border-radius: 28px; overflow: hidden; box-shadow: 0 20px 45px -15px rgba(5, 150, 105, 0.12), 0 2px 6px rgba(0, 0, 0, 0.03);">
            
            <!-- Card Body Content Pad -->
            <tr>
              <td class="email-inner-pad" style="padding: 28px 32px 24px 32px;">
                
                <!-- 1. Header Bar: Logo on Left, VIP Early Access Badge on Right -->
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 22px;">
                  <tr>
                    <td align="left" style="vertical-align: middle;">
                      <img src="cid:onehaat-logo" class="header-logo" alt="OneHaat" width="138" style="display: block; width: 138px; max-width: 138px; height: auto; border: 0;" />
                    </td>
                    <td align="right" style="vertical-align: middle;">
                      <table role="presentation" cellspacing="0" cellpadding="0" style="display: inline-table;">
                        <tr>
                          <td class="header-badge" style="padding: 6px 14px; background-color: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 9999px;">
                            <span style="font-size: 11px; font-weight: 800; color: #047857; text-transform: uppercase; letter-spacing: 0.8px; white-space: nowrap;">
                              <span style="font-size: 12px; vertical-align: middle; margin-right: 4px;">&#9733;</span> VIP Early Access
                            </span>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <!-- 2. Hero Banner (Curved Rich Emerald Gradient with Lightweight 3D Grocery Smartphone Graphic) -->
                <table role="presentation" class="hero-banner-table" width="100%" cellspacing="0" cellpadding="0" style="background: linear-gradient(135deg, #109b53 0%, #087f4c 55%, #065435 100%); border-radius: 22px; overflow: hidden; box-shadow: 0 12px 28px -6px rgba(6, 84, 53, 0.28); margin-bottom: 24px;">
                  <tr>
                    <!-- Left Column: Dynamic Welcome Text -->
                    <td class="hero-left-td" style="padding: 30px 24px 30px 28px; vertical-align: middle; width: 57%;">
                      <div class="hero-main-title" style="color: #ffffff; font-size: 24px; font-weight: 800; line-height: 1.25; letter-spacing: -0.4px;">
                        Welcome to OneHaat,<br />
                        <span style="font-weight: 800;">${userName}!</span>
                      </div>
                      <div style="color: #d1fae5; font-size: 13px; line-height: 1.55; margin-top: 10px; font-weight: 400;">
                        Your neighborhood haat is entering the digital age. Counter-shelf honest pricing and zero dark store markup.
                      </div>
                    </td>
                    <!-- Right Column: Lightweight 3D Grocery Smartphone Illustration (Only 9KB) -->
                    <td class="hero-right-td" align="right" style="padding: 14px 18px 14px 0; vertical-align: middle; width: 43%;">
                      <img src="cid:email-hero-graphic" class="hero-graphic-img" alt="OneHaat Shopping" width="220" style="display: block; width: 100%; max-width: 220px; height: auto; border: 0; border-radius: 12px;" />
                    </td>
                  </tr>
                </table>

                <!-- 3. Greeting Text -->
                <div style="margin-bottom: 22px;">
                  <div style="font-size: 15px; color: #0f172a; line-height: 1.5;">
                    Hello <strong style="color: #065f46;">${userName}</strong>,
                  </div>
                  <div style="font-size: 13.5px; color: #334155; line-height: 1.6; margin-top: 8px;">
                    Thank you for reserving your priority spot. We are rolling out colony by colony across Bengaluru to empower genuine neighborhood grocers and bring fair, transparent pricing back to daily essentials.
                  </div>
                </div>

                <!-- 4. Reservation Summary Card (Code-Made Calendar Checkmark + At Badge) -->
                <div style="background: linear-gradient(135deg, #f0fdf4 0%, #f7fee7 50%, #ecfdf5 100%); border: 1px solid #bbf7d0; border-radius: 18px; padding: 18px 20px; margin-bottom: 24px; box-shadow: 0 4px 14px -3px rgba(5, 150, 105, 0.06);">
                  
                  <!-- Card Header: Code-Made Calendar Checkmark + Title -->
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 12px;">
                    <tr>
                      <td style="width: 34px; vertical-align: middle;">
                        <div style="width: 32px; height: 32px; background-color: #ffffff; border: 1.5px solid #86efac; border-radius: 8px; text-align: center; vertical-align: middle; padding-top: 4px; box-sizing: border-box;">
                          <div style="width: 18px; height: 3px; background-color: #059669; border-radius: 2px; margin: 0 auto 2px auto;"></div>
                          <div style="font-size: 15px; font-weight: 900; color: #059669; line-height: 1;">&#10003;</div>
                        </div>
                      </td>
                      <td style="vertical-align: middle; padding-left: 10px;">
                        <span style="font-size: 15px; font-weight: 800; color: #065f46;">Reservation Summary</span>
                      </td>
                    </tr>
                  </table>

                  <!-- Detail Table: Registered Email & Reserved Handle -->
                  <div style="border-top: 1px solid rgba(187, 247, 208, 0.7); padding-top: 10px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding: 7px 0; vertical-align: middle;">
                          <span style="display: inline-block; font-size: 15px; color: #059669; vertical-align: middle; margin-right: 8px; font-weight: bold; line-height: 1;">&#9993;</span>
                          <span style="vertical-align: middle; font-size: 13px; color: #475569; font-weight: 600;">
                            Registered Email:
                          </span>
                        </td>
                        <td class="summary-badge-cell" align="right" style="padding: 7px 0; vertical-align: middle;">
                          <span class="summary-badge" style="display: inline-block; padding: 4px 12px; background-color: #dcfce7; border: 1px solid #86efac; border-radius: 8px; font-size: 12px; font-weight: 700; color: #065f46;">
                            ${email}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 7px 0; vertical-align: middle;">
                          <span style="display: inline-block; width: 16px; height: 16px; background-color: #ecfdf5; border: 1.5px solid #86efac; border-radius: 50%; text-align: center; line-height: 13px; font-size: 11px; font-weight: 800; color: #059669; vertical-align: middle; margin-right: 8px;">@</span>
                          <span style="vertical-align: middle; font-size: 13px; color: #475569; font-weight: 600;">
                            Reserved Handle:
                          </span>
                        </td>
                        <td class="summary-badge-cell" align="right" style="padding: 7px 0; vertical-align: middle;">
                          <span class="summary-badge" style="display: inline-block; padding: 4px 12px; background-color: #dcfce7; border: 1px solid #86efac; border-radius: 8px; font-size: 12px; font-weight: 700; color: #065f46;">
                            @${userHandle}
                          </span>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>

                <!-- 5. Included Early Access Benefits (Code-Made Rocket and Avatar Icons) -->
                <div style="margin-bottom: 20px;">
                  
                  <!-- Section Heading with Emerald Indicator Pill -->
                  <table role="presentation" cellspacing="0" cellpadding="0" style="margin-bottom: 12px;">
                    <tr>
                      <td style="vertical-align: middle; width: 4px;">
                        <div style="width: 4px; height: 16px; background-color: #059669; border-radius: 4px;"></div>
                      </td>
                      <td style="vertical-align: middle; padding-left: 8px;">
                        <span style="font-size: 14px; font-weight: 800; color: #0f172a; text-transform: none; letter-spacing: 0.1px;">
                          Included Early Access Benefits:
                        </span>
                      </td>
                    </tr>
                  </table>

                  <!-- Two-Column / One-Column Responsive Cards Table -->
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                    <tr>
                      <!-- Benefit Card 01: Exclusive Beta Access (Code-Made Rocket Launch Object) -->
                      <td class="benefit-col" style="width: 48.5%; vertical-align: top;">
                        <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 14px 16px; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02); height: 100%; box-sizing: border-box;">
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                            <tr>
                              <td style="width: 42px; vertical-align: top; padding-right: 12px;">
                                <div style="width: 38px; height: 38px; background-color: #ecfdf5; border: 1.5px solid #a7f3d0; border-radius: 10px; text-align: center; vertical-align: middle; padding-top: 5px; box-sizing: border-box;">
                                  <!-- Code-Made Rocket: Nose, Body, Thrust Flame -->
                                  <div style="width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-bottom: 9px solid #059669; margin: 0 auto;"></div>
                                  <div style="width: 8px; height: 10px; background-color: #059669; margin: 0 auto; border-radius: 0 0 2px 2px;"></div>
                                  <div style="width: 4px; height: 3px; background-color: #f59e0b; margin: 1px auto 0 auto; border-radius: 0 0 2px 2px;"></div>
                                </div>
                              </td>
                              <td style="vertical-align: top;">
                                <div style="font-size: 13px; font-weight: 700; color: #0f172a;">Exclusive Beta Access</div>
                                <div style="font-size: 11.5px; color: #64748b; line-height: 1.45; margin-top: 3px;">
                                  Direct invite link to test-drive the OneHaat mobile app before public launch.
                                </div>
                              </td>
                            </tr>
                          </table>
                        </div>
                      </td>

                      <!-- Responsive Gap Spacer -->
                      <td class="benefit-spacer" style="width: 3%;"></td>

                      <!-- Benefit Card 02: Priority Username Claim (Code-Made User Profile Object) -->
                      <td class="benefit-col" style="width: 48.5%; vertical-align: top;">
                        <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 14px 16px; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02); height: 100%; box-sizing: border-box;">
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                            <tr>
                              <td style="width: 42px; vertical-align: top; padding-right: 12px;">
                                <div style="width: 38px; height: 38px; background-color: #ecfdf5; border: 1.5px solid #a7f3d0; border-radius: 10px; text-align: center; vertical-align: middle; padding-top: 8px; box-sizing: border-box;">
                                  <!-- Code-Made Avatar: Head circle, Body arch -->
                                  <div style="width: 10px; height: 10px; background-color: #059669; border-radius: 50%; margin: 0 auto 2px auto;"></div>
                                  <div style="width: 18px; height: 8px; background-color: #059669; border-radius: 8px 8px 0 0; margin: 0 auto;"></div>
                                </div>
                              </td>
                              <td style="vertical-align: top;">
                                <div style="font-size: 13px; font-weight: 700; color: #0f172a;">Priority Username Claim</div>
                                <div style="font-size: 11.5px; color: #64748b; line-height: 1.45; margin-top: 3px;">
                                  Your unique handle @${userHandle} is held for your account.
                                </div>
                              </td>
                            </tr>
                          </table>
                        </div>
                      </td>
                    </tr>
                  </table>
                </div>

                <!-- 6. Merchant Recommendation Card (Code-Made Storefront Object) -->
                <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 16px; padding: 16px 18px; margin-bottom: 24px;">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                    <tr>
                      <td style="width: 42px; vertical-align: top; padding-right: 12px;">
                        <div style="width: 40px; height: 40px; background-color: #ffffff; border: 1.5px solid #86efac; border-radius: 10px; text-align: center; vertical-align: middle; padding-top: 8px; box-sizing: border-box;">
                          <!-- Code-Made Shop: Awning roof, Pillars, Center entrance door -->
                          <div style="width: 20px; height: 6px; background-color: #059669; border-radius: 3px 3px 0 0; margin: 0 auto 1px auto;"></div>
                          <div style="width: 18px; height: 11px; border-left: 2.5px solid #059669; border-right: 2.5px solid #059669; border-bottom: 2px solid #059669; margin: 0 auto; box-sizing: border-box; text-align: center;">
                            <div style="width: 6px; height: 7px; background-color: #059669; margin: 2px auto 0 auto; border-radius: 2px 2px 0 0;"></div>
                          </div>
                        </div>
                      </td>
                      <td style="vertical-align: top;">
                        <div style="font-size: 13.5px; font-weight: 700; color: #0f172a; line-height: 1.35;">
                          Have a preferred grocer or pharmacy in your locality?
                        </div>
                        <div style="font-size: 12px; color: #475569; line-height: 1.55; margin-top: 5px;">
                          Reply to this email or write to <span style="display: inline-block; padding: 1px 7px; background-color: #ffffff; border: 1px solid #86efac; border-radius: 6px; color: #047857; font-weight: 700; text-decoration: none;">access.onehaat@gmail.com</span> with their shop name and colony, and our onboarding team will reach out to them.
                        </div>
                      </td>
                    </tr>
                  </table>
                </div>

                <!-- 7. Sign-off and Code-Made Sprout Leaves Object -->
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 6px;">
                  <tr>
                    <td style="vertical-align: middle;">
                      <div style="font-size: 13px; color: #475569; line-height: 1.5;">
                        Sincerely,<br />
                        <strong style="color: #065f46; font-size: 14px;">The OneHaat Team</strong>
                      </div>
                    </td>
                    <td align="right" style="vertical-align: middle;">
                      <!-- Code-Made Sprout Leaves (Zero Download Overhead, Perfect Organic Curves, Zero Crop Cutoff) -->
                      <table role="presentation" cellspacing="0" cellpadding="0" style="display: inline-table; vertical-align: middle;">
                        <tr>
                          <!-- Small Left Leaf -->
                          <td style="vertical-align: bottom; padding-right: 2px;">
                            <div style="width: 16px; height: 24px; background: linear-gradient(135deg, #34d399 0%, #10b981 100%); border-radius: 100% 0 100% 0; box-shadow: 0 1px 3px rgba(5, 150, 105, 0.2);"></div>
                          </td>
                          <!-- Main Right Leaf -->
                          <td style="vertical-align: bottom;">
                            <div style="width: 22px; height: 34px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 0 100% 0 100%; box-shadow: 0 2px 5px rgba(5, 150, 105, 0.25);"></div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

              </td>
            </tr>

            <!-- 8. Footer (Curved Deep Emerald Banner) -->
            <tr>
              <td class="footer-cell" style="background: linear-gradient(180deg, #047857 0%, #064e3b 100%); border-radius: 0 0 28px 28px; padding: 22px 24px; text-align: center;">
                <div style="font-size: 12px; color: #ffffff; font-weight: 500;">
                  OneHaat Technologies Pvt. Ltd. All rights reserved.
                </div>
                <div style="font-size: 11px; color: #a7f3d0; margin-top: 6px;">
                  One Market. Every Need. &nbsp;|&nbsp; Contact: <a href="mailto:access.onehaat@gmail.com" style="color: #6ee7b7; text-decoration: underline; font-weight: 600;">access.onehaat@gmail.com</a>
                </div>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
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

                                    // Resolve lightweight brand assets for inline CID embedding (Logo: 64KB, Hero Graphic: 9KB)
            const logoPath = path.join(process.cwd(), 'public', 'logo.png');
            const heroGraphicPath = path.join(process.cwd(), 'public', 'email-hero-graphic.jpg');

            const attachments = [
                        fs.existsSync(logoPath) ? { filename: 'logo.png', path: logoPath, cid: 'onehaat-logo' } : null,
                        fs.existsSync(heroGraphicPath) ? { filename: 'email-hero-graphic.jpg', path: heroGraphicPath, cid: 'email-hero-graphic' } : null,
            ].filter(Boolean) as any[];

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
