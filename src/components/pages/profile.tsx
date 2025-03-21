import React, { useState } from "react";
import TopNavigation from "../dashboard/layout/TopNavigation";
import Sidebar from "../dashboard/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "../../../supabase/auth";
import UserProfileCard from "../profile/UserProfileCard";
import AchievementCard from "../profile/AchievementCard";
import BusinessSettings from "../profile/BusinessSettings";
import { MessageSquare, Sparkles, Users, ShoppingBag } from "lucide-react";

export default function Profile() {
  const { user, userProfile } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  const [fullName, setFullName] = useState(userProfile?.full_name || "");
  const [loading, setLoading] = useState(false);

  const handleSaveProfile = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully",
      });
    }, 1000);
  };

  const achievements = [
    {
      icon: <MessageSquare className="h-8 w-8 text-purple-800" />,
      title: "Conversation Starter",
      description: "Started 5 discussions",
      unlocked: true,
      bgColor: "bg-purple-50",
      iconBgColor: "bg-purple-200",
      iconColor: "text-purple-800",
    },
    {
      icon: <Sparkles className="h-8 w-8 text-indigo-800" />,
      title: "Helpful Reviewer",
      description: "10+ upvoted reviews",
      unlocked: true,
      bgColor: "bg-indigo-50",
      iconBgColor: "bg-indigo-200",
      iconColor: "text-indigo-800",
    },
    {
      icon: <Users className="h-8 w-8 text-gray-500" />,
      title: "Community Pillar",
      description: "Locked - Reach Level 10",
      unlocked: false,
    },
    {
      icon: <ShoppingBag className="h-8 w-8 text-gray-500" />,
      title: "Master Seller",
      description: "Locked - Complete 20 sales",
      unlocked: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <TopNavigation />
      <div className="flex h-[calc(100vh-64px)] mt-16">
        <Sidebar activeItem="Profile" />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              My Profile
            </h1>

            <Tabs
              defaultValue="profile"
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <TabsList className="mb-6">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1">
                    <UserProfileCard
                      username={
                        userProfile?.full_name ||
                        user?.email?.split("@")[0] ||
                        "User"
                      }
                      avatar={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`}
                      level={userProfile?.level || 1}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Card className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-left">
                      <CardHeader className="p-0 pb-6">
                        <CardTitle className="text-2xl font-semibold text-gray-900">
                          Edit Profile
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-0 space-y-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input
                              id="fullName"
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              className="h-12"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              value={user?.email || ""}
                              disabled
                              className="h-12 bg-gray-50"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="role">Account Type</Label>
                            <Input
                              id="role"
                              value={
                                userProfile?.role === "business"
                                  ? "Business"
                                  : "Regular User"
                              }
                              disabled
                              className="h-12 bg-gray-50"
                            />
                          </div>

                          <Button
                            onClick={handleSaveProfile}
                            className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6 h-12"
                            disabled={loading}
                          >
                            {loading ? "Saving..." : "Save Changes"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="achievements">
                <div className="grid grid-cols-1 gap-6">
                  <AchievementCard achievements={achievements} />
                </div>
              </TabsContent>

              <TabsContent value="security">
                <div className="grid grid-cols-1 gap-6">
                  <BusinessSettings />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
