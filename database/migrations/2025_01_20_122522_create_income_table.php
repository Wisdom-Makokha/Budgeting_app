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
        Schema::create('income', function (Blueprint $table) {
            $table->id();
            $table->decimal('amount', total: 8, places: 2);
            $table->string('source')->nullable();
            $table->date('date_received')->useCurrent();
            $table->boolean('periodic')->default(false);
            $table->unsignedInteger('period_in_days')->default(0);
            $table->unsignedBigInteger('userid');
            $table->unsignedBigInteger('categoryid');
            $table->timestamps();

            $table->foreign('userid')->references('id')->on('users');
            $table->foreign('categoryid')->references('id')->on('categories');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('income');
    }
};
