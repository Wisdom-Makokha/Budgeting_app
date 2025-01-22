<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\budget_categories;

class BudgetCategoriesController extends Controller
{
    //
    public function addBudgetCategory(Request $request)
    {
        if (Auth::check()) {
            $request->validate([
                'amount' => 'required|decimal:2',
                'budgetid' => 'required|exists:budgets,id',
                'categoryid' => 'required|exists:categories,id',
            ]);

            $budget_categories = budget_categories::create([
                'amount' => $request->amount,
                'budgetid' => $request->budgetid,
                'categoryid' => $request->categoryid,
                'userid' => Auth::user()->id
            ]);

            return response(
                [
                    'message' => 'added new budget category',
                    'budget_category' => $budget_categories
                ],
                201
            );
        } else
            return response()->json(
                ['message' => 'Unauthorized'],
                403
            );
    }

    public function editBudgetCategory(Request $request)
    {
        if (Auth::check()) {
            $request->validate([
                'id' => 'required|integer',
                'amount' => 'decimal:2',
                'budgetid' => 'exists:budgets,id',
                'categoryid' => 'exists:categories,id',
            ]);

            $budget_category = budget_categories::find($request->id);

            if (Auth::id() != $request->input('id')) {
                return response()->json(
                    ['message' => 'Unauthorized'],
                    403
                );
            }

            if (!$budget_category->exists()) {
                return response()->json(
                    ['message' => 'Requested resource not found'],
                    404
                );
            }

            $budget_category->update($request->all());

            return response(
                [
                    'message' => 'budget_category updated',
                    'budget_category' => $budget_category
                ],
                201
            );
        } else
            return response()->json(
                ['message' => 'Unauthorized'],
                403
            );
    }

    public function deleteBudgetCategory(Request $request)
    {
        if (Auth::check()) {
            $budget_category = budget_categories::find($request->input('id'));

            if (!$budget_category) {
                return response()->json(
                    ['message' => 'Requested resource not found'],
                    404
                );
            }

            if (Auth::id() != $budget_category->userid) {
                return response()->json(
                    ['message' => 'Unauthorized'],
                    403
                );
            }

            $budget_category->delete();

            return response(
                ['message' => 'budget category deleted successfully'],
                200
            );
        } else {
            return response()->json(
                ['message' => 'Unauthorized'],
                403
            );
        }
    }

    public function getBudgetCategory(Request $request)
    {
        $budget_category = budget_categories::join('categories', 'budget_categories.categoryid', 'categories.id')
            ->select('budget_categories.amount', 'categories.name')
            ->where('budget_categories.id', $request->input('id'))
            ->get();

        if (!$budget_category) {
            return response()->json(
                ['message' => 'budget category not found'],
                404
            );
        }
        else
        {
            return response(
                ['budget_category' => $budget_category],
                200
            );
        }
    }

    public function getAllBudgetCategories()
    {
        $budget_categories = budget_categories::join('categories', 'budget_categories.categoryid', 'categories.id')
            ->select('budget_categories.amount', 'categories.name')
            ->get();

        if (count($budget_categories) == 0) {
            return response()->json(
                ['message' => 'budget category not found'],
                404
            );
        }
        else
        {
            return response(
                ['budget_category' => $budget_categories],
                200
            );
        }
    }
}
