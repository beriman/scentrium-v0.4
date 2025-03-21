import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ArrowLeft, Save } from "lucide-react";

interface ThreadFormData {
  title: string;
  content: string;
  category: string;
}

const STORAGE_KEY = "thread_draft";
const AUTO_SAVE_INTERVAL = 10000; // 10 seconds

const categories = [
  { id: "diskusi-perfumer", name: "Diskusi Perfumer" },
  { id: "review-parfum", name: "Review Parfum" },
  { id: "tips-tutorial", name: "Tips & Tutorial" },
  { id: "marketplace", name: "Marketplace" },
  { id: "tanya-jawab", name: "Tanya Jawab" },
];

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ],
};

const quillFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "link",
  "image",
];

export default function CreateThreadForm() {
  const [formData, setFormData] = useState<ThreadFormData>({
    title: "",
    content: "",
    category: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const { toast } = useToast();
  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Load draft from localStorage on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem(STORAGE_KEY);
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        setFormData(parsedDraft);
        setLastSaved(new Date());
        toast({
          title: "Draft loaded",
          description: "Your previous draft has been loaded",
        });
      } catch (error) {
        console.error("Error parsing saved draft:", error);
      }
    }

    // Set up auto-save interval
    autoSaveTimerRef.current = setInterval(() => {
      saveDraft(false);
    }, AUTO_SAVE_INTERVAL);

    // Clean up interval on unmount
    return () => {
      if (autoSaveTimerRef.current) {
        clearInterval(autoSaveTimerRef.current);
      }
    };
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Limit title to 100 characters
    const title = e.target.value.slice(0, 100);
    setFormData({ ...formData, title });
  };

  const handleContentChange = (content: string) => {
    setFormData({ ...formData, content });
  };

  const handleCategoryChange = (value: string) => {
    setFormData({ ...formData, category: value });
  };

  const saveDraft = (showToast = true) => {
    if (formData.title || formData.content || formData.category) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
      setLastSaved(new Date());

      if (showToast) {
        toast({
          title: "Draft saved",
          description: "Your thread draft has been saved",
        });
      }
    }
  };

  const handleManualSave = () => {
    setIsSaving(true);
    saveDraft(true);
    setTimeout(() => setIsSaving(false), 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!formData.title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a title for your thread",
        variant: "destructive",
      });
      return;
    }

    if (!formData.content.trim()) {
      toast({
        title: "Content required",
        description: "Please enter content for your thread",
        variant: "destructive",
      });
      return;
    }

    if (!formData.category) {
      toast({
        title: "Category required",
        description: "Please select a category for your thread",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically submit the form to your backend
    console.log("Submitting thread:", formData);

    // Clear draft from localStorage after successful submission
    localStorage.removeItem(STORAGE_KEY);

    toast({
      title: "Thread created",
      description: "Your thread has been created successfully",
    });

    // Reset form
    setFormData({
      title: "",
      content: "",
      category: "",
    });
    setLastSaved(null);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white shadow-sm border border-gray-100 rounded-xl">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" className="p-2">
            <ArrowLeft className="h-5 w-5 text-gray-500" />
          </Button>
          <CardTitle className="text-2xl font-semibold text-center text-purple-900">
            Buat Thread Baru
          </CardTitle>
          <div className="w-8"></div> {/* Spacer for alignment */}
        </div>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label
                htmlFor="title"
                className="text-base font-medium text-gray-700"
              >
                Judul Thread
              </Label>
              <span className="text-sm text-gray-500">
                {formData.title.length}/100
              </span>
            </div>
            <Input
              id="title"
              placeholder="Masukkan judul thread (maks. 100 karakter)"
              value={formData.title}
              onChange={handleTitleChange}
              className="h-12 text-base"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="category"
              className="text-base font-medium text-gray-700"
            >
              Kategori
            </Label>
            <Select
              value={formData.category}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger className="h-12 text-base">
                <SelectValue placeholder="Pilih kategori" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="content"
              className="text-base font-medium text-gray-700"
            >
              Konten
            </Label>
            <div className="min-h-[300px] border rounded-md">
              <ReactQuill
                theme="snow"
                value={formData.content}
                onChange={handleContentChange}
                modules={quillModules}
                formats={quillFormats}
                className="h-[250px]"
              />
            </div>
          </div>

          {lastSaved && (
            <div className="text-sm text-gray-500 text-right">
              Terakhir disimpan: {lastSaved.toLocaleTimeString()}
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between border-t border-gray-100 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={handleManualSave}
            disabled={isSaving}
            className="text-purple-800 border-purple-300 hover:bg-purple-50"
          >
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? "Menyimpan..." : "Simpan Draft"}
          </Button>
          <Button
            type="submit"
            className="bg-purple-800 hover:bg-purple-700 text-white rounded-full px-6"
          >
            Publikasikan Thread
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
