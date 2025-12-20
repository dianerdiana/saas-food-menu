import { Suspense } from "react";
import { Outlet } from "react-router";

export function BlankLayout() {
  return (
    <Suspense fallback={null}>
      <Outlet />
    </Suspense>
  );
}
