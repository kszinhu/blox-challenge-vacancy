import { Outlet } from "react-router-dom";
import { PaginationProvider } from "../contexts/PaginationContext";

export default function PaginateRoutes() {
  return (
    <PaginationProvider>
      <Outlet />
    </PaginationProvider>
  );
}
