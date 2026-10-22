<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BrochureRequest extends Model
{
    use SoftDeletes;

    protected $table = 'brochure';

    protected $fillable = [
        'name',
        'pdf_name',
        'organization_name',
        'organization_email',
        'contact_number',
    ];
}
