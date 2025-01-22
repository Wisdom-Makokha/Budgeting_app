<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\categories;

class CategoriesController extends Controller
{
    //
    public function addCategory(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:categories,name',
            'direction_of_flow' => 'required|boolean',
            'description' => 'string|null',
        ]);

        $category = categories::create([
            'name' => $request->name,
            'description' => $request->description,
            'direction_of_flow' => $request->direction_of_flow
        ]);

        return response(
            [
                'message' => 'added new category',
                'category' => $category
            ],
            201
        );
    }

    public function editCategory(Request $request)
    {
        $request->validate([
            'name' => 'string|null',
            'description' => 'string|null',
            'direction_of_flow' => 'boolean|null'
        ]);

        $category = categories::find($request->input('id'));

        if (!$category)
            return response()->json(
                ['message' => 'Requested resource not found'],
                404
            );

        $category->update($request->all());

        return response(
            [
                'message' => 'category updated',
                'category' => $category
            ],
            201
        );
    }

    public function deleteCategory(Request $request)
    {
        $category = categories::find($request->input('id'));

        if (!$category)
            return response()->json(
                ['message' => 'Requested resource not found'],
                404
            );

        $category->delete();

        return response(
            ['message' => 'category deleted successfully'],
            200
        );
    }

    public function getCategory(Request $request)
    {
        $category = categories::find($request->input('id'));

        if (!$category)
            return response(
                ['message' => 'requested resource not found'],
                404
            );
        else
            return response(
                ['category' => $category],
                200
            );
    }

    public function getAllCategories()
    {
        $categories = categories::get();

        if (count($categories) > 0)
            return response()->json(
                ['categories' => $categories],
                200
            );
        else
            return response(['message' => 'Requested resource not found'], 404);
    }
}
