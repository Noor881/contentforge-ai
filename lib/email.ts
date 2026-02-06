import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY
    ? new Resend(process.env.RESEND_API_KEY)
    : null

const FROM_EMAIL = process.env.EMAIL_FROM || 'noreply@contentforge.ai'

export async function sendEmail({
    to,
    subject,
    html,
}: {
    to: string
    subject: string
    html: string
}) {
    if (!resend) {
        console.log('[Email Mock]', { to, subject })
        return { success: true, mock: true }
    }

    try {
        const data = await resend.emails.send({
            from: FROM_EMAIL,
            to,
            subject,
            html,
        })

        return { success: true, data }
    } catch (error) {
        console.error('Email sending error:', error)
        throw error
    }
}

export async function sendWelcomeEmail(email: string, name: string) {
    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #0ea5e9, #d946ef); padding: 30px; text-align: center; border-radius: 10px; }
          .header h1 { color: white; margin: 0; }
          .content { padding: 30px 0; }
          .button { display: inline-block; background: #0ea5e9; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; color: #666; font-size: 14px; padding-top: 20px; border-top: 1px solid #eee; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to ContentForge AI!</h1>
          </div>
          <div class="content">
            <h2>Hi ${name},</h2>
            <p>Welcome to ContentForge AI! Your 3-day free trial has started.</p>
            <p>You now have access to:</p>
            <ul>
              <li>AI Blog Post Generator</li>
              <li>Social Media Content Creator</li>
              <li>Email Template Generator</li>
              <li>Video Script Writer</li>
              <li>Ad Copy Generator</li>
              <li>SEO Meta Description Tool</li>
            </ul>
            <p>Create up to 5 pieces of content during your trial!</p>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" class="button">Start Creating</a>
          </div>
          <div class="footer">
            <p>ContentForge AI - AI-Powered Content Creation Platform</p>
          </div>
        </div>
      </body>
    </html>
  `

    return sendEmail({
        to: email,
        subject: 'Welcome to ContentForge AI - Your Trial Has Started!',
        html,
    })
}

export async function sendTrialReminderEmail(
    email: string,
    name: string,
    daysRemaining: number
) {
    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #0ea5e9, #d946ef); padding: 30px; text-align: center; border-radius: 10px; }
          .header h1 { color: white; margin: 0; }
          .content { padding: 30px 0; }
          .highlight { background: #fef3c7; padding: 15px; border-radius: 5px; margin: 20px 0; }
          .button { display: inline-block; background: #0ea5e9; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; color: #666; font-size: 14px; padding-top: 20px; border-top: 1px solid #eee; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Your Trial is Expiring Soon!</h1>
          </div>
          <div class="content">
            <h2>Hi ${name},</h2>
            <div class="highlight">
              <strong>⏰ ${daysRemaining} day${daysRemaining !== 1 ? 's' : ''} remaining</strong> in your ContentForge AI trial!
            </div>
            <p>Don't lose access to powerful AI content generation tools.</p>
            <p><strong>Why upgrade?</strong></p>
            <ul>
              <li>Generate 100+ pieces of content per month</li>
              <li>Access all premium features</li>
              <li>Priority support</li>
              <li>Advanced customization options</li>
            </ul>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/pricing" class="button">Upgrade Now</a>
          </div>
          <div class="footer">
            <p>ContentForge AI - AI-Powered Content Creation Platform</p>
          </div>
        </div>
      </body>
    </html>
  `

    return sendEmail({
        to: email,
        subject: `${daysRemaining} Day${daysRemaining !== 1 ? 's' : ''} Left in Your Trial!`,
        html,
    })
}

export async function sendSubscriptionConfirmedEmail(
    email: string,
    name: string,
    tier: string
) {
    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #22c55e, #0ea5e9); padding: 30px; text-align: center; border-radius: 10px; }
          .header h1 { color: white; margin: 0; }
          .content { padding: 30px 0; }
          .success { background: #dcfce7; padding: 15px; border-radius: 5px; margin: 20px 0; text-align: center; }
          .button { display: inline-block; background: #0ea5e9; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; color: #666; font-size: 14px; padding-top: 20px; border-top: 1px solid #eee; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Subscription Confirmed!</h1>
          </div>
          <div class="content">
            <h2>Hi ${name},</h2>
            <div class="success">
              <strong>✅ Your ${tier.toUpperCase()} subscription is now active!</strong>
            </div>
            <p>Thank you for upgrading to ContentForge AI ${tier}!</p>
            <p>You now have access to:</p>
            <ul>
              <li>Generate ${tier === 'pro' ? '100' : '1000'}+ pieces of content per month</li>
              <li>All content generation tools</li>
              <li>Priority support</li>
              <li>Advanced features</li>
            </ul>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" class="button">Start Creating</a>
          </div>
          <div class="footer">
            <p>ContentForge AI - AI-Powered Content Creation Platform</p>
            <p>Manage your subscription in <a href="${process.env.NEXT_PUBLIC_APP_URL}/billing">billing settings</a></p>
          </div>
        </div>
      </body>
    </html>
  `

    return sendEmail({
        to: email,
        subject: 'Your ContentForge AI Subscription is Active!',
        html,
    })
}
