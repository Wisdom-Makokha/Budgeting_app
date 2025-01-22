<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\expenses;
use Illuminate\Support\Facades\Auth;

class ExpensesController extends Controller
{
    //
    public function addExpense(Request $request)
    {
        if (Auth::check()) {
            $request->validate([
                "amount" => 'required|decimal:2',
                'source' => 'string|null',
                'date_received' => 'required|date',
                'periodic' => 'required|boolean',
                'period_in_days' => 'integer|null',
                'categoryid' => 'required|integer|exists:categories,id'
            ]);


            $expense = expenses::create([
                'amount' => $request->amount,
                'source' => $request->source,
                'date_received' => $request->date_received,
                'periodic' => $request->periodic,
                'period_in_days' => $request->period_in_days,
                'category_id' => $request->categoryid,
                'userid' => Auth::user()->id
            ]);

            return response(
                [
                    'message' => 'added new expense',
                    'expense' => $expense
                ],
                201
            );
        } else
            return response()->json(['message' => 'Unauthorized'], 403);
    }

    public function editExpense(Request $request)
    {
        if (Auth::check()) {
            $request->validate(
                [
                    'id' => 'required|integer',
                    'amount' => 'decimal:2|null',
                    'source' => 'string|null',
                    'date_received' => 'date|null',
                    'periodic' => 'boolean|null',
                    'period_in_days' => 'integer|null',
                    'category_id' => 'integer|null|exists:categories,id',
                ]
            );
            $expense = expenses::find($request->id);

            if (Auth::id() != $expense->userid)
                return response()->json(['message' => 'Unauthorized'], 403);

            if (!$expense)
                return response()->json(['message' => 'Requested resource not found'], 404);

            $expense->update($request->all());

            return response(
                [
                    'message' => 'expense updated',
                    'expense' => $expense
                ],
                201
            );
        }
        return response()->json(['message' => 'Unauthorized'], 403);
    }

    public function deleteExpense(Request $request)
    {
        if (Auth::check()) {
            $expense = expenses::find($request->input('id'));

            if (!$expense)
                return response()->json(['message' => 'Requested resource not found'], 404);

            if (Auth::id() != $expense->user_id)
                return response()->json(['message' => 'Unauthorized'], 403);

            $expense->delete();

            return response(['message' => 'expense deleted successfully'], 200);

        } else
            return response()->json(['message' => 'Unauthorized'], 403);
    }

    public function getExpense(Request $request)
    {
        $expense = expenses::join('categories', 'expense.categoryid', 'categories.id')
            ->select('expense.amount', 'expense.source', 'expense.date_received', 'expense.periodic', 'expense.period_in_days', 'categories.name')
            ->where('expense.id', $request->input('id'))
            ->get();

        if ($expense)
            return response(['expense' => $expense], 200);
        else
            return response()->json(['message' => 'expense not found'], 404);
    }

    public function getAllExpenses()
    {
        $expense = expenses::join('categories', 'expense.categoryid', 'categories.id')
            ->select('expense.amount', 'expense.source', 'expense.date_received', 'expense.periodic', 'expense.period_in_days', 'categories.name')
            ->get();

        if ($expense)
            return response(['expense' => $expense], 200);
        else
            return response()->json(['message' => 'expense not found'], 404);
    }
}
