<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{  
    public function getAllProducts() {
        $products = Product::all();
        return $products;
    }

    public function getSingleProduct($id) {
        $products = Product::findOrFail($id);
        return $products;
    }
}