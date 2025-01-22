import { createFileRoute } from "@tanstack/react-router";
import PlanPage from "src/pages/PlanPage";

export const Route = createFileRoute("/plan/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <PlanPage />;
}
