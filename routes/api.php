<?php

use App\Http\Controllers\BudgetCategoriesController;
use App\Http\Controllers\BudgetController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\IncomeController;
use App\Http\Controllers\ExpensesController;
use App\Http\Controllers\CategoriesController;
use Illuminate\Support\Facades\Route;

// Routes not requiring authentication
Route::post("/createUser", [UserController::class, 'createUser']);
Route::post('/login', [UserController::class, 'login']);
Route::get('/getUser', [UserController::class, 'getUser']);

Route::get('/getExpense', [ExpensesController::class, 'getExpense']);
Route::get('/getAllExpenses', [ExpensesController::class, 'getAllExpenses']);
Route::get('/getIncome', [IncomeController::class, 'getIncome']);
Route::get('/getAllIncome', [IncomeController::class, 'getAllIncome']);
Route::get('/getCategory', [CategoriesController::class, 'getCategory']);
Route::get('/getAllCategories', [CategoriesController::class, 'getAllCategories']);
Route::get('/getBudget', [BudgetController::class, 'getBudget']);
Route::get('/getAllBudgets', [BudgetController::class, 'getAllBudgets']);
Route::get('/getBudgetCategory', [BudgetCategoriesController::class, 'getBudgetCategory']);
Route::get('/getAllBudgetCategories', [BudgetCategoriesController::class, 'getAllBudgetCategories']);



Route::group(['middleware' => ['auth:sanctum']], function () {
    // user routes
    Route::put('/updateUser', [UserController::class, 'updateUser']);
    Route::delete('/deleteUser', [UserController::class, 'deleteUser']);
    Route::post('/logout', [UserController::class, 'logout']);
    Route::get('/getUserIncome', [UserController::class, 'getUserIncome']);
    Route::get('/getAllUserIncome', [UserController::class, 'getAllUserIncome']);
    Route::get('/getUserExpense', [UserController::class, 'getUserExpense']);
    Route::get('/getAllUserExpenses', [UserController::class, 'getAllUserExpenses']);
    Route::get('/getUserBudget', [UserController::class, 'getUserBudget']);
    Route::get('/getAllUserBudgets', [UserController::class, 'getAllUserBudgets']);
    Route::get('/getUserBudgetCategory', [UserController::class, 'getUserBudgetCategory']);
    Route::get('/getAllUserBudgetCategories', [UserController::class, 'getAllUserBudgetCategories']);

    // income routes
    Route::post('/addIncome', [IncomeController::class, 'addIncome']);
    Route::put('/editIncome', [IncomeController::class, 'editIncome']);
    Route::delete('/deleteIncome', [IncomeController::class, 'deleteIncome']);

    // expense routes
    Route::post('/addExpense', [ExpensesController::class, 'addExpense']);
    Route::put('/editExpense', [ExpensesController::class, 'editExpense']);
    Route::delete('/deleteExpense', [ExpensesController::class, 'deleteExpense']);

    //categories routes
    Route::post('/addCategory', [CategoriesController::class, 'addCategory']);
    Route::put('/editCategory', [CategoriesController::class, 'editCategory']);
    Route::delete('/deleteCategory', [CategoriesController::class, 'deleteCategory']);

    // budget routes
    Route::post('/addBudget', [BudgetController::class, 'addBudget']);
    Route::put('/editBudget', [BudgetController::class, 'editBudget']);
    Route::delete('/deleteBudget', [BudgetController::class, 'deleteBudget']);

    // budget categories
    Route::post('/addBudgetCategory', [BudgetCategoriesController::class, 'addBudgetCategory']);
    Route::put('/editBudgetCategory', [BudgetCategoriesController::class, 'editBudgetCategory']);
    Route::delete('/deleteBudgetCategory', [BudgetCategoriesController::class, 'deleteBudgetCategory']);
});
