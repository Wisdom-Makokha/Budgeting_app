import AxiosApi from "..";

interface IncomeData {
    id?: number;
    amount: number;
    source?: string;
    date_received: string;
    periodic: boolean;
    period_in_days?: number;
    categoryid: number;
}

interface ExpenseData {
    id?: number;
    amount: number;
    source?: string;
    date_spent: string;
    periodic: boolean;
    period_in_days?: number;
    categoryid: number;
}

interface CategoryData {
    id?: number;
    name: string;
    direction_of_flow: boolean;
    description?: string;
}

interface BudgetData {
    id?: number;
    amount: number;
    start_date: string;
    end_date: string;
}

interface BudgetCategoryData {
    id?: number;
    amount: number;
    budgetid: number;
    categoryid: number;
}

class UserApi {
    // Income Routes
    async addIncome(incomeData: IncomeData): Promise<any> {
        try {
            return await AxiosApi.post("/addIncome", incomeData);
        } catch (error) {
            console.error("Error adding income:", error);
            throw error;
        }
    }

    async editIncome(
        id: number,
        incomeData: Omit<IncomeData, "id">,
    ): Promise<any> {
        try {
            return await AxiosApi.put("/editIncome", { id, ...incomeData });
        } catch (error) {
            console.error("Error editing income:", error);
            throw error;
        }
    }

    async deleteIncome(id: number): Promise<any> {
        try {
            return await AxiosApi.delete("/deleteIncome", { data: { id } });
        } catch (error) {
            console.error("Error deleting income:", error);
            throw error;
        }
    }

    async getIncome(id: number): Promise<any> {
        try {
            return await AxiosApi.get(`/getIncome`, { params: { id } });
        } catch (error) {
            console.error("Error fetching income:", error);
            throw error;
        }
    }

    async getAllIncome(): Promise<any> {
        try {
            return await AxiosApi.get("/getAllIncome");
        } catch (error) {
            console.error("Error fetching all incomes:", error);
            throw error;
        }
    }

    // Expense Routes
    async addExpense(expenseData: ExpenseData): Promise<any> {
        try {
            return await AxiosApi.post("/addExpense", expenseData);
        } catch (error) {
            console.error("Error adding expense:", error);
            throw error;
        }
    }

    async editExpense(
        id: number,
        expenseData: Omit<ExpenseData, "id">,
    ): Promise<any> {
        try {
            return await AxiosApi.put("/editExpense", { id, ...expenseData });
        } catch (error) {
            console.error("Error editing expense:", error);
            throw error;
        }
    }

    async deleteExpense(id: number): Promise<any> {
        try {
            return await AxiosApi.delete("/deleteExpense", { data: { id } });
        } catch (error) {
            console.error("Error deleting expense:", error);
            throw error;
        }
    }

    async getExpense(id: number): Promise<any> {
        try {
            return await AxiosApi.get(`/getExpense`, { params: { id } });
        } catch (error) {
            console.error("Error fetching expense:", error);
            throw error;
        }
    }

    async getAllExpenses(): Promise<any> {
        try {
            return await AxiosApi.get("/getAllExpenses");
        } catch (error) {
            console.error("Error fetching all expenses:", error);
            throw error;
        }
    }

    // Category Routes
    async addCategory(categoryData: CategoryData): Promise<any> {
        try {
            return await AxiosApi.post("/addCategory", categoryData);
        } catch (error) {
            console.error("Error adding category:", error);
            throw error;
        }
    }

    async editCategory(
        id: number,
        categoryData: Omit<CategoryData, "id">,
    ): Promise<any> {
        try {
            return await AxiosApi.put("/editCategory", { id, ...categoryData });
        } catch (error) {
            console.error("Error editing category:", error);
            throw error;
        }
    }

    async deleteCategory(id: number): Promise<any> {
        try {
            return await AxiosApi.delete("/deleteCategory", { data: { id } });
        } catch (error) {
            console.error("Error deleting category:", error);
            throw error;
        }
    }

    async getCategory(id: number): Promise<any> {
        try {
            return await AxiosApi.get(`/getCategory`, { params: { id } });
        } catch (error) {
            console.error("Error fetching category:", error);
            throw error;
        }
    }

    async getAllCategories(): Promise<any> {
        try {
            return await AxiosApi.get("/getAllCategories");
        } catch (error) {
            console.error("Error fetching all categories:", error);
            throw error;
        }
    }

    // Budget Routes
    async addBudget(budgetData: BudgetData): Promise<any> {
        try {
            return await AxiosApi.post("/addBudget", budgetData);
        } catch (error) {
            console.error("Error adding budget:", error);
            throw error;
        }
    }

    async editBudget(
        id: number,
        budgetData: Omit<BudgetData, "id">,
    ): Promise<any> {
        try {
            return await AxiosApi.put("/editBudget", { id, ...budgetData });
        } catch (error) {
            console.error("Error editing budget:", error);
            throw error;
        }
    }

    async deleteBudget(id: number): Promise<any> {
        try {
            return await AxiosApi.delete("/deleteBudget", { data: { id } });
        } catch (error) {
            console.error("Error deleting budget:", error);
            throw error;
        }
    }

    async getBudget(id: number): Promise<any> {
        try {
            return await AxiosApi.get(`/getBudget`, { params: { id } });
        } catch (error) {
            console.error("Error fetching budget:", error);
            throw error;
        }
    }

    async getAllBudgets(): Promise<any> {
        try {
            return await AxiosApi.get("/getAllBudgets");
        } catch (error) {
            console.error("Error fetching all budgets:", error);
            throw error;
        }
    }

    // Budget Category Routes
    async addBudgetCategory(
        budgetCategoryData: BudgetCategoryData,
    ): Promise<any> {
        try {
            return await AxiosApi.post(
                "/addBudgetCategory",
                budgetCategoryData,
            );
        } catch (error) {
            console.error("Error adding budget category:", error);
            throw error;
        }
    }

    async editBudgetCategory(
        id: number,
        budgetCategoryData: Omit<BudgetCategoryData, "id">,
    ): Promise<any> {
        try {
            return await AxiosApi.put("/editBudgetCategory", {
                id,
                ...budgetCategoryData,
            });
        } catch (error) {
            console.error("Error editing budget category:", error);
            throw error;
        }
    }

    async deleteBudgetCategory(id: number): Promise<any> {
        try {
            return await AxiosApi.delete("/deleteBudgetCategory", {
                data: { id },
            });
        } catch (error) {
            console.error("Error deleting budget category:", error);
            throw error;
        }
    }

    async getBudgetCategory(id: number): Promise<any> {
        try {
            return await AxiosApi.get(`/getBudgetCategory`, { params: { id } });
        } catch (error) {
            console.error("Error fetching budget category:", error);
            throw error;
        }
    }

    async getAllBudgetCategories(): Promise<any> {
        try {
            return await AxiosApi.get("/getAllBudgetCategories");
        } catch (error) {
            console.error("Error fetching all budget categories:", error);
            throw error;
        }
    }
}

export default new UserApi();
