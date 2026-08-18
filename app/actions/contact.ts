'use server';

import { Resend } from 'resend';
import { contactFormSchema } from '@/lib/validation';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(formData: FormData) {
  // Extract and validate data
  const data = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    message: formData.get('message') as string,
    website: formData.get('website') as string, // Honeypot
  };

  // Server-side validation
  const validatedData = contactFormSchema.safeParse(data);

  if (!validatedData.success) {
    return {
      success: false,
      error: 'Invalid form data. Please check your inputs.',
    };
  }

  // Honeypot check - if filled, it's likely a bot
  if (data.website) {
    return {
      success: false,
      error: 'Invalid submission detected.',
    };
  }

  const { name, email, message } = validatedData.data;

  // Check environment variables
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set');
    return {
      success: false,
      error: 'Email service is not configured. Please contact the site administrator.',
    };
  }

  if (!process.env.CONTACT_EMAIL) {
    console.error('CONTACT_EMAIL is not set');
    return {
      success: false,
      error: 'Contact email is not configured. Please contact the site administrator.',
    };
  }

  try {
    // Send email using Resend
    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Use Resend test domain for now
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #1B1B1B; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: #F7F4EE; border-radius: 12px; padding: 30px; margin-bottom: 20px;">
              <h2 style="color: #2F5D50; margin-top: 0; font-size: 24px; font-weight: 700;">New Portfolio Contact Message</h2>
              <div style="background: #FFFFFF; border: 1px solid #E7E3D8; border-radius: 8px; padding: 20px; margin-top: 20px;">
                <p style="margin: 0 0 15px 0;">
                  <strong style="color: #2F5D50; display: inline-block; min-width: 80px;">From:</strong>
                  <span style="color: #1B1B1B;">${name}</span>
                </p>
                <p style="margin: 0 0 15px 0;">
                  <strong style="color: #2F5D50; display: inline-block; min-width: 80px;">Email:</strong>
                  <a href="mailto:${email}" style="color: #2F5D50; text-decoration: none;">${email}</a>
                </p>
                <hr style="border: none; border-top: 1px solid #E7E3D8; margin: 20px 0;" />
                <p style="margin: 0 0 10px 0;">
                  <strong style="color: #2F5D50;">Message:</strong>
                </p>
                <div style="background: #F7F4EE; border-radius: 6px; padding: 15px; white-space: pre-wrap; word-wrap: break-word;">
                  ${message.replace(/\n/g, '<br>')}
                </div>
              </div>
              <p style="margin-top: 20px; font-size: 14px; color: #8A8375;">
                You can reply directly to this email to respond to ${name}.
              </p>
            </div>
            <div style="text-align: center; font-size: 12px; color: #8A8375; margin-top: 30px;">
              <p>This message was sent from your portfolio contact form.</p>
            </div>
          </body>
        </html>
      `,
    });

    return {
      success: true,
      message: 'Message sent successfully!',
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      error: 'Failed to send message. Please try again later or contact me directly via email.',
    };
  }
}
