"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Gift, Calendar, User, MapPin } from "lucide-react"

const donations = [
  {
    id: 1,
    donorName: "John Doe",
    amount: 500,
    organization: "Red Cross",
    date: "2024-04-08",
    status: "Completed",
  },
  {
    id: 2,
    donorName: "Jane Smith",
    amount: 250,
    organization: "Helpline",
    date: "2024-04-07",
    status: "Completed",
  },
  {
    id: 3,
    donorName: "Mike Johnson",
    amount: 1000,
    organization: "Food Bank",
    date: "2024-04-06",
    status: "Pending",
  },
]

export default function DonationsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Donations</h1>
        <p className="text-gray-600 mt-2">Manage and track all donations</p>
      </div>

      <div className="flex gap-4">
        <Button variant="default">New Donation</Button>
        <Button variant="outline">Export</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Donations</CardTitle>
          <CardDescription>All donations across the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Donor</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Organization</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((donation) => (
                  <tr key={donation.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-900">{donation.donorName}</td>
                    <td className="py-3 px-4 text-gray-900">₹{donation.amount}</td>
                    <td className="py-3 px-4 text-gray-600">{donation.organization}</td>
                    <td className="py-3 px-4 text-gray-600">{donation.date}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        donation.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {donation.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
