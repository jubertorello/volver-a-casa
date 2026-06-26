import AdminLayoutWrapper from "../../components/admin/AdminLayoutWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel - Volver a Casa",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AdminLayoutWrapper>{children}</AdminLayoutWrapper>;
}
