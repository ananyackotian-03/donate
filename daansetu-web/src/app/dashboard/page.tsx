"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Users, Gift, Building2 } from "lucide-react"

const stats = [
  {
    title: "Total Donations",
    value: "2,543",
    change: "+12.5%",
    icon: Gift,
  },
  {
    title: "Active Organizations",
    value: "48",
    change: "+3 this month",
    icon: Building2,
  },
  {
    title: "Donors",
    value: "1,204",
    change: "+24 this week",
    icon: Users,
  },
  {
    title: "Amount Raised",
    value: "$52,430",
    change: "+$8,200 this month",
    icon: ArrowUpRight,
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's your platform overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="w-4 h-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Donations</CardTitle>
            <CardDescription>Latest donation activity on your platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0">
                  <div>
                    <p className="font-medium text-gray-900">Donation #{i}</p>
                    <p className="text-sm text-gray-500">2 hours ago</p>
                  </div>
                  <span className="text-green-600 font-semibold">+$500</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="default" className="w-full">
              New Donation
            </Button>
            <Button variant="outline" className="w-full">
              View Reports
            </Button>
            <Button variant="outline" className="w-full">
              Manage Orgs
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
