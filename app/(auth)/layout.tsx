import "@/app/globals.css";
import { Toaster } from "sonner";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
