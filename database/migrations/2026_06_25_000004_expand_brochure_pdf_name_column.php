<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('brochure')) {
            return;
        }

        DB::statement('ALTER TABLE brochure ALTER COLUMN pdf_name TYPE VARCHAR(190)');
        DB::statement('ALTER TABLE brochure ALTER COLUMN pdf_name DROP NOT NULL');
    }

    public function down(): void
    {
        if (! Schema::hasTable('brochure')) {
            return;
        }

        DB::statement('ALTER TABLE brochure ALTER COLUMN pdf_name TYPE VARCHAR(50)');
        DB::statement('ALTER TABLE brochure ALTER COLUMN pdf_name DROP NOT NULL');
    }
};
