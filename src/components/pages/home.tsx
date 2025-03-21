import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronRight,
  MessageSquare,
  Settings,
  ShoppingBag,
  Sparkles,
  User,
  Users,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../supabase/auth";

export default function LandingPage() {
  const { user, signOut } = useAuth();

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navigation */}
      <header className="fixed top-0 z-50 w-full bg-[rgba(255,255,255,0.8)] backdrop-blur-md border-b border-[#f5f5f7]/30">
        <div className="max-w-[1200px] mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center">
            <Link to="/" className="font-bold text-2xl text-purple-800">
              Parfum
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/">
              <Button
                variant="ghost"
                className="text-sm font-medium hover:text-purple-700"
              >
                Forum
              </Button>
            </Link>
            <Link to="/">
              <Button
                variant="ghost"
                className="text-sm font-medium hover:text-purple-700"
              >
                Marketplace
              </Button>
            </Link>
            <Link to="/">
              <Button
                variant="ghost"
                className="text-sm font-medium hover:text-purple-700"
              >
                Learn
              </Button>
            </Link>
            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/dashboard">
                  <Button
                    variant="ghost"
                    className="text-sm font-medium hover:text-purple-700"
                  >
                    Dashboard
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex items-center gap-2 hover:cursor-pointer bg-purple-50 px-3 py-1.5 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                          alt={user.email || ""}
                        />
                        <AvatarFallback className="bg-purple-200 text-purple-800">
                          {user.email?.[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <Badge
                        variant="outline"
                        className="bg-purple-100 text-purple-800 border-purple-200 font-medium"
                      >
                        Lvl 1
                      </Badge>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="rounded-xl border-none shadow-lg"
                  >
                    <DropdownMenuLabel className="text-xs text-gray-500">
                      {user.email}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Sparkles className="mr-2 h-4 w-4" />
                      XP: 120/500
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onSelect={() => signOut()}
                    >
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="ghost"
                    className="text-sm font-medium hover:text-purple-700"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="rounded-full bg-purple-800 text-white hover:bg-purple-700 text-sm px-4">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="pt-16">
        {/* Hero section */}
        <section className="py-20 bg-gradient-to-b from-purple-50 to-white text-center">
          <div className="max-w-[1200px] mx-auto px-4">
            <h2 className="text-5xl font-bold tracking-tight mb-2 text-purple-900">
              Indonesian Perfume Community
            </h2>
            <h3 className="text-2xl font-medium text-indigo-700 mb-6">
              Connect, Learn, and Share with Fellow Enthusiasts
            </h3>
            <div className="flex justify-center space-x-6 text-xl text-purple-700 mb-12">
              <Link to="/signup" className="flex items-center hover:underline">
                Join the community <ChevronRight className="h-4 w-4" />
              </Link>
              <Link to="/" className="flex items-center hover:underline">
                Explore forums <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-purple-100 text-center">
                <div className="h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <MessageSquare className="h-8 w-8 text-purple-800" />
                </div>
                <h4 className="text-xl font-semibold mb-2 text-purple-900">
                  Discussion Forums
                </h4>
                <p className="text-gray-600">
                  Join conversations about reviews, mixing techniques, and
                  collaborations.
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-purple-100 text-center">
                <div className="h-16 w-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <ShoppingBag className="h-8 w-8 text-indigo-800" />
                </div>
                <h4 className="text-xl font-semibold mb-2 text-purple-900">
                  Marketplace
                </h4>
                <p className="text-gray-600">
                  Buy, sell, and trade perfume ingredients and finished
                  products.
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-purple-100 text-center">
                <div className="h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Sparkles className="h-8 w-8 text-purple-800" />
                </div>
                <h4 className="text-xl font-semibold mb-2 text-purple-900">
                  Gamified Experience
                </h4>
                <p className="text-gray-600">
                  Earn experience points, level up, and unlock achievement
                  badges.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Forum Preview section */}
        <section className="py-20 bg-white text-center">
          <div className="max-w-[1200px] mx-auto px-4">
            <h2 className="text-4xl font-bold tracking-tight mb-2 text-purple-900">
              Active Discussions
            </h2>
            <h3 className="text-xl font-medium text-indigo-700 mb-8">
              Join the conversation in our vibrant forums
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              {/* Forum Category 1 */}
              <div className="bg-purple-50 p-8 rounded-2xl shadow-sm border border-purple-100 text-left">
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 bg-purple-200 rounded-full flex items-center justify-center mr-4">
                    <MessageSquare className="h-6 w-6 text-purple-800" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-purple-900">
                      Perfume Reviews
                    </h4>
                    <p className="text-gray-600">
                      Share and discover reviews of your favorite scents
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-xl border border-purple-100">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-medium text-purple-900">
                        Review: Jasmine Delight by Aromatics
                      </h5>
                      <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                        New
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alice" />
                        <AvatarFallback className="bg-purple-200 text-purple-800 text-xs">
                          A
                        </AvatarFallback>
                      </Avatar>
                      <span>Alice</span>
                      <Badge variant="outline" className="ml-2 text-xs">
                        Lvl 5
                      </Badge>
                      <span className="mx-2">•</span>
                      <span>2 hours ago</span>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      This jasmine-based perfume has amazing longevity and
                      projects beautifully without being overwhelming...
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-purple-100">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-medium text-purple-900">
                        Thoughts on the new Sandalwood Collection?
                      </h5>
                      <span className="text-sm text-gray-500">12 replies</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Bob" />
                        <AvatarFallback className="bg-purple-200 text-purple-800 text-xs">
                          B
                        </AvatarFallback>
                      </Avatar>
                      <span>Bob</span>
                      <Badge variant="outline" className="ml-2 text-xs">
                        Lvl 3
                      </Badge>
                      <span className="mx-2">•</span>
                      <span>1 day ago</span>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      Has anyone tried the new Sandalwood Collection? I'm
                      particularly interested in the Sandalwood & Vanilla
                      blend...
                    </p>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <Button
                    variant="outline"
                    className="text-purple-800 border-purple-300 hover:bg-purple-50"
                  >
                    View All Reviews
                  </Button>
                </div>
              </div>

              {/* Forum Category 2 */}
              <div className="bg-indigo-50 p-8 rounded-2xl shadow-sm border border-indigo-100 text-left">
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 bg-indigo-200 rounded-full flex items-center justify-center mr-4">
                    <Users className="h-6 w-6 text-indigo-800" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-indigo-900">
                      Mixing Techniques
                    </h4>
                    <p className="text-gray-600">
                      Learn and share perfume creation methods
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-xl border border-indigo-100">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-medium text-indigo-900">
                        Guide: Balancing Top, Middle, and Base Notes
                      </h5>
                      <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200">
                        Featured
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie" />
                        <AvatarFallback className="bg-indigo-200 text-indigo-800 text-xs">
                          C
                        </AvatarFallback>
                      </Avatar>
                      <span>Charlie</span>
                      <Badge variant="outline" className="ml-2 text-xs">
                        Lvl 8
                      </Badge>
                      <span className="mx-2">•</span>
                      <span>3 days ago</span>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      In this comprehensive guide, I'll share my approach to
                      creating a well-balanced perfume by properly proportioning
                      your notes...
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-indigo-100">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-medium text-indigo-900">
                        Question: Dilution ratios for citrus oils?
                      </h5>
                      <span className="text-sm text-gray-500">8 replies</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Dana" />
                        <AvatarFallback className="bg-indigo-200 text-indigo-800 text-xs">
                          D
                        </AvatarFallback>
                      </Avatar>
                      <span>Dana</span>
                      <Badge variant="outline" className="ml-2 text-xs">
                        Lvl 2
                      </Badge>
                      <span className="mx-2">•</span>
                      <span>5 days ago</span>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      I'm working with some fresh citrus oils and struggling to
                      find the right dilution ratio. They seem to fade
                      quickly...
                    </p>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <Button
                    variant="outline"
                    className="text-indigo-800 border-indigo-300 hover:bg-indigo-50"
                  >
                    View All Techniques
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <Link to="/signup">
                <Button className="rounded-full bg-purple-800 text-white hover:bg-purple-700 px-6 py-6 text-lg">
                  Join the Community
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* User Experience section */}
        <section className="py-20 bg-gradient-to-b from-white to-purple-50 text-center">
          <div className="max-w-[1200px] mx-auto px-4">
            <h2 className="text-4xl font-bold tracking-tight mb-2 text-purple-900">
              Gamified Experience
            </h2>
            <h3 className="text-xl font-medium text-indigo-700 mb-8">
              Level up as you participate in the community
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-purple-100 text-left">
                <h4 className="text-2xl font-semibold mb-4 text-purple-900">
                  User Profile
                </h4>

                <div className="flex items-center mb-6">
                  <Avatar className="h-16 w-16 mr-4">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=PerfumeLover" />
                    <AvatarFallback className="bg-purple-200 text-purple-800">
                      PL
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h5 className="font-semibold text-lg text-purple-900">
                      PerfumeLover
                    </h5>
                    <div className="flex items-center">
                      <Badge className="bg-purple-100 text-purple-800 border-purple-200 mr-2">
                        Level 4
                      </Badge>
                      <Badge
                        variant="outline"
                        className="text-indigo-800 border-indigo-200"
                      >
                        Reviewer
                      </Badge>
                      <Badge
                        variant="outline"
                        className="text-indigo-800 border-indigo-200 ml-2"
                      >
                        Mixer
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">
                      Experience Points
                    </span>
                    <span className="text-sm font-medium text-purple-800">
                      350/500 XP
                    </span>
                  </div>
                  <Progress
                    value={70}
                    className="h-2 bg-purple-100"
                    indicatorClassName="bg-purple-600"
                  />
                </div>

                <div className="space-y-4">
                  <h5 className="font-medium text-purple-900">
                    Recent Activity
                  </h5>
                  <div className="bg-purple-50 p-3 rounded-lg text-sm">
                    <div className="flex justify-between">
                      <span className="text-purple-800">Posted a review</span>
                      <span className="text-gray-500">+15 XP</span>
                    </div>
                    <p className="text-gray-600 mt-1">
                      "My thoughts on the new Jasmine collection..."
                    </p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg text-sm">
                    <div className="flex justify-between">
                      <span className="text-purple-800">
                        Replied to a thread
                      </span>
                      <span className="text-gray-500">+5 XP</span>
                    </div>
                    <p className="text-gray-600 mt-1">
                      "I agree, the sandalwood base really makes a
                      difference..."
                    </p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg text-sm">
                    <div className="flex justify-between">
                      <span className="text-purple-800">
                        Received 3 upvotes
                      </span>
                      <span className="text-gray-500">+6 XP</span>
                    </div>
                    <p className="text-gray-600 mt-1">
                      On your review of "Midnight Oud"
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-purple-100 text-left">
                <h4 className="text-2xl font-semibold mb-4 text-purple-900">
                  Achievement Badges
                </h4>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 text-center">
                    <div className="h-16 w-16 bg-purple-200 rounded-full flex items-center justify-center mb-3 mx-auto">
                      <MessageSquare className="h-8 w-8 text-purple-800" />
                    </div>
                    <h5 className="font-medium text-purple-900">
                      Conversation Starter
                    </h5>
                    <p className="text-xs text-gray-600 mt-1">
                      Started 5 discussions
                    </p>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 text-center">
                    <div className="h-16 w-16 bg-indigo-200 rounded-full flex items-center justify-center mb-3 mx-auto">
                      <Sparkles className="h-8 w-8 text-indigo-800" />
                    </div>
                    <h5 className="font-medium text-indigo-900">
                      Helpful Reviewer
                    </h5>
                    <p className="text-xs text-gray-600 mt-1">
                      10+ upvoted reviews
                    </p>
                  </div>

                  <div className="bg-gray-100 p-4 rounded-xl border border-gray-200 text-center opacity-60">
                    <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center mb-3 mx-auto">
                      <Users className="h-8 w-8 text-gray-500" />
                    </div>
                    <h5 className="font-medium text-gray-700">
                      Community Pillar
                    </h5>
                    <p className="text-xs text-gray-600 mt-1">
                      Locked - Reach Level 10
                    </p>
                  </div>

                  <div className="bg-gray-100 p-4 rounded-xl border border-gray-200 text-center opacity-60">
                    <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center mb-3 mx-auto">
                      <ShoppingBag className="h-8 w-8 text-gray-500" />
                    </div>
                    <h5 className="font-medium text-gray-700">Master Seller</h5>
                    <p className="text-xs text-gray-600 mt-1">
                      Locked - Complete 20 sales
                    </p>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <Button
                    variant="outline"
                    className="text-purple-800 border-purple-300 hover:bg-purple-50 w-full"
                  >
                    View All Achievements
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-purple-900 py-12 text-purple-100">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="border-b border-purple-700 pb-8 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold text-lg text-white mb-4">Parfum</h4>
              <p className="text-sm mb-4">
                The premier community for Indonesian perfume enthusiasts.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-purple-200 hover:text-white">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-purple-200 hover:text-white">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-purple-200 hover:text-white">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-white mb-4">Community</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/" className="hover:text-white">
                    Forums
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-white">
                    Marketplace
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-white">
                    Events
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-white">
                    Collaborations
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/" className="hover:text-white">
                    Beginner's Guide
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-white">
                    Ingredient Database
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-white">
                    Mixing Tutorials
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-white">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-white">
                    Community Guidelines
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="py-4 text-sm">
            <p>© 2025 Parfum Community. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
