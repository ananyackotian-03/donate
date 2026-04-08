import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export default async function Home() {
  // Check if user is authenticated
  const cookieStore = await cookies()
  const token = cookieStore.get("token")

  // Redirect to dashboard if authenticated, else to login
  if (token) {
    redirect("/dashboard")
  } else {
    redirect("/auth/login")
  }
}
