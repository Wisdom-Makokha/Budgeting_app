import { createFileRoute } from "@tanstack/react-router";
import PlanIndex from "src/pages/PlanIndex";

export const Route = createFileRoute("/transactions/report/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <PlanIndex />;
}
