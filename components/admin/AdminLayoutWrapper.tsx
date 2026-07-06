"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import "../../styles/admin.css";

const navItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: "📊" },
  { name: "Páginas", href: "/admin/pages", icon: "📄" },
  { name: "Noticias", href: "/admin/news", icon: "📰" },
  { name: "Vídeos", href: "/admin/videos", icon: "🎬" },
  { name: "Media", href: "/admin/media", icon: "🖼️" },
  { name: "Ajustes", href: "/admin/settings", icon: "⚙️" },
  { name: "Footer", href: "/admin/footer", icon: "🧩" },
  { name: "Avisos Legales", href: "/admin/legal", icon: "⚖️" }
];

export default function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin";

  if (isLoginPage) {
    return <>{children}</>;
  }

  // Get current page name for breadcrumb
  const currentNav = navItems.find((item) => pathname.startsWith(item.href)) || { name: "Panel" };

  return (
    <div className="admin-wrapper">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-logo">
          Volver a Casa<br />
          <span style={{ fontSize: "0.8rem", color: "var(--ink-faint)", fontWeight: "normal" }}>CMS Panel</span>
        </div>
        <nav className="admin-sidebar-nav">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`admin-nav-item ${pathname.startsWith(item.href) ? "active" : ""}`}
            >
              <span>{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="admin-content-area">
        <header className="admin-header">
          <div className="admin-breadcrumbs">
            Admin / <span className="current">{currentNav.name}</span>
          </div>
          <div className="admin-user-menu">
            <span>Editor Admin</span>
            <div className="admin-avatar">EA</div>
          </div>
        </header>

        <main className="admin-main">
          {children}
          <Toaster position="bottom-right" toastOptions={{ style: { background: 'var(--ink)', color: '#fff', fontSize: '14px', borderRadius: '8px' } }} />
        </main>
      </div>
    </div>
  );
}
