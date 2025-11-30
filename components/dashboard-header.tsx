"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Bell, Settings, User, Menu } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useIsMobile } from "@/hooks/use-mobile"

const navigationItems = [
  { href: "/", label: "Dashboard" },
  { href: "/surveys", label: "Surveys" },
  { href: "/analytics", label: "Analytics" },
  { href: "/reports", label: "Reports" },
  { href: "/goals", label: "Goals" },
  { href: "/team", label: "Team" },
  { href: "/ai-agent", label: "AI Agent" },
]

export function DashboardHeader() {
  const [open, setOpen] = useState(false)
  const isMobile = useIsMobile()

  const NavLink = ({ href, label }: { href: string; label: string }) => (
    <Link
      href={href}
      className="text-sm font-medium hover:text-primary transition-colors"
      onClick={() => setOpen(false)}
    >
      {label}
    </Link>
  )

  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xl font-bold">
              DEI Platform
            </Link>
            {/* デスクトップナビゲーション */}
            <nav className="hidden md:flex items-center gap-6">
              {navigationItems.map((item) => (
                <NavLink key={item.href} href={item.href} label={item.label} />
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            {/* モバイルハンバーガーメニュー */}
            {isMobile && (
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64">
                  <SheetHeader>
                    <SheetTitle>メニュー</SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col gap-4 mt-6 mx-4">
                    {navigationItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="text-base font-medium hover:text-primary transition-colors py-2"
                        onClick={() => setOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            )}

            {/* アクションボタン */}
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
