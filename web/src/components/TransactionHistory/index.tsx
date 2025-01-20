import "./index.css";

const TransactionHistory: React.FC = () => {
    const transactions = [
        {
            id: "#7890328",
            name: "Spotify",
            logo: "spotify-logo.png",
            amount: "-Rp 13,000",
            date: "16 Jan 2:30pm",
            type: "negative", // Use for styling
        },
        {
            id: "#3948509",
            name: "Starbucks",
            logo: "starbucks-logo.png",
            amount: "-Rp 24,000",
            date: "15 Jan 3:30pm",
            type: "negative",
        },
        {
            id: "#2980298",
            name: "Upwork",
            logo: "upwork-logo.png",
            amount: "+Rp 50,000",
            date: "14 Jan 2:30pm",
            type: "positive",
        },
        {
            id: "#7890328",
            name: "Spotify",
            logo: "spotify-logo.png",
            amount: "-Rp 13,000",
            date: "16 Jan 2:30pm",
            type: "negative", // Use for styling
        },
        {
            id: "#3948509",
            name: "Starbucks",
            logo: "starbucks-logo.png",
            amount: "-Rp 24,000",
            date: "15 Jan 3:30pm",
            type: "negative",
        },
        {
            id: "#2980298",
            name: "Upwork",
            logo: "upwork-logo.png",
            amount: "+Rp 50,000",
            date: "14 Jan 2:30pm",
            type: "positive",
        },
        {
            id: "#7890328",
            name: "Spotify",
            logo: "spotify-logo.png",
            amount: "-Rp 13,000",
            date: "16 Jan 2:30pm",
            type: "negative", // Use for styling
        },
        {
            id: "#3948509",
            name: "Starbucks",
            logo: "starbucks-logo.png",
            amount: "-Rp 24,000",
            date: "15 Jan 3:30pm",
            type: "negative",
        },
        {
            id: "#2980298",
            name: "Upwork",
            logo: "upwork-logo.png",
            amount: "+Rp 50,000",
            date: "14 Jan 2:30pm",
            type: "positive",
        },
        {
            id: "#7890328",
            name: "Spotify",
            logo: "spotify-logo.png",
            amount: "-Rp 13,000",
            date: "16 Jan 2:30pm",
            type: "negative", // Use for styling
        },
        {
            id: "#3948509",
            name: "Starbucks",
            logo: "starbucks-logo.png",
            amount: "-Rp 24,000",
            date: "15 Jan 3:30pm",
            type: "negative",
        },
        {
            id: "#2980298",
            name: "Upwork",
            logo: "upwork-logo.png",
            amount: "+Rp 50,000",
            date: "14 Jan 2:30pm",
            type: "positive",
        },
    ];

    return (
        <div className="transaction-history">
            <div className="header">
                <h2>Transaction History</h2>
                <div className="buttons">
                    <button className="btn btn-primary">
                        <i className="icon-calendar"></i> View Report
                    </button>
                    <button className="btn btn-primary">
                        <i className="icon-filter"></i> View Report
                    </button>
                </div>
            </div>
            <table className="transaction-table">
                <thead>
                    <tr>
                        <th>Transaction</th>
                        <th>ID</th>
                        <th>Amount</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                            <td>
                                <img
                                    src={transaction.logo}
                                    alt={transaction.name}
                                />{" "}
                                {transaction.name}
                            </td>
                            <td>{transaction.id}</td>
                            <td className={transaction.type}>
                                {transaction.amount}
                            </td>
                            <td>{transaction.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionHistory;
