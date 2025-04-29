"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

import { ButtonWithTooltip } from "@/components/ui/button-with-tooltip";

const SignOutButton = () => {
  return (
    <ButtonWithTooltip
      variant="outline"
      size="icon"
      tooltipContent="Sign out"
      onClick={() =>
        signOut({
          redirectTo: "/",
        })
      }
    >
      <LogOut className="h-4 w-4 text-red-500" />
    </ButtonWithTooltip>
  );
};

export default SignOutButton;
