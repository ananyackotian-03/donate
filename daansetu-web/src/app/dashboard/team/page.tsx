"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Mail, Trash2, Shield } from "lucide-react"

const teamMembers = [
  {
    id: 1,
    name: "Sarah Admin",
    email: "sarah@organization.com",
    role: "Admin",
    joinDate: "2024-01-15",
  },
  {
    id: 2,
    name: "Mike Manager",
    email: "mike@organization.com",
    role: "Manager",
    joinDate: "2024-02-20",
  },
  {
    id: 3,
    name: "Lisa Coordinator",
    email: "lisa@organization.com",
    role: "Coordinator",
    joinDate: "2024-03-10",
  },
]

export default function TeamPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Team</h1>
        <p className="text-gray-600 mt-2">Manage your organization's team members</p>
      </div>

      <div className="flex gap-4">
        <Button variant="default">Add Member</Button>
        <Button variant="outline">Invite</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>All members in your organization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{member.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                      <Mail className="w-3 h-3" />
                      <span>{member.email}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm">
                    <div className="font-medium text-gray-900 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-blue-600" />
                      {member.role}
                    </div>
                    <div className="text-gray-500">Joined {member.joinDate}</div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
