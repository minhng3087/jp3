<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use DB;

class OrderController extends Controller
{  
    public function getAllOrders() {
        $orders = Order::with('user')->get();
        return $orders;
    }

    public function getOrderDetail($id) {
        $order_detail = Order::with([
            'order_details', 'user', 
            'order_details.product:id,name,image' 
        ])
        ->find($id);
        return $order_detail;
    }

    public function postOrder(Request $request) {
        $validator = Validator::make($request->all(), [
            'address' => 'required|string',
            'phone' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error'=>"Error"], 401);      
        }

        DB::beginTransaction();
        try {
            $order = new Order();
            $order->user_id = $request->user_id;
            $order->address = $request->address;
            $order->phone = $request->phone;
            $order->total_price = $request->total_price;
            $order->save();

            foreach ($request->productsList as $product) {
                $orderDetail = new OrderDetail;
                $orderDetail->order_id = $order->id;
                $orderDetail->product_id = $product['id'];
                $orderDetail->quantily = $product['quantily'];
                $orderDetail->price = $product['price'];
                $orderDetail->save();
            }
            DB::commit();
            return response()->json('Mua hang thanh cong');
        }catch (Exception $e) {
            DB::rollBack();
            throw new Exception($e->getMessage());
        }

    }
}