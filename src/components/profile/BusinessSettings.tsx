import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Shield, ShieldAlert } from "lucide-react";
import { supabase } from "../../../supabase/supabase";
import { useAuth } from "../../../supabase/auth";

export default function BusinessSettings() {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user, userProfile } = useAuth();

  useEffect(() => {
    if (userProfile) {
      setIs2FAEnabled(userProfile.is_2fa_enabled || false);
    }
  }, [userProfile]);

  const handleToggle2FA = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from("users")
        .update({ is_2fa_enabled: !is2FAEnabled })
        .eq("id", user.id);

      if (error) throw error;

      setIs2FAEnabled(!is2FAEnabled);
      toast({
        title: !is2FAEnabled ? "2FA Enabled" : "2FA Disabled",
        description: !is2FAEnabled
          ? "Two-factor authentication has been enabled for your account"
          : "Two-factor authentication has been disabled for your account",
      });
    } catch (error) {
      console.error("Error updating 2FA settings:", error);
      toast({
        title: "Error",
        description: "Failed to update 2FA settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Only show this component for business users
  if (userProfile?.role !== "business") {
    return null;
  }

  return (
    <Card className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-left">
      <CardHeader className="p-0 pb-4">
        <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <Shield className="h-5 w-5 text-indigo-600" />
          Security Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 space-y-6">
        <div className="flex items-center justify-between py-4 border-b border-gray-100">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-indigo-600" />
              <Label htmlFor="2fa-toggle" className="font-medium text-gray-900">
                Two-Factor Authentication
              </Label>
            </div>
            <p className="text-sm text-gray-600">
              Require a verification code sent to your email when signing in
            </p>
          </div>
          <Switch
            id="2fa-toggle"
            checked={is2FAEnabled}
            onCheckedChange={handleToggle2FA}
            disabled={loading}
          />
        </div>

        <div className="bg-indigo-50 p-4 rounded-lg">
          <h4 className="font-medium text-indigo-900 mb-2">
            Why use Two-Factor Authentication?
          </h4>
          <p className="text-sm text-indigo-700">
            Two-factor authentication adds an extra layer of security to your
            account. When enabled, you'll need to enter a verification code sent
            to your email in addition to your password when signing in.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
