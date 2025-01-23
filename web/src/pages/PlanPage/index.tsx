import { useState } from "react";
import "./index.css";
import Tick from "src/assets/icons/Tick";
import TextInput from "@components/TextInput";

const PlanPage: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(1); // Step tracker
    const [budgetAmount, setBudgetAmount] = useState(6000); // Budget amount
    const [categories, setCategories] = useState([
        { name: "General", amount: 1000 },
        { name: "Transportation", amount: 1000 },
        { name: "Charity", amount: 1000 },
    ]);

    const handleNextStep = () => setCurrentStep((prev) => prev + 1);
    const handlePrevStep = () => setCurrentStep((prev) => prev - 1);

    const handleAddCategory = (newCategory: {
        name: string;
        amount: number;
    }) => {
        setCategories([...categories, newCategory]);
    };

    const totalUsed = categories.reduce((sum, cat) => sum + cat.amount, 0);
    const amountLeft = budgetAmount - totalUsed;

    return (
        <div className="create-budget-flow">
            {currentStep === 1 && (
                <CreateBudgetStep
                    budgetAmount={budgetAmount}
                    setBudgetAmount={setBudgetAmount}
                    categories={categories}
                    amountLeft={amountLeft}
                    onNext={handleNextStep}
                />
            )}
            {currentStep === 2 && (
                <AddCategoryStep
                    onAddCategory={handleAddCategory}
                    onBack={handlePrevStep}
                    onNext={handleNextStep}
                />
            )}
            {currentStep === 3 && (
                <SummaryStep
                    budgetAmount={budgetAmount}
                    categories={categories}
                    onBack={() => setCurrentStep(1)}
                />
            )}
        </div>
    );
};

export default PlanPage;

interface CreateBudgetStepProps {
    budgetAmount: number;
    setBudgetAmount: (amount: number) => void;
    categories: { name: string; amount: number }[];
    amountLeft: number;
    onNext: () => void;
}

const CreateBudgetStep: React.FC<CreateBudgetStepProps> = ({
    budgetAmount,
    setBudgetAmount,
    categories,
    amountLeft,
    onNext,
}) => {
    const handleAmountChange = (amount: number) => {
        setBudgetAmount(amount);
    };

    return (
        <div className="create-budget-step">
            <h2>Create Budget</h2>
            <div className="budget-amount">
                <h3>${budgetAmount.toLocaleString()}</h3>
                <p>Set budget amount</p>
                <TextInput
                    placeholder="enter budget"
                    type="number"
                    onChange={(e) => setBudgetAmount(parseInt(e.target.value))}
                />
                <div className="amount-options">
                    {[100, 200, 500, 1000].map((amount) => (
                        <button
                            key={amount}
                            className={`amount-button ${budgetAmount === amount ? "active" : ""}`}
                            onClick={() => handleAmountChange(amount)}
                        >
                            ${amount}
                        </button>
                    ))}
                </div>
            </div>
            <div className="categories">
                {categories.map((category, index) => (
                    <div key={index} className="category">
                        <span>{category.name}</span>
                        <span>${category.amount.toLocaleString()}</span>
                    </div>
                ))}
            </div>
            <p>Amount left: ${amountLeft.toLocaleString()}</p>
            <button className="next-button" onClick={onNext}>
                Get Started
            </button>
        </div>
    );
};

interface AddCategoryStepProps {
    onAddCategory: (category: { name: string; amount: number }) => void;
    onBack: () => void;
    onNext: () => void;
}

const AddCategoryStep: React.FC<AddCategoryStepProps> = ({
    onAddCategory,
    onBack,
    onNext,
}) => {
    const [categoryName, setCategoryName] = useState("");
    const [categoryAmount, setCategoryAmount] = useState(0);

    const handleSaveCategory = () => {
        onAddCategory({ name: categoryName, amount: categoryAmount });
        setCategoryName("");
        setCategoryAmount(0);
        onNext();
    };

    return (
        <div className="add-category-step">
            <h2>Create New Category</h2>
            <input
                type="text"
                placeholder="Category name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
            />
            <input
                type="number"
                placeholder="Amount"
                value={categoryAmount}
                onChange={(e) =>
                    setCategoryAmount(parseInt(e.target.value) || 0)
                }
            />
            <div className="buttons">
                <button onClick={onBack}>Back</button>
                <button onClick={handleSaveCategory}>Save Category</button>
            </div>
        </div>
    );
};

interface SummaryStepProps {
    budgetAmount: number;
    categories: { name: string; amount: number }[];
    onBack: () => void;
}

const SummaryStep: React.FC<SummaryStepProps> = ({
    budgetAmount,
    categories,
    onBack,
}) => {
    return (
        <div className="summary-step">
            <Tick />
            <h2>Your Budget Has Been Set!</h2>
            <p>
                Track your expenses and stay on top of your financial goals. You
                can always adjust your budget if needed.
            </p>
            <div className="summary-categories">
                {categories.map((category, index) => (
                    <div key={index} className="summary-category">
                        <span>{category.name}</span>
                        <span>${category.amount.toLocaleString()}</span>
                    </div>
                ))}
            </div>
            <p>Total Budgeted: ${budgetAmount.toLocaleString()}</p>
            <button className="dashboard-button" onClick={onBack}>
                View My Dashboard
            </button>
        </div>
    );
};
