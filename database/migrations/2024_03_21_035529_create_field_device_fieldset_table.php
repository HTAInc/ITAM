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
        Schema::create('field_device_fieldset', function (Blueprint $table) {
            $table->unsignedBigInteger('field_device_id');
            $table->unsignedBigInteger('fieldset_id');

            $table->foreign('field_device_id')->references('id')->on('field_devices')->onDelete('cascade');
            $table->foreign('fieldset_id')->references('id')->on('fieldsets')->onDelete('cascade');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('field_device_fieldset_pivot');
    }
};
