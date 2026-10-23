<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('brochure')) {
            return;
        }

        if (DB::getDriverName() === 'sqlite') {
            Schema::table('brochure', function (Blueprint $table): void {
                $table->string('pdf_name', 190)->nullable()->change();
            });

            return;
        }

        if (DB::getDriverName() === 'mysql') {
            DB::statement('ALTER TABLE brochure MODIFY pdf_name VARCHAR(190) NULL');

            return;
        }

        DB::statement('ALTER TABLE brochure ALTER COLUMN pdf_name TYPE VARCHAR(190)');
        DB::statement('ALTER TABLE brochure ALTER COLUMN pdf_name DROP NOT NULL');
    }

    public function down(): void
    {
        // Do not shrink the column because existing white-paper names may exceed 50 characters.
    }
};
