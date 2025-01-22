<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('budget_categories', function (Blueprint $table) {
            $table->id();
            $table->decimal('amount', total: 8, places: 2);
            $table->unsignedBigInteger('budgetid');
            $table->unsignedBigInteger('categoryid');
            $table->unsignedBigInteger('userid');
            $table->timestamps();

            $table->foreign('userid')->references('id')->on('users');
            $table->foreign('categoryid')->references('id')->on('categories');
            $table->foreign('budgetid')->references('id')->on('budgets');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('budget_categories');
    }
};
