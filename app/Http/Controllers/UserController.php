<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\income;
use App\Models\expenses;
use App\Models\budget;
use App\Models\budget_categories;

class UserController extends Controller
{
    // create the crud
    public function createUser(Request $request)
    {
        $request->validate([
            "name" => "required|string",
            "email" => "required|string|unique:users,email",
            "password" => "required|string|confirmed"
        ]);

        $user = User::create([
            "name" => $request->name,
            "email" => $request->email,
            "password" => bcrypt($request->password)
        ]);

        Auth::login($user);
        $token = $request->user()->createToken('userToken')->plainTextToken;

        return response(
            [
                'message' => 'user created successfully',
                'token' => $token,
                'user' => $user
            ],
            201
        );
    }

    public function updateUser(Request $request)
    {
        if (Auth::check()) {
            $request->validate([
                'name' => 'required|string',
                'email' => 'required|string|email|unique:users,email',
                'password' => 'required|min:8|string|confirmed'
            ]);

            $id = $request->input('id');
            $user = User::find($id);

            if (!$user)
                return response()->json(['message' => 'User not found'], 404);

            // ensure the authenticated user is updating their own profile
            if (Auth::id() != $user->id)
                return response()->json(['message' => 'Unauthorized'], 403);

            $user->update($request->all());

            return response(
                [
                    'message' => 'user updated',
                    'user' => $user
                ]
                ,
                200
            );
        } else
            return response()->json(['message' => 'Unauthorized'], 403);
    }

    public function deleteUser(Request $request)
    {
        if (Auth::check()) {
            $user = User::find($request->input('id'));

            if (!$user)
                return response()->json(['message' => 'User not found'], 404);

            // ensure the authenticated user is deleting their own profile
            if (Auth::id() != $user->id)
                return response()->json(['message' => 'Unauthorized'], 403);

            $user->delete();

            return response(['message' => 'user deleted successfully'], 200);
        } else
            return response()->json(['message' => 'Unauthorized'], 403);

    }

    public function getUser(Request $request)
    {
        $id = $request->input('id');
        $user = User::select('users.name', 'users.email', 'users.created_at', 'users.updated_at')
            ->where('users.id', $id)
            ->get();

        if ($user)
            return response([$user], 200);
        else
            return response(['message' => 'user not found'], 404);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'prohibits:name|string|email',
            'name' => 'prohibits:email|string',
            'password' => 'required|string'
        ]);

        $credentials = $request->only('email' == null ? 'name' : 'email', 'password');

        if (!Auth::attempt($credentials))
            return response()->json(['message' => 'Invalid credentials'], 400);

        $user = Auth::user();
        $token = $request->user()->createToken('userToken')->plainTextToken;

        return response(
            [
                'message' => 'Login successful',
                'user' => $user,
                'token' => $token
            ],
            200
        );
    }

    public function logout(Request $request)
    {
        $user = User::find($request->input('id'));

        if (!$user)
            return response()->json(['message' => 'User not found'], 404);

        // ensure the authenticated user is loggingg out their own account
        if (Auth::user()->id != $user->id)
            return response()->json(['message' => 'Unauthorized'], 403);

        if (Auth::user()->status == 'active') {
            Auth::user()->status = 'inactive';
            Auth::user()->save();

            if (Auth::check()) {
                Auth::guard('web')->logout();
                $request->user()->tokens()->delete();
                $request->session()->invalidate();
                $request->session()->regenerateToken();
            }
        }

        return response(['message' => 'logout successful'], 202);
    }

    public function getUserIncome(Request $request)
    {
        if (Auth::check()) {
            $income = income::join('categories', 'income.categoryid', 'categories.id')
                ->select('income.amount', 'income.source', 'income.date_received', 'income.periodic', 'income.period_in_days', 'categories.name')
                ->where('income.userid', Auth::id())
                ->where('income.id', $request->input('id'))
                ->get();

            if (!$income)
                return response()->json(
                    ['message' => 'Requested resource income not found'],
                    404
                );
            else
                return response()->json(
                    ['income' => $income],
                    200
                );
        } else
            return response()->json(
                ['message' => 'Unauthorised'],
                403
            );
    }

    public function getAllUserIncome()
    {
        if (Auth::check()) {
            $incomes = income::join('categories', 'income.categoryid', 'categories.id')
                ->select('income.amount', 'income.source', 'income.date_received', 'income.periodic', 'income.period_in_days', 'categories.name')
                ->where('income.userid', Auth::id())
                ->get();

            if (!$incomes)
                return response()->json(
                    ['message' => 'Requested resource income not found'],
                    404
                );
            else
                return response()->json(
                    ['income' => $incomes],
                    status: 200
                );
        } else
            return response()->json(['message' => 'Unauthorised'], 403);
    }

    public function getUserExpense(Request $request)
    {
        if (Auth::check()) {
            $expense = expenses::join('categories', 'expenses.categoryid', 'categories.id')
                ->select('expenses.amount', 'expenses.source', 'expenses.date_received', 'expenses.periodic', 'expenses.period_in_days', 'categories.name')
                ->where('expenses.userid', Auth::id())
                ->where('expenses.id', $request->input('id'))
                ->get();

            if (!$expense)
                return response()->json(
                    ['message' => 'Requested resource not found'],
                    404
                );
            else
                return response()->json(
                    ['expense' => $expense],
                    200
                );
        } else
            return response()->json(
                ['message' => 'Unauthorised'],
                403
            );
    }

    public function getAllUserExpenses()
    {
        if (Auth::check()) {
            $expenses = expenses::join('categories', 'expenses.categoryid', 'categories.id')
                ->select('expenses.amount', 'expenses.source', 'expenses.date_received', 'expenses.periodic', 'expenses.period_in_days', 'categories.name')
                ->where('expenses.userid', Auth::id())
                ->get();

            if (!$expenses)
                return response()->json(
                    ['message' => 'Requested resource not found'],
                    404
                );
            else
                return response()->json(
                    ['expenses' => $expenses],
                    200
                );
        } else
            return response()->json(
                ['message' => 'Unauthorised'],
                403
            );
    }

    public function getUserBudget(Request $request)
    {
        if (Auth::check()) {
            $budget = budget::join('users', 'budget.userid', 'users.id')
                ->select('budget.amount', 'budget.start_date', 'budget.end_date')
                ->where('budget.userid', Auth::id())
                ->where('budget.id', $request->input('id'))
                ->get();



            if (!$budget)
                return response()->json(
                    ['message' => 'Requested resource not found'],
                    404
                );
            else {
                $budget_categories = budget_categories::join('categories', 'budget_category.categoryid', 'categories.id')
                    ->select('budget_categories.amount', 'categories.name')
                    ->where('budget_categories.budgetid', $request->input('id'))
                    ->where('budget_Categories.userid', Auth::id())
                    ->get();

                return response()->json(
                    [
                        'budget' => $budget,
                        'budget_categories' => $budget_categories
                    ],
                    200
                );
            }
        } else
            return response()->json(
                ['message' => 'Unauthorised'],
                403
            );
    }

    public function getAllUserBudgets(Request $request)
    {
        if (Auth::check()) {
            $budgets = budget::join('users', 'budget.userid', 'users.id')
                ->select('budget.amount', 'budget.start_date', 'budget.end_date')
                ->where('budget.userid', Auth::id())
                ->get();



            if (!$budgets)
                return response()->json(
                    ['message' => 'Requested resource not found'],
                    404
                );
            else {
                $budget_categories = budget_categories::join('categories', 'budget_category.categoryid', 'categories.id')
                    ->select('budget_categories.amount', 'categories.name')
                    ->where('budget_Categories.userid', Auth::id())
                    ->get();

                return response()->json(
                    [
                        'budget' => $budgets,
                        'budget_categories' => $budget_categories
                    ],
                    200
                );
            }
        } else
            return response()->json(
                ['message' => 'Unauthorised'],
                403
            );
    }

    public function getUserBudgetCategory(Request $request)
    {
        if (Auth::check()) {
            $budget_category = budget_categories::join('categories', 'budget_category.categoryid', 'categories.id')
                ->select('budget_categories.amount', 'categories.name')
                ->where('budget_categories.id', $request->input('id'))
                ->where('budget_Categories.userid', Auth::id())
                ->get();

            if (!$budget_category) {
                return response()->json(
                    ['message' => 'budget category not found'],
                    404
                );
            } else {
                return response(
                    ['budget_category' => $budget_category],
                    200
                );
            }
        } else
            return response()->json(
                ['message' => 'Unauthorised'],
                403
            );
    }

    public function getAllUserBudgetCategories()
    {
        if (Auth::check()) {
            $budget_category = budget_categories::join('categories', 'budget_category.categoryid', 'categories.id')
                ->select('budget_categories.amount', 'categories.name')
                ->where('budget_Categories.userid', Auth::id())
                ->get();

            if (!$budget_category) {
                return response()->json(
                    ['message' => 'budget category not found'],
                    404
                );
            } else {
                return response(
                    ['budget_category' => $budget_category],
                    200
                );
            }
        } else
            return response()->json(
                ['message' => 'Unauthorised'],
                403
            );
    }
}
