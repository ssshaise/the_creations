import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, phone, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const host = process.env.SMTP_HOST?.trim();
    const port = Number(process.env.SMTP_PORT) || 587;
    const user = process.env.SMTP_USER?.trim();
    // Google App Passwords are shown as 4 groups of 4 letters with spaces: "abcd efgh ijkl mnop"
    // Strip all spaces and quotes so both work seamlessly
    const pass = process.env.SMTP_PASS?.replace(/\s+/g, '').replace(/['"]/g, '').trim();
    const toEmail = process.env.CONTACT_RECEIVER_EMAIL?.trim() || user || '[EMAIL_ADDRESS]';

    const isSmtpConfigured = Boolean(host && user && pass);

    if (isSmtpConfigured) {
      const transporter = nodemailer.createTransport(
        host?.includes('gmail') || user?.includes('@gmail.com')
          ? {
            service: 'gmail',
            auth: { user, pass },
          }
          : {
            host,
            port,
            secure: port === 465,
            auth: { user, pass },
          }
      );

      // 1. Email to the atelier team
      await transporter.sendMail({
        from: `"The Creations Atelier" <${user}>`,
        to: toEmail,
        replyTo: email,
        subject: `[New Inquiry] ${subject || 'Commission Inquiry'} from ${name}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e8e3d8; background-color: #faf8f5;">
            <div style="border-bottom: 2px solid #8c734b; padding-bottom: 12px; margin-bottom: 20px;">
              <h2 style="color: #161618; margin: 0; font-size: 22px;">The Creations Atelier</h2>
              <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #8c734b;">New Collector Inquiry</span>
            </div>
            
            <p><strong>Patron Name:</strong> ${name}</p>
            <p><strong>Email Address:</strong> <a href="mailto:${email}">${email}</a></p>
            ${phone ? `<p><strong>Mobile Number:</strong> ${phone}</p>` : ''}
            <p><strong>Subject / Request:</strong> ${subject || 'Bespoke Art Inquiry'}</p>
            
            <div style="margin-top: 16px; padding: 16px; background: #ffffff; border: 1px solid #e8e3d8; border-left: 3px solid #8c734b;">
              <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #161618; white-space: pre-wrap;">${message}</p>
            </div>
            
            <p style="font-size: 11px; color: #73737c; margin-top: 24px; text-align: center;">
              Dispatched from The Creations Online Studio • Lucknow, India
            </p>
          </div>
        `,
      });

      // 2. Confirmation email to the patron
      try {
        await transporter.sendMail({
          from: `"The Creations Atelier" <${user}>`,
          to: email,
          subject: `We have received your inquiry — The Creations`,
          html: `
            <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 32px; border: 1px solid #e8e3d8; background-color: #faf8f5; color: #161618;">
              <h1 style="font-weight: normal; font-size: 26px; margin-bottom: 6px;">The Creations</h1>
              <p style="color: #8c734b; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin-top: 0;">
                Handcrafted Resin & Timber Atelier
              </p>
              
              <p style="font-size: 15px; line-height: 1.7; margin-top: 24px;">
                Dear ${name},
              </p>
              <p style="font-size: 14px; line-height: 1.7; color: #4a4a50;">
                Thank you for contacting The Creations. We have received your inquiry regarding <strong>"${subject || 'Bespoke Resin Art'}"</strong>.
              </p>
              <p style="font-size: 14px; line-height: 1.7; color: #4a4a50;">
                Our master artisans in Lucknow personally evaluate each custom commission and design consultation. A member of our atelier team will respond to you within 24 business hours.
              </p>
              
              <hr style="border: none; border-top: 1px solid #e8e3d8; margin: 28px 0;" />
              <div style="font-size: 12px; color: #73737c; line-height: 1.6;">
                <p style="margin: 0 0 4px 0;"><strong>Studio & Atelier:</strong> Lucknow, Uttar Pradesh, 226030</p>
                <p style="margin: 0 0 4px 0;"><strong>Phone:</strong> +91 9555052529</p>
                <p style="margin: 0;"><strong>Email:</strong> [EMAIL_ADDRESS]</p>
              </div>
            </div>
          `,
        });
      } catch (clientMailErr) {
        console.warn('Could not dispatch client confirmation email:', clientMailErr);
      }

      return NextResponse.json({
        success: true,
        message: 'Your message has been dispatched to our master artisan.',
      });
    } else {
      // Development preview mode when SMTP credentials are not yet entered in .env.local
      console.log('──────────────────────────────────────────────────────');
      console.log('📨 [DEV MODE] New Inquiry Received (SMTP not configured in .env.local):');
      console.log(`From: ${name} <${email}>`);
      console.log(`Phone: ${phone || 'Not provided'}`);
      console.log(`Subject: ${subject || 'Bespoke Art Inquiry'}`);
      console.log(`Message: ${message}`);
      console.log('──────────────────────────────────────────────────────');

      return NextResponse.json({
        success: true,
        message: 'Inquiry received successfully! (Simulated mode: add SMTP credentials in .env.local to send live emails)',
      });
    }
  } catch (err: unknown) {
    console.error('Error in /api/contact:', err);
    const isAuthError =
      typeof err === 'object' &&
      err !== null &&
      ('code' in err ? (err as { code: string }).code === 'EAUTH' : false);

    const errorMessage = isAuthError
      ? 'Gmail authentication failed (BadCredentials). Please ensure you generated a 16-character Google App Password and that 2-Step Verification is enabled on your Google account.'
      : 'An unexpected error occurred while sending your message.';

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
