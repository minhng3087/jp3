<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Order;
use App\Models\OrderDetail;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(AdminSeeder::class);
        $this->call(ProductSeeder::class);
        \App\Models\User::factory(5)
            ->create()
            ->each(function($u) {
                $m = $u->orders()->save(Order::factory()->make());
                $m->each(function($i) {
                    $i->order_details()->save(OrderDetail::factory()->make());
                });
            });
        // \App\Models\OrderDetail::factory(10)->create();
    }
}
