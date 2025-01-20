import Card from "src/assets/icons/Card";
import "./index.css";
import User1 from "src/assets/icons/User1";
import User2 from "src/assets/icons/User2";
import User3 from "src/assets/icons/User3";
import User4 from "src/assets/icons/User4";
import ChevronRight from "src/assets/icons/ChevronRight";
import TextInput from "@components/TextInput";
import Button from "@components/Button";

const CardBar: React.FC = () => {
    return (
        <div className="card-bar">
            <div className="top flex-column">
                <h2 className="my-card">
                    My<span>Card</span>
                </h2>
                <div className="card">
                    <div className="user-name">Steven Lous</div>
                    <div className="card-details">
                        <div>
                            <h2>BCA Platinum</h2>
                            <p>4787 4787 4787 4787</p>
                        </div>
                        <Card height="20" width="20" />
                    </div>
                </div>
                <div className="card-specifics flex-column">
                    <div className="detail">
                        <h2>Card holder</h2>
                        <p>Steven Lous</p>
                    </div>
                    <div className="detail">
                        <h2>Card Number</h2>
                        <p>4787 8749 8403 4787</p>
                    </div>
                    <div className="detail-horizontal">
                        <div className="detail ">
                            <h2>Status</h2>
                            <p>Active</p>
                        </div>
                        <div className="wall" />
                        <div className="detail center">
                            <h2>Expired Date</h2>
                            <p>09/26</p>
                        </div>
                        <div className="wall" />
                        <div className="detail center">
                            <h2>Category</h2>
                            <p>Gold</p>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="bottom flex-column">
                <div className="users">
                    <User1 />
                    <User2 />
                    <User3 />
                    <User4 />
                    <ChevronRight />
                </div>
                <form className="send-form flex-column">
                    <TextInput placeholder="Enter amount" />
                    <TextInput placeholder="Note" />
                    <Button type="submit" className="send-button hover">
                        Send Money
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default CardBar;
