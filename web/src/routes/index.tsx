import FinanceCard from "@components/FinanceCard";
import SideBar from "@components/SideBar";
import TextInput from "@components/TextInput";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div>
            <SideBar />
        </div>
    );
}
