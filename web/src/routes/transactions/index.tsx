import { createFileRoute } from "@tanstack/react-router";
import TransactionsPage from "src/pages/TransactionPage";

export const Route = createFileRoute("/transactions/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <TransactionsPage />;
}
