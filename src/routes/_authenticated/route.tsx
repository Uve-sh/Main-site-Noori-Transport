import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { isAuthenticated } from "../auth";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({ to: "/auth" });
    }
    // Return a stub user object so admin sub-routes don't break
    return { user: { id: "admin", email: "noori_admin" } };
  },
  component: () => <Outlet />,
});
