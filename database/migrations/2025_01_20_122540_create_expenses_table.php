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
        Schema::create('expenses', function (Blueprint $table) {
            $table->id();
            $table->decimal('amount', total: 8, places: 2);
            $table->string('description')->nullable();
            $table->date('date_spent')->useCurrent();
            $table->boolean('periodic')->default(false);
            $table->unsignedInteger('period_in_days')->default(0);
            $table->unsignedBigInteger('categoryid');
            $table->unsignedBigInteger('userid');
            $table->timestamps();

            $table->foreign('categoryid')->references('id')->on('categories');
            $table->foreign('userid')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('expenses');
    }
};
