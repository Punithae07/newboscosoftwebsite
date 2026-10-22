<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ContactSubmission extends Model
{
    use HasUuids;
    use SoftDeletes;

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'name',
        'email',
        'phone',
        'company',
        'country',
        'industry',
        'product_interest',
        'message',
        'source_page',
        'status',
        'managed_by',
        'ip_hash',
        'user_agent_hash',
        'submission_fingerprint',
    ];
}
