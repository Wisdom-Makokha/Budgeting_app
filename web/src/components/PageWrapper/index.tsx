import SideBar from "@components/SideBar";
import "./index.css";
import CardBar from "@components/CardBar/Index";

interface PageWrapperInterface {
    children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperInterface> = ({ children }) => {
    return (
        <div className="dashboard-page">
            <SideBar />
            <div className="children">{children}</div>
            <CardBar />
        </div>
    );
};

export default PageWrapper;
