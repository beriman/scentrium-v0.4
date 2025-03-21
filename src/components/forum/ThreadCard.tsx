import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { MessageSquare, ThumbsUp } from "lucide-react";

interface ThreadCardProps {
  title: string;
  author: {
    name: string;
    avatar: string;
    level: number;
  };
  timestamp: string;
  preview: string;
  replies: number;
  upvotes: number;
  isNew?: boolean;
  isFeatured?: boolean;
}

export default function ThreadCard({
  title,
  author,
  timestamp,
  preview,
  replies,
  upvotes,
  isNew = false,
  isFeatured = false,
}: ThreadCardProps) {
  return (
    <Card className="overflow-hidden border-purple-100 hover:border-purple-300 transition-all duration-200 hover:shadow-md">
      <CardHeader className="p-4 pb-2 flex flex-row justify-between items-start">
        <div>
          <div className="flex justify-between items-start w-full">
            <h3 className="font-medium text-purple-900">{title}</h3>
            {isNew && (
              <Badge className="bg-purple-100 text-purple-800 border-purple-200 ml-2">
                New
              </Badge>
            )}
            {isFeatured && (
              <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200 ml-2">
                Featured
              </Badge>
            )}
          </div>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <Avatar className="h-6 w-6 mr-2">
              <AvatarImage src={author.avatar} />
              <AvatarFallback className="bg-purple-200 text-purple-800 text-xs">
                {author.name[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span>{author.name}</span>
            <Badge variant="outline" className="ml-2 text-xs">
              Lvl {author.level}
            </Badge>
            <span className="mx-2">•</span>
            <span>{timestamp}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <p className="text-gray-600 text-sm line-clamp-2">{preview}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between text-sm text-gray-500">
        <div className="flex items-center">
          <MessageSquare className="h-4 w-4 mr-1" />
          <span>{replies} replies</span>
        </div>
        <div className="flex items-center">
          <ThumbsUp className="h-4 w-4 mr-1" />
          <span>{upvotes} upvotes</span>
        </div>
      </CardFooter>
    </Card>
  );
}
