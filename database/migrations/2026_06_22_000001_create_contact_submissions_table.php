<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('contact_submissions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name', 120);
            $table->string('email', 190)->index();
            $table->string('phone', 60)->nullable();
            $table->string('company', 190)->nullable();
            $table->string('country', 120)->nullable();
            $table->string('industry', 120)->nullable();
            $table->string('product_interest', 160)->nullable();
            $table->text('message');
            $table->string('source_page', 255)->nullable()->index();
            $table->string('status', 40)->default('New')->index();
            $table->string('managed_by', 190)->nullable();
            $table->string('ip_hash', 64)->nullable();
            $table->string('user_agent_hash', 64)->nullable();
            $table->string('submission_fingerprint', 64)->nullable()->index();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('contact_submissions');
    }
};
