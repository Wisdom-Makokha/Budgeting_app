import FinanceCard from "@components/FinanceCard";
import TextInput from "@components/TextInput";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div>
            Hello "/"!
            <FinanceCard fillBackground amount={20000} title="Total Money" />
            <TextInput type="text" placeholder="hello" />
        </div>
    );
}
