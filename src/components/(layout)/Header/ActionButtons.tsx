import { Cart } from "@/components/Cart";
import { OpenCartButton } from "@/components/Cart/OpenCart";
import { Suspense } from "react";
import { UserDropdown } from "./UserDropdown";

export function ActionButtons() {
  return (
    <div className="hidden md:flex justify-end items-center space-x-4 w-1/3 lg:w-1/4">
      <UserDropdown />
      <Suspense fallback={<OpenCartButton />}>
        <Cart />
      </Suspense>
    </div>
  );
}
