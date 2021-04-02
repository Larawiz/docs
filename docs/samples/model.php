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
 * @method \App\Post make(array $attributes = [])
 * @method \App\Post create(array $attributes = [])
 * @method \App\Post forceCreate(array $attributes)
 * @method \App\Post firstOrNew(array $attributes = [], array $values = [])
 * @method \App\Post firstOrFail($columns = ['*'])
 * @method \App\Post firstOrCreate(array $attributes, array $values = [])
 * @method \App\Post firstOr($columns = ['*'], \Closure $callback = null)
 * @method \App\Post firstWhere($column, $operator = null, $value = null, $boolean = 'and')
 * @method \App\Post updateOrCreate(array $attributes, array $values = [])
 * @method \App\Post findOrFail($id, $columns = ['*'])
 * @method \App\Post findOrNew($id, $columns = ['*'])
 * @method null|\App\Post first($columns = ['*'])
 * @method null|\App\Post find($id, $columns = ['*'])
 *
 * @property-read \App\User $user
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Comment[] $comments
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
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo|\App\User
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany|\App\Comment
     */
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}