"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DashboardHeader } from "@/components/dashboard-header"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { PlusCircle, Mail, Phone, MapPin, Crown, Shield, User, Search } from "lucide-react"

const team = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "VP Engineering",
    department: "Engineering",
    email: "sarah.chen@company.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    deiRole: "Goal Owner",
    avatar: "/woman-asian-professional.jpg",
    joinDate: "2020-03-15",
    goals: 2,
  },
  {
    id: "2",
    name: "Michael Rodriguez",
    role: "DEI Lead",
    department: "Human Resources",
    email: "michael.r@company.com",
    phone: "+1 (555) 234-5678",
    location: "Austin, TX",
    deiRole: "Admin",
    avatar: "/man-hispanic-professional.jpg",
    joinDate: "2019-08-20",
    goals: 3,
  },
  {
    id: "3",
    name: "Lisa Park",
    role: "Head of Compensation",
    department: "Human Resources",
    email: "lisa.park@company.com",
    phone: "+1 (555) 345-6789",
    location: "New York, NY",
    deiRole: "Goal Owner",
    avatar: "/woman-asian-business.jpg",
    joinDate: "2021-01-10",
    goals: 1,
  },
  {
    id: "4",
    name: "Jordan Kim",
    role: "Culture Director",
    department: "Human Resources",
    email: "jordan.kim@company.com",
    phone: "+1 (555) 456-7890",
    location: "Seattle, WA",
    deiRole: "Goal Owner",
    avatar: "/person-professional-diverse.jpg",
    joinDate: "2020-11-05",
    goals: 2,
  },
  {
    id: "5",
    name: "Alex Thompson",
    role: "Talent Development Manager",
    department: "Human Resources",
    email: "alex.t@company.com",
    phone: "+1 (555) 567-8901",
    location: "Boston, MA",
    deiRole: "Goal Owner",
    avatar: "/person-manager-professional.jpg",
    joinDate: "2021-06-12",
    goals: 1,
  },
  {
    id: "6",
    name: "Priya Sharma",
    role: "Engineering Manager",
    department: "Engineering",
    email: "priya.sharma@company.com",
    phone: "+1 (555) 678-9012",
    location: "San Francisco, CA",
    deiRole: "Member",
    avatar: "/woman-indian-tech.jpg",
    joinDate: "2022-02-01",
    goals: 0,
  },
  {
    id: "7",
    name: "James Williams",
    role: "Sales Director",
    department: "Sales",
    email: "james.w@company.com",
    phone: "+1 (555) 789-0123",
    location: "Chicago, IL",
    deiRole: "Member",
    avatar: "/man-black-sales.jpg",
    joinDate: "2020-09-15",
    goals: 0,
  },
  {
    id: "8",
    name: "Maria Garcia",
    role: "Marketing Manager",
    department: "Marketing",
    email: "maria.g@company.com",
    phone: "+1 (555) 890-1234",
    location: "Miami, FL",
    deiRole: "Member",
    avatar: "/woman-hispanic-marketing.jpg",
    joinDate: "2021-03-20",
    goals: 0,
  },
]

const getRoleBadgeColor = (role: string) => {
  switch (role) {
    case "Admin":
      return "bg-primary/20 text-primary"
    case "Goal Owner":
      return "bg-accent/20 text-accent"
    default:
      return "bg-muted text-muted-foreground"
  }
}

const getRoleIcon = (role: string) => {
  switch (role) {
    case "Admin":
      return <Crown className="h-3 w-3" />
    case "Goal Owner":
      return <Shield className="h-3 w-3" />
    default:
      return <User className="h-3 w-3" />
  }
}

export default function TeamPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [roleFilter, setRoleFilter] = useState("all")
  const [open, setOpen] = useState(false)

  const filteredTeam = team.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDepartment = departmentFilter === "all" || member.department === departmentFilter
    const matchesRole = roleFilter === "all" || member.deiRole === roleFilter
    return matchesSearch && matchesDepartment && matchesRole
  })

  const departments = [...new Set(team.map((m) => m.department))]
  const stats = {
    total: team.length,
    admins: team.filter((m) => m.deiRole === "Admin").length,
    goalOwners: team.filter((m) => m.deiRole === "Goal Owner").length,
    members: team.filter((m) => m.deiRole === "Member").length,
  }

  return (
    <>
      <DashboardHeader />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-balance mb-2">チーム管理</h1>
              <p className="text-muted-foreground text-lg">チームメンバーとそのDEIプラットフォームの役割を管理</p>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button size="lg">
                  <PlusCircle />
                  メンバーを追加
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>チームメンバーを追加</DialogTitle>
                  <DialogDescription>DEIプラットフォームに新しいメンバーを追加</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="member-name">氏名</Label>
                      <Input id="member-name" placeholder="例: 山田 太郎" />
                    </div>
                    <div>
                      <Label htmlFor="member-email">メール</Label>
                      <Input id="member-email" type="email" placeholder="yamada@company.com" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="member-role">役職</Label>
                      <Input id="member-role" placeholder="例: エンジニアリングマネージャー" />
                    </div>
                    <div>
                      <Label htmlFor="member-department">部署</Label>
                      <Select>
                        <SelectTrigger id="member-department">
                          <SelectValue placeholder="部署を選択" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="engineering">エンジニアリング</SelectItem>
                          <SelectItem value="hr">人事</SelectItem>
                          <SelectItem value="sales">営業</SelectItem>
                          <SelectItem value="marketing">マーケティング</SelectItem>
                          <SelectItem value="finance">財務</SelectItem>
                          <SelectItem value="operations">オペレーション</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="member-phone">電話</Label>
                      <Input id="member-phone" type="tel" placeholder="090-1234-5678" />
                    </div>
                    <div>
                      <Label htmlFor="member-location">所在地</Label>
                      <Input id="member-location" placeholder="都道府県、市区町村" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="member-dei-role">DEIプラットフォームの役割</Label>
                    <Select>
                      <SelectTrigger id="member-dei-role">
                        <SelectValue placeholder="役割を選択" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">管理者 - プラットフォームへのフルアクセス</SelectItem>
                        <SelectItem value="goal-owner">目標オーナー - 特定の目標を管理</SelectItem>
                        <SelectItem value="member">メンバー - 閲覧のみ</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    キャンセル
                  </Button>
                  <Button onClick={() => setOpen(false)}>メンバーを追加</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
            <Card className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <User className="h-5 w-5 text-primary" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">総メンバー数</h3>
              <p className="text-3xl font-bold tracking-tight">{stats.total}</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Crown className="h-5 w-5 text-primary" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">管理者</h3>
              <p className="text-3xl font-bold tracking-tight">{stats.admins}</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Shield className="h-5 w-5 text-accent" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">目標オーナー</h3>
              <p className="text-3xl font-bold tracking-tight">{stats.goalOwners}</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-muted rounded-lg">
                  <User className="h-5 w-5 text-foreground" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">メンバー</h3>
              <p className="text-3xl font-bold tracking-tight">{stats.members}</p>
            </Card>
          </div>

          <Card className="p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="名前、役職、またはメールで検索..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="すべての部署" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">すべての部署</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="すべての役割" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">すべての役割</SelectItem>
                  <SelectItem value="Admin">管理者</SelectItem>
                  <SelectItem value="Goal Owner">目標オーナー</SelectItem>
                  <SelectItem value="Member">メンバー</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTeam.map((member) => (
              <Card key={member.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                    <AvatarFallback>
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate mb-1">{member.name}</h3>
                    <p className="text-sm text-muted-foreground truncate">{member.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <Badge className={getRoleBadgeColor(member.deiRole)}>
                    {getRoleIcon(member.deiRole)}
                    {member.deiRole}
                  </Badge>
                  <Badge variant="outline">{member.department}</Badge>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4 shrink-0" />
                    <span className="truncate">{member.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4 shrink-0" />
                    <span>{member.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 shrink-0" />
                    <span>{member.location}</span>
                  </div>
                </div>

                {member.goals > 0 && (
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">{member.goals}</span>件の目標を管理中
                    </p>
                  </div>
                )}

                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    編集
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    プロフィールを表示
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {filteredTeam.length === 0 && (
            <Card className="p-12">
              <div className="text-center">
                <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">メンバーが見つかりませんでした</h3>
                <p className="text-sm text-muted-foreground mb-4">検索またはフィルターを調整してください</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setDepartmentFilter("all")
                    setRoleFilter("all")
                  }}
                >
                  フィルターをクリア
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </>
  )
}
