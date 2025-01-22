<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\income;

class IncomeController extends Controller
{
    // crud
    public function addIncome(Request $request)
    {
        if (Auth::check()) {
            $request->validate([
                "amount" => 'required|decimal:2',
                'source' => 'string',
                'date_received' => 'required|date',
                'periodic' => 'required|boolean',
                'period_in_days' => 'integer',
                'categoryid' => 'required|integer|exists:categories,id'
            ]);

            $income = income::create([
                'amount' => $request->amount,
                'source' => $request->source,
                'date_received' => $request->date_received,
                'periodic' => $request->periodic,
                'period_in_days' => $request->period_in_days,
                'categoryid' => $request->categoryid,
                'userid' => Auth::user()->id
            ]);

            return response(
                [
                    'message' => 'added new income',
                    'income' => $income
                ],
                201
            );
        } else
            return response()->json(
                ['message' => 'Unauthorized'],
                403
            );

    }

    public function editIncome(Request $request)
    {
        if (Auth::check()) {
            $request->validate(
                [
                    'id' => 'required|integer',
                    'amount' => 'decimal:2',
                    'source' => 'string',
                    'date_received' => 'date',
                    'periodic' => 'boolean',
                    'period_in_days' => 'integer',
                    'categoryid' => 'integer|exists:categories,id'
                ]
            );
            $income = income::find($request->id);

            if (Auth::id() != $income->userid)
                return response()->json(
                    ['message' => 'Unauthorized'],
                    403
                );

            if (!$income)
                return response()->json(
                    ['message' => 'Requested resource not found'],
                    404
                );

            $income->update($request->all());

            return response(
                [
                    'message' => 'income updated',
                    'income' => $income
                ],
                201
            );
        }
        return response()->json(
            ['message' => 'Unauthorized'],
            403
        );
    }

    public function deleteIncome(Request $request)
    {
        if (Auth::check()) {
            $income = income::find($request->input('id'));

            if (!$income)
                return response()->json(
                    ['message' => 'Requested resource not found'],
                    404
                );

            if (Auth::id() != $income->userid)
                return response()->json(
                    ['message' => 'Unauthorized'],
                    403
                );

            $income->delete();

            return response(
                ['message' => 'income deleted successfully'],
                200
            );

        } else
            return response()->json(
                ['message' => 'Unauthorized'],
                403
            );
    }

    public function getIncome(Request $request)
    {
        $income = income::join('categories', 'income.categoryid', 'categories.id')
            ->select('income.amount', 'income.source', 'income.date_received', 'income.periodic', 'income.period_in_days', 'categories.name')
            ->where('income.id', $request->input('id'))
            ->get();

        if ($income)
            return response(
                ['income' => $income],
                200
            );
        else
            return response()->json(
                ['message' => 'income not found'],
                404
            );
    }

    public function getAllIncome()
    {
        $income = income::join('categories', 'income.categoryid', 'categories.id')
            ->select('income.amount', 'income.source', 'income.date_received', 'income.periodic', 'income.period_in_days', 'categories.name')
            ->get();

        if (count($income) > 0)
            return response(
                ['income' => $income],
                200
            );
        else
            return response()->json(
                ['message' => 'requested resource not found'],
                404
            );
    }
}
