<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function filter($product_id){
        $transaction = Transaction::whereProductId($product_id)->whereDate('expiry_date', '>', Carbon::parse()->format('Y-m-d'))->where('quantity', '>', 0)->where('type', 1)->first();
        return response()->json($transaction);
    }

    public function store(Request $request)
    {
        $product = Product::whereId($request->product_id)->first();
        $transaction = new Transaction([
                'purchase_order' => $request->purchase_order,
                'quantity' => $request->quantity,
                'display_quantity' => $request->quantity,
                'type' => $request->type,
                'expiry_date' => $request->expiry_date,
            ]
        );
        $product->transactions()->save($transaction);
        return response()->json($transaction);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function show(Transaction $transaction)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Transaction $transaction)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function destroy(Transaction $transaction)
    {
        //
    }
}
