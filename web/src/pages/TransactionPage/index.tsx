import "./index.css";
import TransactionHistory from "@components/TransactionHistory";

const TransactionsPage: React.FC = () => {
    return (
        <div className="transactions-page">
            <TransactionHistory />
        </div>
    );
};

export default TransactionsPage;
