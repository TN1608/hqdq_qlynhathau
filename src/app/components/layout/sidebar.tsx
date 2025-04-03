"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Table2, Receipt, Languages, Bell, User, LogIn, UserPlus } from "lucide-react"
import { cn } from "@/app/lib/utils"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      title: "Tables",
      icon: Table2,
      href: "/tables",
      active: pathname === "/tables",
    },
    {
      title: "Billing",
      icon: Receipt,
      href: "/billing",
      active: pathname === "/billing",
    },
    {
      title: "RTL",
      icon: Languages,
      href: "/rtl",
      active: pathname === "/rtl",
    },
    {
      title: "Notifications",
      icon: Bell,
      href: "/notifications",
      active: pathname === "/notifications",
    },
    {
      title: "Profile",
      icon: User,
      href: "/profile",
      active: pathname === "/profile",
    },
    {
      title: "Sign In",
      icon: LogIn,
      href: "/sign-in",
      active: pathname === "/sign-in",
    },
    {
      title: "Sign Up",
      icon: UserPlus,
      href: "/sign-up",
      active: pathname === "/sign-up",
    },
  ]

  return (
    <aside className={cn("fixed top-0 left-0 z-40 h-screen w-64 bg-[#202940] text-white", className)}>
      <div className="h-full flex flex-col">
        {/* Logo */}
        <div className="flex items-center gap-3 p-6 border-b border-gray-700/50">
          <div className="flex items-center justify-center w-10 h-10 bg-white rounded-lg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6H20V8H4V6Z" fill="#202940" />
              <path d="M4 11H20V13H4V11Z" fill="#202940" />
              <path d="M4 16H20V18H4V16Z" fill="#202940" />
            </svg>
          </div>
          <h1 className="text-lg font-semibold">Material Dashboard 2</h1>
        </div>

        {/* Divider */}
        <div className="px-6 py-4">
          <h2 className="text-xs font-medium uppercase text-gray-400">Examples</h2>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.title}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-colors",
                    item.active ? "bg-[#1A73E8] text-white" : "text-gray-300 hover:bg-gray-700/30",
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Upgrade Button */}
        <div className="p-4">
          <button className="w-full py-3 bg-[#1A73E8] text-white rounded-lg font-medium text-sm uppercase">
            Upgrade to Pro
          </button>
        </div>
      </div>
    </aside>
  )
}

