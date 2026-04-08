"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Gift,
  Building2,
  Users,
  Bell,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  {
    href: "/dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
  },
  {
    href: "/dashboard/donations",
    icon: Gift,
    label: "Donations",
  },
  {
    href: "/dashboard/organization",
    icon: Building2,
    label: "Organization",
  },
  {
    href: "/dashboard/team",
    icon: Users,
    label: "Team",
  },
  {
    href: "/dashboard/notifications",
    icon: Bell,
    label: "Notifications",
  },
]

export const Sidebar = () => {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen flex flex-col overflow-y-auto border-r border-gray-800">
      {/* Logo */}
      <div className="px-6 py-8 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center font-bold">
            D
          </div>
          <div>
            <h1 className="text-xl font-bold">DaanSetu</h1>
            <p className="text-xs text-gray-400">Donation Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isActive
                  ? "bg-green-600 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800 space-y-3">
        <div className="text-xs text-gray-400">
          <p className="font-semibold">Logged in as:</p>
          <p>org_admin@example.com</p>
        </div>
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 rounded-lg transition-colors">
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  )
}
