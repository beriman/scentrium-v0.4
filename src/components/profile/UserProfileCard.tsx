import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ActivityItem {
  type: string;
  description: string;
  xpGained: number;
}

interface UserProfileCardProps {
  username: string;
  avatar: string;
  level: number;
  badges: string[];
  currentXP: number;
  maxXP: number;
  recentActivity: ActivityItem[];
}

export default function UserProfileCard({
  username = "PerfumeLover",
  avatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=PerfumeLover",
  level = 4,
  badges = ["Reviewer", "Mixer"],
  currentXP = 350,
  maxXP = 500,
  recentActivity = [
    {
      type: "Posted a review",
      description: '"My thoughts on the new Jasmine collection..."',
      xpGained: 15,
    },
    {
      type: "Replied to a thread",
      description:
        '"I agree, the sandalwood base really makes a difference..."',
      xpGained: 5,
    },
    {
      type: "Received 3 upvotes",
      description: 'On your review of "Midnight Oud"',
      xpGained: 6,
    },
  ],
}: Partial<UserProfileCardProps> = {}) {
  const xpPercentage = (currentXP / maxXP) * 100;

  return (
    <Card className="bg-white p-8 rounded-2xl shadow-sm border border-purple-100 text-left">
      <CardHeader className="p-0 pb-6">
        <h4 className="text-2xl font-semibold mb-4 text-purple-900">
          User Profile
        </h4>

        <div className="flex items-center mb-6">
          <Avatar className="h-16 w-16 mr-4">
            <AvatarImage src={avatar} />
            <AvatarFallback className="bg-purple-200 text-purple-800">
              {username.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h5 className="font-semibold text-lg text-purple-900">
              {username}
            </h5>
            <div className="flex items-center flex-wrap gap-2">
              <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                Level {level}
              </Badge>
              {badges.map((badge, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-indigo-800 border-indigo-200"
                >
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              Experience Points
            </span>
            <span className="text-sm font-medium text-purple-800">
              {currentXP}/{maxXP} XP
            </span>
          </div>
          <Progress
            value={xpPercentage}
            className="h-2 bg-purple-100"
            indicatorClassName="bg-purple-600"
          />
        </div>

        <div className="space-y-4">
          <h5 className="font-medium text-purple-900">Recent Activity</h5>
          {recentActivity.map((activity, index) => (
            <div key={index} className="bg-purple-50 p-3 rounded-lg text-sm">
              <div className="flex justify-between">
                <span className="text-purple-800">{activity.type}</span>
                <span className="text-gray-500">+{activity.xpGained} XP</span>
              </div>
              <p className="text-gray-600 mt-1">{activity.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
