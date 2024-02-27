import { getSelfUser } from "@/actions/auth";
import { redirect } from "next/navigation";

export default async function RootPage() {
  const isLoggedIn = await getSelfUser();
  if (!isLoggedIn) {
    redirect("/login");
  } else {
    redirect("/app");
  }
}
