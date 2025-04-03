"use client"
import Link from "next/link"
import { Home, Search, User, Settings, Bell } from "lucide-react"
import { Input } from "@/app/components/ui/input"
import { Button } from "@/app/components/ui/button"

interface HeaderProps {
  title: string
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between py-4 mb-6">
      <div className="flex items-center mb-4 md:mb-0">
        <div className="flex items-center text-gray-500 text-sm">
          <Link href="/dashboard" className="hover:text-gray-700">
            <Home className="h-4 w-4" />
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{title}</span>
        </div>
        <h1 className="text-gray-700 text-xl font-medium ml-0 md:ml-2 mt-1 md:mt-0 block">{title}</h1>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search here"
            className="pl-9 h-10 w-full md:w-auto bg-gray-50 border-gray-200 rounded-lg"
          />
        </div>

        <Button variant="ghost" size="icon" className="text-gray-500">
          <User className="h-5 w-5" />
        </Button>

        <Button variant="ghost" size="icon" className="text-gray-500">
          <Settings className="h-5 w-5" />
        </Button>

        <Button variant="ghost" size="icon" className="text-gray-500">
          <Bell className="h-5 w-5" />
        </Button>

        <Button className="bg-[#1A73E8] hover:bg-blue-700 text-white font-medium">LOG OUT</Button>
      </div>
    </header>
  )
}

