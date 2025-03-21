import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "../../../supabase/supabase";
import AuthLayout from "./AuthLayout";

interface OTPVerificationProps {
  userId: string;
  email: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function OTPVerification({
  userId,
  email,
  onSuccess,
  onCancel,
}: OTPVerificationProps) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const { toast } = useToast();

  useEffect(() => {
    // Send OTP when component mounts
    sendOTP();

    // Set up countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const sendOTP = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke(
        "supabase-functions-send-otp-email",
        {
          body: { userId, email },
        },
      );

      if (error) {
        throw error;
      }

      toast({
        title: "OTP Sent",
        description: `A verification code has been sent to ${email}`,
      });

      // Reset timer
      setTimeLeft(600);
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast({
        title: "Error",
        description: "Failed to send verification code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    if (!otp) {
      toast({
        title: "Error",
        description: "Please enter the verification code",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke(
        "supabase-functions-verify-otp",
        {
          body: { userId, otp },
        },
      );

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Verification successful",
      });

      onSuccess();
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast({
        title: "Error",
        description: "Invalid or expired verification code",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-md mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Two-Factor Authentication
          </h2>
          <p className="text-gray-600 mt-2">
            Please enter the verification code sent to your email
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="otp" className="text-sm font-medium text-gray-700">
              Verification Code
            </Label>
            <Input
              id="otp"
              placeholder="Enter 6-digit code"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="h-12 rounded-lg text-center text-xl tracking-widest"
              maxLength={6}
            />
          </div>

          <div className="text-center text-sm text-gray-600">
            <p>Code expires in: {formatTime(timeLeft)}</p>
            <button
              onClick={sendOTP}
              disabled={loading}
              className="text-indigo-600 hover:text-indigo-800 font-medium mt-2"
              type="button"
            >
              Resend Code
            </button>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={onCancel}
              variant="outline"
              className="w-full h-12 rounded-full"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              onClick={verifyOTP}
              className="w-full h-12 rounded-full bg-indigo-600 text-white hover:bg-indigo-700"
              disabled={loading || timeLeft === 0}
            >
              {loading ? "Verifying..." : "Verify"}
            </Button>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
