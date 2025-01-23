import "./index.css";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from "chart.js";

const PlanIndex: React.FC = () => {
    const totalBudget = 6000;
    const totalSpent = 2335.2;
    const percentage = (totalSpent / totalBudget) * 100;

    return (
        <>
            <div className="spending-insight">
                <div className="budget-overview">
                    <p className="monthly-budget-label">Monthly budget</p>
                    <h3 className="budget-amount">
                        ${totalBudget.toLocaleString()}
                    </h3>
                    <div className="circle-container">
                        <div
                            className="circle-progress"
                            style={
                                {
                                    "--percentage": `${percentage}%`,
                                } as React.CSSProperties
                            }
                        >
                            <div className="circle-inner">
                                <span className="spent-amount">
                                    ${totalSpent.toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>
                    <p className="left-to-spend">
                        Left to spend:{" "}
                        <span>
                            ${(totalBudget - totalSpent).toLocaleString()}
                        </span>
                    </p>
                </div>
            </div>
            <BudgetCategoryList />
            <Visualizations />
        </>
    );
};

export default PlanIndex;

const BudgetCategoryList: React.FC = () => {
    const categories = [
        {
            name: "General",
            spent: 600,
            budgeted: 3000,
            transactions: 3,
            color: "#9B51E0",
        },
        {
            name: "Transportation",
            spent: 600,
            budgeted: 1000,
            transactions: 5,
            color: "#2D9CDB",
        },
        {
            name: "Charity",
            spent: 1250,
            budgeted: 1000,
            transactions: 12,
            color: "#EB5757",
        },
        {
            name: "Education",
            spent: 100,
            budgeted: 1000,
            transactions: 12,
            color: "#F2C94C",
        },
    ];

    return (
        <div className="budget-category-list">
            {categories.map((category, index) => (
                <div key={index} className="category-item">
                    <div className="category-info">
                        <div
                            className="category-icon"
                            style={{ backgroundColor: category.color }}
                        ></div>
                        <div>
                            <h4>{category.name}</h4>
                            <p>{category.transactions} transactions</p>
                        </div>
                    </div>
                    <div className="category-values">
                        <span className="spent">
                            ${category.spent.toLocaleString()}
                        </span>
                        <span className="budgeted">
                            / ${category.budgeted.toLocaleString()}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
);

const Visualizations = () => {
    // Data for Bar Chart (Income vs Expenses)
    const barChartData = {
        labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        datasets: [
            {
                label: "Income",
                data: [
                    2000, 2500, 3000, 2800, 3200, 4000, 3800, 4200, 4500, 4800,
                    4600, 5000,
                ],
                backgroundColor: "#007bff",
            },
            {
                label: "Expenses",
                data: [
                    1500, 2000, 2200, 2400, 2600, 3000, 2800, 3100, 3300, 3500,
                    3400, 3700,
                ],
                backgroundColor: "#ffb703",
            },
        ],
    };

    // Data for Pie Chart (Spending by Category)
    const pieChartData = {
        labels: ["General", "Transportation", "Charity", "Education"],
        datasets: [
            {
                data: [600, 400, 800, 200],
                backgroundColor: ["#6f42c1", "#007bff", "#ffb703", "#dc3545"],
                hoverOffset: 4,
            },
        ],
    };

    // Data for Line Chart (Cumulative Savings)
    const lineChartData = {
        labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        datasets: [
            {
                label: "Savings",
                data: [
                    500, 1000, 1800, 2200, 2600, 3000, 3400, 4000, 4200, 4500,
                    4800, 5200,
                ],
                borderColor: "#28a745",
                backgroundColor: "rgba(40, 167, 69, 0.2)",
                fill: true,
            },
        ],
    };

    return (
        <div className="visualizations">
            <h2>Dashboard Visualizations</h2>

            {/* Bar Chart */}
            <div className="chart-container">
                <h3>Income vs Expenses</h3>
                <p>
                    This bar chart compares monthly income and expenses,
                    providing an overview of financial performance.
                </p>
                <Bar
                    data={barChartData}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: { position: "top" },
                            title: {
                                display: true,
                                text: "Income vs Expenses Over the Year",
                            },
                        },
                    }}
                />
            </div>

            {/* Pie Chart */}
            <div className="chart-container">
                <h3>Spending by Category</h3>
                <p>Distribution of expenses across different categories.</p>
                <Pie
                    data={pieChartData}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: { position: "bottom" },
                            title: {
                                display: true,
                                text: "Spending Distribution",
                            },
                        },
                    }}
                />
            </div>

            {/* Line Chart */}
            <div className="chart-container">
                <h3>Cumulative Savings</h3>
                <p>
                    This line chart displays the cumulative savings progression
                    throughout the year.
                </p>
                <Line
                    data={lineChartData}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: { position: "top" },
                            title: {
                                display: true,
                                text: "Cumulative Savings Over the Year",
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
};
