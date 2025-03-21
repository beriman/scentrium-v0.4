import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface Achievement {
  icon: ReactNode;
  title: string;
  description: string;
  unlocked: boolean;
  bgColor?: string;
  iconBgColor?: string;
  iconColor?: string;
}

interface AchievementCardProps {
  achievements: Achievement[];
}

export default function AchievementCard({
  achievements = [],
}: AchievementCardProps) {
  return (
    <Card className="bg-white p-8 rounded-2xl shadow-sm border border-purple-100 text-left">
      <CardHeader className="p-0 pb-4">
        <h4 className="text-2xl font-semibold mb-4 text-purple-900">
          Achievement Badges
        </h4>
      </CardHeader>

      <CardContent className="p-0">
        <div className="grid grid-cols-2 gap-4">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`${achievement.unlocked ? achievement.bgColor || "bg-purple-50" : "bg-gray-100"} 
                        p-4 rounded-xl border ${achievement.unlocked ? "border-purple-100" : "border-gray-200"} 
                        text-center ${!achievement.unlocked ? "opacity-60" : ""}`}
            >
              <div
                className={`h-16 w-16 ${achievement.unlocked ? achievement.iconBgColor || "bg-purple-200" : "bg-gray-200"} 
                          rounded-full flex items-center justify-center mb-3 mx-auto`}
              >
                {achievement.icon}
              </div>
              <h5
                className={`font-medium ${achievement.unlocked ? "text-purple-900" : "text-gray-700"}`}
              >
                {achievement.title}
              </h5>
              <p className="text-xs text-gray-600 mt-1">
                {achievement.description}
              </p>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-0 mt-6 text-center">
        <Button
          variant="outline"
          className="text-purple-800 border-purple-300 hover:bg-purple-50 w-full"
        >
          View All Achievements
        </Button>
      </CardFooter>
    </Card>
  );
}
