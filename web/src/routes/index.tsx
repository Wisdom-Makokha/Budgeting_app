import { createFileRoute } from "@tanstack/react-router";
import DashboardPage from "src/pages/DashboardPage";

export const Route = createFileRoute("/")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div>
            <DashboardPage />
        </div>
    );
}
