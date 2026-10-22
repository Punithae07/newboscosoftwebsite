<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('brochure')) {
            return;
        }

        Schema::create('brochure', function (Blueprint $table) {
            $table->id();
            $table->string('name', 120);
            $table->string('pdf_name', 160)->nullable()->index();
            $table->string('organization_name', 190);
            $table->string('organization_email', 190)->index();
            $table->string('contact_number', 60);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('brochure');
    }
};
