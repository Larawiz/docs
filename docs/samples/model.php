<?php

namespace App\Models;

use App\Models\User;
use App\Models\Comment;
use App\Models\HasUuidPrimaryKey;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @mixin \Illuminate\Database\Eloquent\Builder
 *
 * @method \App\Models\Post make(array $attributes = [])
 * @method \App\Models\Post create(array $attributes = [])
 * @method \App\Models\Post forceCreate(array $attributes)
 * @method \App\Models\Post firstOrNew(array $attributes = [], array $values = [])
 * @method \App\Models\Post firstOrFail($columns = ['*'])
 * @method \App\Models\Post firstOrCreate(array $attributes, array $values = [])
 * @method \App\Models\Post firstOr($columns = ['*'], \Closure $callback = null)
 * @method \App\Models\Post firstWhere($column, $operator = null, $value = null, $boolean = 'and')
 * @method \App\Models\Post updateOrCreate(array $attributes, array $values = [])
 * @method \App\Models\Post findOrFail($id, $columns = ['*'])
 * @method \App\Models\Post findOrNew($id, $columns = ['*'])
 * @method null|\App\Models\Post first($columns = ['*'])
 * @method null|\App\Models\Post find($id, $columns = ['*'])
 *
 * @property-read \App\Models\User $user
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Comment[] $comments
 *
 * @property string $uuid
 * @property string $title
 * @property string $body
 * @property array $private_notes
 * @property null|\Illuminate\Support\Carbon $premium_at
 *
 * @property-read \Illuminate\Support\Carbon $created_at
 * @property-read \Illuminate\Support\Carbon $updated_at
 */
class Post extends Model
{
    use SoftDeletes;
    use HasUuidPrimaryKey;

    /**
     * The attributes that should be cast.
     *
     * @var.
     */
    protected $casts = ['private_notes' => 'array'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['title', 'body'];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = ['private_notes'];

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'uuid';

    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = false;

    /**
     * The "type" of the primary key ID.
     *
     * @var string
     */
    protected $keyType = 'string';

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['published_at'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo|\App\Models\User
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany|\App\Models\Comment
     */
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}