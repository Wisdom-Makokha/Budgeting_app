import FinanceCard from "@components/FinanceCard";
import "./index.css";
import TransactionHistory from "@components/TransactionHistory";
import SpendingChart from "@components/SpendingChart";

interface DashboardPageInterface {}

const DashboardPage: React.FC<DashboardPageInterface> = ({}) => {
    return (
        <div className="dashboard-page ">
            <div className="finance-cards">
                <FinanceCard title="Total Money" amount={20000} />
                <FinanceCard
                    title="This Month's income"
                    amount={50000}
                    fillBackground
                />
                <FinanceCard title="Expenses this month" amount={10000} />
            </div>
            <SpendingChart />
            <TransactionHistory />
        </div>
    );
};

export default DashboardPage;
