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
        Schema::create('downtimes', function (Blueprint $table) {
            $table->id();
            $table->string('category');
            $table->dateTime('downtime');
            $table->dateTime('uptime');
            $table->integer('total');
            $table->string('issue');
            $table->string('remark')->nullable();
            $table->decimal('availability', 5, 2);
            $table->timestamps();
            $table->softDeletes();
            $table->index('category');
            $table->index('issue');
            $table->index('remark');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('downtimes');
    }
};
