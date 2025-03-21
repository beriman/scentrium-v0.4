import {
  MessageSquare,
  Sparkles,
  ShoppingBag,
  HelpCircle,
  Beaker,
} from "lucide-react";
import CategoryCard from "./CategoryCard";

export default function ForumCategoryGrid() {
  const categories = [
    {
      title: "Diskusi Perfumer",
      description: "Diskusi tentang teknik dan bahan pembuatan parfum",
      icon: <Beaker className="h-6 w-6 text-purple-800" />,
      bgColor: "bg-purple-50",
      borderColor: "border-purple-100",
      buttonColor: "text-purple-800",
      buttonTextColor: "border-purple-300",
      buttonHoverBgColor: "hover:bg-purple-50",
      threads: [
        {
          title: "Cara mencampur essential oil yang benar",
          author: {
            name: "Perfumer123",
            avatar:
              "https://api.dicebear.com/7.x/avataaars/svg?seed=Perfumer123",
            level: 5,
          },
          timestamp: "2 jam yang lalu",
          preview:
            "Saya ingin berbagi teknik mencampur essential oil yang sudah saya praktekkan selama 3 tahun terakhir...",
          replies: 12,
          upvotes: 24,
          isNew: true,
        },
        {
          title: "Rekomendasi supplier bahan parfum lokal",
          author: {
            name: "ScentMaster",
            avatar:
              "https://api.dicebear.com/7.x/avataaars/svg?seed=ScentMaster",
            level: 3,
          },
          timestamp: "1 hari yang lalu",
          preview:
            "Ada yang bisa merekomendasikan supplier bahan parfum lokal yang terpercaya? Saya mencari beberapa bahan dasar seperti...",
          replies: 8,
          upvotes: 15,
        },
      ],
      viewAllLink: "/forum/diskusi-perfumer",
    },
    {
      title: "Review Parfum",
      description: "Ulasan dan pendapat tentang berbagai parfum",
      icon: <Sparkles className="h-6 w-6 text-indigo-800" />,
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-100",
      buttonColor: "text-indigo-800",
      buttonTextColor: "border-indigo-300",
      buttonHoverBgColor: "hover:bg-indigo-50",
      threads: [
        {
          title: "Review: Koleksi Jasmine terbaru dari Aromatics",
          author: {
            name: "JasmineLover",
            avatar:
              "https://api.dicebear.com/7.x/avataaars/svg?seed=JasmineLover",
            level: 4,
          },
          timestamp: "5 jam yang lalu",
          preview:
            "Baru saja mencoba koleksi Jasmine terbaru dari Aromatics. Longevity-nya luar biasa dan proyeksinya sangat baik tanpa terlalu berlebihan...",
          replies: 7,
          upvotes: 19,
          isNew: true,
        },
        {
          title: "Pendapat tentang Koleksi Sandalwood baru?",
          author: {
            name: "WoodScents",
            avatar:
              "https://api.dicebear.com/7.x/avataaars/svg?seed=WoodScents",
            level: 2,
          },
          timestamp: "2 hari yang lalu",
          preview:
            "Ada yang sudah mencoba Koleksi Sandalwood terbaru? Saya tertarik dengan blend Sandalwood & Vanilla...",
          replies: 15,
          upvotes: 10,
        },
      ],
      viewAllLink: "/forum/review-parfum",
    },
    {
      title: "Tips & Tutorial",
      description: "Berbagi tips dan tutorial seputar parfum",
      icon: <MessageSquare className="h-6 w-6 text-teal-800" />,
      bgColor: "bg-teal-50",
      borderColor: "border-teal-100",
      buttonColor: "text-teal-800",
      buttonTextColor: "border-teal-300",
      buttonHoverBgColor: "hover:bg-teal-50",
      threads: [
        {
          title: "Panduan: Menyeimbangkan Top, Middle, dan Base Notes",
          author: {
            name: "PerfumeExpert",
            avatar:
              "https://api.dicebear.com/7.x/avataaars/svg?seed=PerfumeExpert",
            level: 8,
          },
          timestamp: "3 hari yang lalu",
          preview:
            "Dalam panduan komprehensif ini, saya akan berbagi pendekatan saya untuk menciptakan parfum yang seimbang dengan proporsi notes yang tepat...",
          replies: 22,
          upvotes: 45,
          isFeatured: true,
        },
        {
          title: "Cara menyimpan parfum agar tahan lama",
          author: {
            name: "ScentKeeper",
            avatar:
              "https://api.dicebear.com/7.x/avataaars/svg?seed=ScentKeeper",
            level: 5,
          },
          timestamp: "1 minggu yang lalu",
          preview:
            "Berikut adalah beberapa tips untuk menyimpan parfum agar tetap segar dan tahan lama...",
          replies: 18,
          upvotes: 32,
        },
      ],
      viewAllLink: "/forum/tips-tutorial",
    },
    {
      title: "Marketplace",
      description: "Jual beli bahan dan produk parfum",
      icon: <ShoppingBag className="h-6 w-6 text-rose-800" />,
      bgColor: "bg-rose-50",
      borderColor: "border-rose-100",
      buttonColor: "text-rose-800",
      buttonTextColor: "border-rose-300",
      buttonHoverBgColor: "hover:bg-rose-50",
      threads: [
        {
          title: "[JUAL] Essential Oil Collection - Citrus Series",
          author: {
            name: "EssenceTrader",
            avatar:
              "https://api.dicebear.com/7.x/avataaars/svg?seed=EssenceTrader",
            level: 6,
          },
          timestamp: "12 jam yang lalu",
          preview:
            "Menjual koleksi essential oil seri Citrus (Lemon, Orange, Bergamot, Grapefruit). Semua original dan masih tersegel...",
          replies: 5,
          upvotes: 8,
          isNew: true,
        },
        {
          title: "[CARI] Botol Parfum Vintage 50ml",
          author: {
            name: "BottleCollector",
            avatar:
              "https://api.dicebear.com/7.x/avataaars/svg?seed=BottleCollector",
            level: 3,
          },
          timestamp: "3 hari yang lalu",
          preview:
            "Mencari botol parfum vintage ukuran 50ml untuk koleksi. Bisa kontak via DM untuk penawaran...",
          replies: 7,
          upvotes: 3,
        },
      ],
      viewAllLink: "/forum/marketplace",
    },
    {
      title: "Tanya Jawab",
      description: "Ajukan pertanyaan seputar dunia parfum",
      icon: <HelpCircle className="h-6 w-6 text-amber-800" />,
      bgColor: "bg-amber-50",
      borderColor: "border-amber-100",
      buttonColor: "text-amber-800",
      buttonTextColor: "border-amber-300",
      buttonHoverBgColor: "hover:bg-amber-50",
      threads: [
        {
          title: "Bagaimana cara mengetahui keaslian parfum?",
          author: {
            name: "NewbiePerfumer",
            avatar:
              "https://api.dicebear.com/7.x/avataaars/svg?seed=NewbiePerfumer",
            level: 1,
          },
          timestamp: "1 hari yang lalu",
          preview:
            "Sebagai pemula, saya ingin tahu bagaimana cara membedakan parfum asli dan palsu. Apa saja ciri-ciri yang harus diperhatikan?",
          replies: 14,
          upvotes: 21,
        },
        {
          title: "Rasio pengenceran untuk minyak citrus?",
          author: {
            name: "CitrusLover",
            avatar:
              "https://api.dicebear.com/7.x/avataaars/svg?seed=CitrusLover",
            level: 2,
          },
          timestamp: "5 hari yang lalu",
          preview:
            "Saya sedang bekerja dengan beberapa minyak citrus segar dan kesulitan menemukan rasio pengenceran yang tepat. Mereka tampaknya cepat menguap...",
          replies: 9,
          upvotes: 12,
        },
      ],
      viewAllLink: "/forum/tanya-jawab",
    },
  ];

  return (
    <div className="w-full p-4 md:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <CategoryCard
            key={index}
            title={category.title}
            description={category.description}
            icon={category.icon}
            threads={category.threads}
            viewAllLink={category.viewAllLink}
            bgColor={category.bgColor}
            borderColor={category.borderColor}
            buttonColor={category.buttonColor}
            buttonTextColor={category.buttonTextColor}
            buttonHoverBgColor={category.buttonHoverBgColor}
          />
        ))}
      </div>
    </div>
  );
}
