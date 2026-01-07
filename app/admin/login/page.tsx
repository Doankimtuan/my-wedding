import { LoginForm } from "@/components/admin/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login | Wedding Dashboard",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-stone-100">
        <div className="text-center mb-8">
          <h1 className="font-playfair text-3xl text-rose-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-stone-500">Sign in to manage your wedding</p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
