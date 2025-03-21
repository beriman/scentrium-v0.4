import { useState } from "react";
import { useAuth } from "../../../supabase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../../../supabase/supabase";
import OTPVerification from "./OTPVerification";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTPVerification, setShowOTPVerification] = useState(false);
  const [otpData, setOtpData] = useState<{
    userId: string;
    email: string;
  } | null>(null);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn(email, password);

      if (result.requires2FA && result.userId && result.email) {
        // Show OTP verification screen
        setOtpData({ userId: result.userId, email: result.email });
        setShowOTPVerification(true);
      } else {
        // Regular login, redirect to profile
        navigate("/profile");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleOTPSuccess = () => {
    navigate("/profile");
  };

  const handleOTPCancel = () => {
    setShowOTPVerification(false);
    setOtpData(null);
  };

  if (showOTPVerification && otpData) {
    return (
      <OTPVerification
        userId={otpData.userId}
        email={otpData.email}
        onSuccess={handleOTPSuccess}
        onCancel={handleOTPCancel}
      />
    );
  }

  return (
    <AuthLayout>
      <div className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12 rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </Label>
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-12 rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button
            type="submit"
            className="w-full h-12 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 text-sm font-medium"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Masuk"}
          </Button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300"></span>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Atau masuk dengan
              </span>
            </div>
          </div>

          <div className="mt-4">
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                style: {
                  button: {
                    borderRadius: "9999px",
                    height: "48px",
                    fontSize: "14px",
                    fontWeight: "500",
                  },
                },
                variables: {
                  default: {
                    colors: {
                      brand: "#4f46e5",
                      brandAccent: "#4338ca",
                    },
                  },
                },
              }}
              providers={["google"]}
              redirectTo={window.location.origin + "/profile"}
              view="sign_in"
              showLinks={false}
              onlyThirdPartyProviders={true}
            />
          </div>

          <div className="text-sm text-center text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-indigo-600 hover:underline font-medium"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
