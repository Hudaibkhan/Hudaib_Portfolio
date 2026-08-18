# Contact Form Setup Instructions

## 🎯 Prerequisites

Before the contact form will work, you need to set up Resend and configure your environment variables.

### Step 1: Sign up for Resend

1. Go to [resend.com](https://resend.com) and create a free account
2. Verify your email address
3. Navigate to the **API Keys** section in the dashboard
4. Click **Create API Key** and copy it

### Step 2: Configure Environment Variables

Create or update your `.env.local` file in the project root:

```bash
# Resend API Key (from Step 1)
RESEND_API_KEY=re_your_actual_api_key_here

# Your email where contact form submissions will be sent
CONTACT_EMAIL=your_email@gmail.com
```

**Important Notes:**
- Never commit `.env.local` to git (it's already in `.gitignore`)
- The `RESEND_API_KEY` must start with `re_`
- Use your actual email address for `CONTACT_EMAIL`

### Step 3: Restart Development Server

After adding the environment variables:

```bash
# Stop the current dev server (Ctrl+C)
# Then restart:
npm run dev
```

## 📧 Email Configuration

### For Testing (Current Setup)
The form currently uses Resend's test domain:
- **From:** `onboarding@resend.dev`
- **Limitation:** Only sends to YOUR verified email address
- **Good for:** Development and testing

### For Production (Recommended)
To avoid emails landing in spam:

1. **Add Your Domain to Resend:**
   - Go to Resend Dashboard → Domains
   - Click "Add Domain"
   - Add your domain (e.g., `yourdomain.com`)
   - Follow DNS setup instructions

2. **Update the Server Action:**
   - Edit `app/actions/contact.ts`
   - Change the `from` field:
   ```typescript
   from: 'Portfolio Contact <noreply@yourdomain.com>'
   ```

## 🛡️ Security Features Implemented

### Client-Side
- **React Hook Form** - Efficient form state management
- **Zod Validation** - Type-safe schema validation
- **Real-time Validation** - Errors show as user types
- **Disabled Submit** - Button disabled until form is valid

### Server-Side
- **Schema Re-validation** - Never trust client-only validation
- **Honeypot Field** - Hidden field to catch bots
- **Server Actions** - Secure API endpoint
- **Environment Variables** - API keys never exposed to client
- **Error Handling** - Graceful failure messages

## 📋 Form Features

### Validation Rules
- **Name:** 2-100 characters
- **Email:** Valid email format, max 200 characters
- **Message:** 10-2000 characters
- **Website (Honeypot):** Must be empty (hidden field)

### User Experience
- ✅ Inline error messages with icons
- ✅ Loading state during submission
- ✅ Success confirmation message
- ✅ Clear error messages if submission fails
- ✅ Form resets after successful submission
- ✅ Auto-dismiss notifications after 5-8 seconds
- ✅ Smooth animations and transitions

### Email Features
- **Reply-To:** Set to sender's email for easy replies
- **HTML Email:** Nicely formatted with your brand colors
- **Responsive:** Works on all email clients
- **Pre-wrap Message:** Preserves line breaks from textarea

## 🧪 Testing Checklist

Before going live, test these scenarios:

1. **Valid Submission:**
   - Fill form correctly
   - Verify email arrives in your inbox
   - Test "Reply" in your email client works correctly

2. **Validation Tests:**
   - Try submitting with empty fields → Should show errors
   - Enter invalid email (e.g., "notanemail") → Should show error
   - Enter 1 character name → Should show error
   - Enter 5 character message → Should show error

3. **Security Tests:**
   - Submit without filling honeypot → Should work
   - Manually fill honeypot (inspect element) → Should be rejected

4. **Edge Cases:**
   - Very long message (1900+ characters) → Should work
   - Special characters in message → Should work
   - Multiple rapid submissions → Should handle gracefully

## 🚀 Production Deployment

When deploying to Vercel/Netlify/etc.:

1. Add environment variables in your hosting dashboard:
   - `RESEND_API_KEY`
   - `CONTACT_EMAIL`

2. Update the `from` email to use your custom domain

3. Test the form on production before announcing

## 📊 Monitoring

Check Resend Dashboard regularly to:
- Monitor email delivery rates
- Check for failed sends
- View email logs
- Monitor API usage (free tier: 100 emails/day)

## 🆘 Troubleshooting

### "Email service is not configured"
- Check that `RESEND_API_KEY` is set in `.env.local`
- Verify the API key starts with `re_`
- Restart your dev server

### "Contact email is not configured"
- Check that `CONTACT_EMAIL` is set in `.env.local`
- Restart your dev server

### Emails not arriving
- Check spam folder
- Verify email address in `CONTACT_EMAIL`
- Check Resend dashboard for delivery logs
- Ensure you're not over free tier limit (100/day)

### Form validation not working
- Open browser console for errors
- Check that all required fields have `*` indicator
- Verify zod schema matches form fields

## 📝 Future Enhancements (Optional)

Consider adding:
- Rate limiting (e.g., 5 submissions per hour per IP)
- reCAPTCHA for additional bot protection
- Email templates from Resend
- Attachment support
- Auto-responder email to sender
- Database logging of submissions
- Admin dashboard to view submissions
