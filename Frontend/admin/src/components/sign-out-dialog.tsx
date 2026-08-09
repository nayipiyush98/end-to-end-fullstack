import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";
import { ConfirmDialog } from "./confirm-dialog";

interface SignOutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SignOutDialog({
  open,
  onOpenChange,
}: SignOutDialogProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuthStore();

  const handleSignOut = () => {
    logout();

    // Preserve current location for redirect after sign-in
    const currentPath =
      location.pathname + location.search;

    navigate(
      `/admin/login?redirect=${encodeURIComponent(currentPath)}`,
      {
        replace: true,
      }
    );
  };

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Sign out"
      desc="Are you sure you want to sign out? You will need to sign in again to access your account."
      confirmText="Sign out"
      destructive
      handleConfirm={handleSignOut}
      className="sm:max-w-sm"
    />
  );
}