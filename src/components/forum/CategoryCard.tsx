import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import ThreadCard from "./ThreadCard";

interface CategoryCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  threads: Array<React.ComponentProps<typeof ThreadCard>>;
  viewAllLink: string;
  bgColor?: string;
  borderColor?: string;
  buttonColor?: string;
  buttonTextColor?: string;
  buttonHoverBgColor?: string;
}

export default function CategoryCard({
  title,
  description,
  icon,
  threads,
  viewAllLink,
  bgColor = "bg-purple-50",
  borderColor = "border-purple-100",
  buttonColor = "text-purple-800",
  buttonTextColor = "border-purple-300",
  buttonHoverBgColor = "hover:bg-purple-50",
}: CategoryCardProps) {
  return (
    <Card
      className={`${bgColor} p-8 rounded-2xl shadow-sm border ${borderColor} text-left`}
    >
      <CardHeader className="p-0 mb-6">
        <div className="flex items-center">
          <div className="h-12 w-12 bg-purple-200 rounded-full flex items-center justify-center mr-4">
            {icon}
          </div>
          <div>
            <h4 className="text-xl font-semibold text-purple-900">{title}</h4>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0 space-y-4">
        {threads.map((thread, index) => (
          <ThreadCard key={index} {...thread} />
        ))}
      </CardContent>

      <CardFooter className="p-0 mt-6 text-center">
        <Button
          variant="outline"
          className={`${buttonColor} ${buttonTextColor} ${buttonHoverBgColor} w-full`}
        >
          View All {title}
        </Button>
      </CardFooter>
    </Card>
  );
}
