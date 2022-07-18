<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function getAllProducts(Request $request) {
        $sortType = $request->sortType;
        $searchString = $request->searchString;

        $products = Product::when(strlen($searchString) >= 3, function ($query) use ($searchString) {
            return $query->where('name', 'like', '%'.$searchString.'%');
        })
            ->when($sortType and $sortType === 'high-to-low', function ($query) use ($sortType) {
                return $query->orderBy('price', 'desc');
            })
            ->when($sortType and $sortType === 'low-to-high', function ($query) use ($sortType) {
                return $query->orderBy('price');
            })
            ->simplePaginate(12);
        return response()->json($products);
    }

    public function getSingleProduct($id) {
        $product = Product::findOrFail($id);
        return response()->json($product);
    }
}
