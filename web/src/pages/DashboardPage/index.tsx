import "./index.css";

interface DashboardPageInterface {
    children: React.ReactNode;
}

const DashboardPage: React.FC<DashboardPageInterface> = ({ children }) => {
    return <div className="dashboard-page"></div>;
};

export default DashboardPage;
