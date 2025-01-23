import { createFileRoute } from "@tanstack/react-router";
import PlanIndex from "src/pages/PlanIndex";
import PlanPage from "src/pages/PlanPage";

export const Route = createFileRoute("/plan/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <PlanPage />;
}
