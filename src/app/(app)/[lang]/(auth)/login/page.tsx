import { LoginForm } from "@/components/form/Login";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("payload-token-customer");
  if (token) {
    return redirect("/");
  }
  return <LoginForm />;
}
