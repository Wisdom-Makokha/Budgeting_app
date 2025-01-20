import { useState } from "react";
import "./index.css";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

const yearlyData = [
    { name: "Jan", income: 2000, expenses: 1500, balance: 500 },
    { name: "Feb", income: 2500, expenses: 2000, balance: 1000 },
    { name: "Mar", income: 4000, expenses: 3000, balance: 2000 },
    { name: "Apr", income: 4500, expenses: 3500, balance: 3000 },
    { name: "May", income: 6000, expenses: 5000, balance: 4000 },
    { name: "Jun", income: 7000, expenses: 6000, balance: 5000 },
    { name: "Jul", income: 8000, expenses: 7000, balance: 6000 },
    { name: "Aug", income: 8500, expenses: 7500, balance: 7000 },
    { name: "Sep", income: 9000, expenses: 8000, balance: 8000 },
    { name: "Oct", income: 10000, expenses: 8500, balance: 9500 },
    { name: "Nov", income: 9500, expenses: 9000, balance: 10000 },
    { name: "Dec", income: 10000, expenses: 9500, balance: 10500 },
];

const monthlyData = [
    { name: "Week 1", income: 500, expenses: 300, balance: 200 },
    { name: "Week 2", income: 700, expenses: 400, balance: 500 },
    { name: "Week 3", income: 600, expenses: 350, balance: 750 },
    { name: "Week 4", income: 800, expenses: 450, balance: 1100 },
];

const weeklyData = [
    { name: "Mon", income: 200, expenses: 150, balance: 50 },
    { name: "Tue", income: 300, expenses: 200, balance: 150 },
    { name: "Wed", income: 250, expenses: 180, balance: 220 },
    { name: "Thu", income: 400, expenses: 300, balance: 320 },
    { name: "Fri", income: 500, expenses: 350, balance: 470 },
    { name: "Sat", income: 350, expenses: 250, balance: 570 },
    { name: "Sun", income: 300, expenses: 200, balance: 670 },
];

const dailyData = [
    { name: "8am", income: 50, expenses: 30, balance: 20 },
    { name: "10am", income: 80, expenses: 50, balance: 50 },
    { name: "12pm", income: 100, expenses: 70, balance: 80 },
    { name: "2pm", income: 120, expenses: 90, balance: 110 },
    { name: "4pm", income: 150, expenses: 110, balance: 150 },
    { name: "6pm", income: 200, expenses: 140, balance: 210 },
    { name: "8pm", income: 180, expenses: 130, balance: 260 },
];

const SpendingChart: React.FC = () => {
    const [timeSpan, setTimeSpan] = useState<string>("12 Months");

    const getData = () => {
        switch (timeSpan) {
            case "12 Months":
                return {
                    data: yearlyData,
                    xAxisLabel: "Month",
                    yAxisLabel: "Ksh",
                };
            case "30 days":
                return {
                    data: monthlyData,
                    xAxisLabel: "Weeks",
                    yAxisLabel: "Ksh",
                };
            case "7 days":
                return {
                    data: weeklyData,
                    xAxisLabel: "Days",
                    yAxisLabel: "Ksh",
                };
            case "24 Hours":
                return {
                    data: dailyData,
                    xAxisLabel: "Time",
                    yAxisLabel: "Ksh",
                };
            default:
                return {
                    data: yearlyData,
                    xAxisLabel: "Month",
                    yAxisLabel: "Ksh",
                };
        }
    };

    const { data, xAxisLabel, yAxisLabel } = getData();

    return (
        <div className="spending-report">
            <div className="header">
                <h2>Spending Report</h2>
                <button className="btn btn-primary">View Report</button>
            </div>
            <div className="tabs">
                {["12 Months", "30 days", "7 days", "24 Hours"].map((span) => (
                    <span
                        key={span}
                        className={timeSpan === span ? "active" : ""}
                        onClick={() => setTimeSpan(span)}
                    >
                        {span}
                    </span>
                ))}
            </div>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="name"
                        label={{
                            value: xAxisLabel,
                            position: "insideBottom",
                            offset: -5,
                        }}
                    />
                    <YAxis
                        label={{
                            value: yAxisLabel,
                            angle: -90,
                            position: "insideLeft",
                        }}
                    />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="income"
                        stroke="#007bff"
                        strokeWidth={2}
                    />
                    <Line
                        type="monotone"
                        dataKey="expenses"
                        stroke="#ffb703"
                        strokeWidth={2}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SpendingChart;
