<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\budget;

class BudgetController extends Controller
{
    //
    public function addBudget(Request $request)
    {
        if (Auth::check()) {
            $request->validate([
                'amount' => 'required|decimal:2',
                'start_date' => 'required|date',
                'end_date' => 'required|date'
            ]);

            $budget = Budget::create([
                'amount' => $request->amount,
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
                'userid' => Auth::user()->id
            ]);

            return response(
                [
                    'message' => 'added new budget',
                    'budget' => $budget
                ],
                201
            );
        } else {
            return response()->json(
                ['message' => 'Unauthorized'],
                403
            );
        }
    }

    public function editBudget(Request $request)
    {
        if (Auth::check()) {
            $request->validate([
                'id' => 'required|integer',
                'amount' => 'decimal:2',
                'start_date' => 'date',
                'end_date' => 'date',
            ]);

            $budget = budget::find($request->id);
            if (Auth::id() != $budget->userid) {
                return response()->json(
                    ['message' => 'Unauthorized'],
                    403
                );
            }

            if (!$budget) {
                return response()->json(
                    ['message' => 'Requested resource not found'],
                    404
                );
            }

            $budget->update($request->all());

            return response(
                [
                    'message' => 'budget updated',
                    'budget' => $budget
                ],
                201
            );
        } else {
            return response()->json(
                ['message' => 'Unauthorized'],
                403
            );
        }

    }

    public function deleteBudget(Request $request)
    {
        if (Auth::check()) {
            $budget = budget::find($request->input('id'));

            if (!$budget) {
                return response()->json(
                    ['message' => 'Requested resource not found'],
                    404
                );
            }

            if (Auth::id() != $budget->userid) {
                return response()->json(
                    ['message' => 'Unauthorized'],
                    403
                );
            }

            $budget->delete();

            return response(
                ['message' => 'budget deleted successfully'],
                200
            );

        } else {
            return response()->json(
                ['message' => 'Unauthorized'],
                403
            );
        }
    }

    public function getBudget(Request $request)
    {
        $budget = budget::find($request->input('id'));

        if (!$budget) {
            return response(
                ['message' => 'requested resource not found'],
                404
            );
        } else {
            return response(
                ['budget' => $budget],
                200
            );
        }
    }

    public function getAllBudgets()
    {
        $budget = budget::get();

        if (count($budget) > 0) {
            return response()->json(
                ['budgets' => $budget],
                200
            );
        } else {
            return response(
                ['message' => 'Requested resource not found'],
                404
            );
        }
    }
}
