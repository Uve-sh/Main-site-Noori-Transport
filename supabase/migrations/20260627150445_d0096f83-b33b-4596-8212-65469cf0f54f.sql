-- Restrict direct execution of internal SECURITY DEFINER helpers.
-- They remain reachable from RLS policies and triggers.
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user_admin_grant() FROM PUBLIC, anon, authenticated;