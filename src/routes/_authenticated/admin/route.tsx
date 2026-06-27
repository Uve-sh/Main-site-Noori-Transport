import { Outlet, createFileRoute, redirect, useRouterState, Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Settings,
  Image as ImageIcon,
  Users,
  Truck,
  Wrench,
  Sparkles,
  Mail,
  Navigation,
  BarChart3,
  Layers,
  LogOut,
  Inbox,
} from "lucide-react";
import { isAuthenticated, clearSession } from "../../auth";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin")({
  ssr: false,
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({ to: "/auth" });
    }
  },
  component: AdminLayout,
});

type NavItem = { title: string; url: string; icon: typeof LayoutDashboard };

const navGroups: { label: string; items: NavItem[] }[] = [
  {
    label: "Overview",
    items: [{ title: "Dashboard", url: "/admin", icon: LayoutDashboard }],
  },
  {
    label: "Content",
    items: [
      { title: "Hero", url: "/admin/hero", icon: Sparkles },
      { title: "About", url: "/admin/about", icon: Layers },
      { title: "Why Choose Us", url: "/admin/features", icon: BarChart3 },
      { title: "Services", url: "/admin/services", icon: Wrench },
      { title: "Fleet", url: "/admin/fleet", icon: Truck },
      { title: "Gallery", url: "/admin/gallery", icon: ImageIcon },
      { title: "Leadership", url: "/admin/leadership", icon: Users },
    ],
  },
  {
    label: "Site",
    items: [
      { title: "Logo", url: "/admin/logo", icon: ImageIcon },
      { title: "Navigation", url: "/admin/navigation", icon: Navigation },
      { title: "Contact info", url: "/admin/contact", icon: Mail },
      { title: "Inbox", url: "/admin/inbox", icon: Inbox },
      { title: "Settings", url: "/admin/settings", icon: Settings },
    ],
  },
];

function AdminLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  function handleSignOut() {
    clearSession();
    window.location.href = "/auth";
  }

  return (
    <SidebarProvider>
      <div className="brand-selection flex min-h-screen w-full bg-[color:var(--color-surface)]">
        <Sidebar collapsible="icon">
          <SidebarHeader className="border-b border-black/5 px-4 py-4">
            <Link to="/admin" className="flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-[color:var(--color-navy)] text-sm font-bold text-white">
                N
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-[color:var(--color-navy)]">
                  Noori Admin
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[color:var(--color-ink-soft)]">
                  CMS
                </span>
              </div>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            {navGroups.map((group) => (
              <SidebarGroup key={group.label}>
                <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const active =
                        item.url === "/admin"
                          ? pathname === "/admin"
                          : pathname.startsWith(item.url);
                      return (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild isActive={active}>
                            <Link to={item.url} className="flex items-center gap-2">
                              <Icon className="h-4 w-4" />
                              <span>{item.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>
          <SidebarFooter className="border-t border-black/5 p-3">
            <div className="truncate px-2 text-[11px] text-[color:var(--color-ink-soft)]">
              noori_admin
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              className="mt-2 justify-start gap-2 text-xs text-[color:var(--color-ink-soft)]"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign out
            </Button>
          </SidebarFooter>
        </Sidebar>

        <div className="flex flex-1 flex-col">
          <header className="flex h-14 items-center gap-3 border-b border-black/5 bg-white px-4">
            <SidebarTrigger />
            <div className="text-sm font-semibold text-[color:var(--color-navy)]">
              Noori Transport — Content Management
            </div>
            <div className="ml-auto">
              <Link
                to="/"
                className="text-xs font-semibold text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-navy)]"
              >
                View website ↗
              </Link>
            </div>
          </header>
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
