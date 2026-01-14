import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactFormRequest {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, service, message }: ContactFormRequest = await req.json();

    // Validate required fields
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Name, email, and message are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Send notification email to the salon
    const notificationRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "SC Signature Contact Form <onboarding@resend.dev>",
        to: ["scsignaturestyles@gmail.com"],
        subject: `New Contact Form Message from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #9b4d7a; border-bottom: 2px solid #9b4d7a; padding-bottom: 10px;">
              New Contact Form Submission
            </h1>
            
            <div style="background-color: #f9f5f7; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #333;">Customer Details</h3>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              ${phone ? `<p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>` : ''}
              ${service ? `<p><strong>Service Interest:</strong> ${service}</p>` : ''}
            </div>
            
            <div style="background-color: #fff; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
              <h3 style="margin-top: 0; color: #333;">Message</h3>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
            
            <p style="color: #666; font-size: 12px; margin-top: 30px;">
              This message was sent from the SC Signature website contact form.
            </p>
          </div>
        `,
      }),
    });

    if (!notificationRes.ok) {
      const errorData = await notificationRes.text();
      console.error("Failed to send notification email:", errorData);
      throw new Error(`Failed to send notification email: ${errorData}`);
    }

    console.log("Notification email sent successfully");

    // Send confirmation email to the customer
    const confirmationRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "SC Signature Hair Salon <onboarding@resend.dev>",
        to: [email],
        subject: "Thank you for contacting SC Signature! ✨",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #9b4d7a; text-align: center;">Thank You, ${name}! 💖</h1>
            
            <p style="font-size: 16px; line-height: 1.6;">
              We've received your message and are excited to hear from you! Our team will get back to you as soon as possible.
            </p>
            
            <div style="background-color: #f9f5f7; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
              <p style="margin: 0; font-size: 16px;">
                Ready to book your appointment?
              </p>
              <a href="https://sharoncarr.glossgenius.com/book" 
                 style="display: inline-block; background: linear-gradient(135deg, #d4719c, #9b4d7a); color: white; padding: 12px 30px; border-radius: 25px; text-decoration: none; margin-top: 15px; font-weight: bold;">
                Book Now
              </a>
            </div>
            
            <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px;">
              <p style="color: #666; font-size: 14px; margin: 5px 0;">
                <strong>SC Signature Hair Salon</strong>
              </p>
              <p style="color: #666; font-size: 14px; margin: 5px 0;">
                📍 624 Montgomery Hwy Suite 10, Vestavia Hills, AL 35216
              </p>
              <p style="color: #666; font-size: 14px; margin: 5px 0;">
                📞 (205) 615-9273
              </p>
              <p style="color: #666; font-size: 14px; margin: 5px 0;">
                ✉️ scsignaturestyles@gmail.com
              </p>
            </div>
          </div>
        `,
      }),
    });

    if (!confirmationRes.ok) {
      console.error("Failed to send confirmation email, but notification was sent");
    } else {
      console.log("Confirmation email sent successfully");
    }

    return new Response(
      JSON.stringify({ success: true, message: "Emails sent successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
