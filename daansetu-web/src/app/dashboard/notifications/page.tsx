"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, CheckCircle, AlertCircle, Info } from "lucide-react"

const notifications = [
  {
    id: 1,
    title: "Organization Verified",
    message: "Your Red Cross India organization has been verified",
    type: "success",
    date: "2024-04-08",
    read: false,
  },
  {
    id: 2,
    title: "New Member Added",
    message: "Sarah joined your organization team",
    type: "info",
    date: "2024-04-07",
    read: false,
  },
  {
    id: 3,
    title: "Donation Received",
    message: "You received a donation of ₹10,000",
    type: "success",
    date: "2024-04-06",
    read: true,
  },
  {
    id: 4,
    title: "Action Required",
    message: "Please complete your organization profile",
    type: "warning",
    date: "2024-04-05",
    read: true,
  },
]

export default function NotificationsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
        <p className="text-gray-600 mt-2">Stay updated with platform activities</p>
      </div>

      <div className="flex gap-4">
        <Button variant="outline">Mark all as read</Button>
        <Button variant="outline">Clear all</Button>
      </div>

      <div className="space-y-3">
        {notifications.map((notification) => {
          let icon
          let bgColor
          let borderColor

          if (notification.type === "success") {
            icon = <CheckCircle className="w-5 h-5 text-green-600" />
            bgColor = "bg-green-50"
            borderColor = "border-green-200"
          } else if (notification.type === "warning") {
            icon = <AlertCircle className="w-5 h-5 text-yellow-600" />
            bgColor = "bg-yellow-50"
            borderColor = "border-yellow-200"
          } else {
            icon = <Info className="w-5 h-5 text-blue-600" />
            bgColor = "bg-blue-50"
            borderColor = "border-blue-200"
          }

          return (
            <Card
              key={notification.id}
              className={`${bgColor} border-l-4 cursor-pointer hover:shadow-md transition-all ${borderColor}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">{icon}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-2">{notification.date}</p>
                    </div>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
