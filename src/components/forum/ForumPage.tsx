import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import ForumCategoryGrid from "./ForumCategoryGrid";

export default function ForumPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-purple-900">
              Forum Komunitas
            </h1>
            <p className="text-gray-600 mt-2">
              Bergabung dalam diskusi dengan sesama penggemar parfum
            </p>
          </div>
          <Button className="bg-purple-800 hover:bg-purple-700 text-white rounded-full px-4 h-10 shadow-sm transition-colors">
            <PlusCircle className="mr-2 h-4 w-4" />
            Buat Thread Baru
          </Button>
        </div>

        <ForumCategoryGrid />
      </div>
    </div>
  );
}
