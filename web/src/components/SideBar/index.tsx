import Dashboard from "src/assets/icons/Dashboard";
import "./index.css";
import Transaction from "src/assets/icons/Transaction";
import Target from "src/assets/icons/Target";
import Wallet from "src/assets/icons/Wallet";

interface SideBarInterface {}

const SideBar: React.FC = () => {
    return (
        <div className="side-bar">
            <div className="side-list flex-column">
                <div className="logo"></div>
                <div className="side-item">
                    <Dashboard width="20" height="20" /> Dashboard
                </div>
                <div className="side-item">
                    <Transaction width="20" height="20" /> Transaction
                </div>
                <div className="side-item">
                    <Target width="20" height="20" /> Plan
                </div>
                <div className="side-item">
                    <Wallet width="20" height="20" /> Budget
                </div>
            </div>
        </div>
    );
};

export default SideBar;
