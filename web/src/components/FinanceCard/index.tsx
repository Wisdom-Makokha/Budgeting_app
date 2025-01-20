import "./index.css";

interface FinanceCardInterface {
    title: string;
    amount: number | string;
    fillBackground?: boolean;
}

const FinanceCard: React.FC<FinanceCardInterface> = ({
    amount,
    title,
    fillBackground,
}) => {
    return (
        <div
            className={`finance-card flex-column ${fillBackground ? "persian" : ""}`}
        >
            <h3>{title}</h3>
            <div className="finance-amount">
                <h2>Ksh {amount}</h2>
                <span className="percent">&uarr;50%</span>
            </div>
        </div>
    );
};

export default FinanceCard;
