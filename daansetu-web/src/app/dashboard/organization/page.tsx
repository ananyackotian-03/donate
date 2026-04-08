"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, MapPin, Users, CheckCircle } from "lucide-react"

const organizations = [
  {
    id: 1,
    name: "Red Cross India",
    type: "NGO",
    location: "Delhi",
    members: 15,
    status: "Verified",
  },
  {
    id: 2,
    name: "Food for All",
    type: "Non-Profit",
    location: "Mumbai",
    members: 8,
    status: "Verified",
  },
  {
    id: 3,
    name: "Education First",
    type: "Foundation",
    location: "Bangalore",
    members: 12,
    status: "Pending",
  },
]

export default function OrganizationPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Organizations</h1>
        <p className="text-gray-600 mt-2">Manage organizations and verify new ones</p>
      </div>

      <div className="flex gap-4">
        <Button variant="default">Add Organization</Button>
        <Button variant="outline">View All</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Organizations</CardTitle>
          <CardDescription>All registered organizations on the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {organizations.map((org) => (
              <div key={org.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{org.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                      <span>{org.type}</span>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{org.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>{org.members} members</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${
                    org.status === "Verified"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {org.status === "Verified" && <CheckCircle className="w-4 h-4" />}
                    {org.status}
                  </span>
                  <Button variant="outline" size="sm">
                    View
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
