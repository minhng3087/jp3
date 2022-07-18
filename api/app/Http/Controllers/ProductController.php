<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function getAllProducts() {
        $products = Product::simplePaginate(12);
        return response()->json($products);
    }

    public function getSingleProduct($id) {
        $product = Product::findOrFail($id);
        return response()->json($product);
    }
}
