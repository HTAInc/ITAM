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
        Schema::create('model_devices', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('model_no');
            $table->integer('min_qty')->nullable();
            $table->string('image')->nullable();
            $table->string('notes')->nullable();
            $table->unsignedBigInteger('category_id');
            $table->unsignedBigInteger('manufacturer_id');
            $table->unsignedBigInteger('depreciation_id')->nullable();
            $table->unsignedBigInteger('fieldset_id')->nullable();
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('manufacturer_id')->references('id')->on('manufacturers')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('depreciation_id')->references('id')->on('depreciations')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('fieldset_id')->references('id')->on('fieldsets')->onDelete('cascade')->onUpdate('cascade');
            $table->timestamps();
            $table->softDeletes();
            $table->index('name');
            $table->index('model_no');
            $table->index('notes');
            $table->index('category_id');
            $table->index('manufacturer_id');
            $table->index('fieldset_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('model_devices');
    }
};
