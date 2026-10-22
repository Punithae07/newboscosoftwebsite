<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('newsletters')) {
            return;
        }

        Schema::create('newsletters', function (Blueprint $table) {
            $table->id();
            $table->string('email', 190)->unique();
            $table->boolean('is_subscribed')->default(true);
            $table->boolean('verify_status')->default(false);
            $table->string('subscribed_on', 100)->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('newsletters');
    }
};
