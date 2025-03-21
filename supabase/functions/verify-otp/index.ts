import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.6";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    const { userId, otp } = await req.json();

    if (!userId || !otp) {
      return new Response(
        JSON.stringify({ error: "User ID and OTP are required" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        },
      );
    }

    // Get user with OTP
    const { data: user, error: userError } = await supabaseClient
      .from("users")
      .select("otp_secret, otp_expires_at")
      .eq("id", userId)
      .single();

    if (userError || !user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 404,
      });
    }

    // Check if OTP is valid
    if (user.otp_secret !== otp) {
      return new Response(JSON.stringify({ error: "Invalid OTP" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Check if OTP is expired
    const now = new Date();
    const expiresAt = new Date(user.otp_expires_at);
    if (now > expiresAt) {
      return new Response(JSON.stringify({ error: "OTP has expired" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Clear OTP after successful verification
    await supabaseClient
      .from("users")
      .update({
        otp_secret: null,
        otp_expires_at: null,
      })
      .eq("id", userId);

    return new Response(
      JSON.stringify({ success: true, message: "OTP verified successfully" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
