<?php

namespace App\Models;

use App\Models\User;
use App\Models\Comment;
use App\Models\Concerns\UuidPrimaryKey;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * @mixin \Illuminate\Database\Eloquent\Builder
 *
 * @method static \Illuminate\Database\Eloquent\Builder|static query()
 * @method static static make(array $attributes = [])
 * @method static static create(array $attributes = [])
 * @method static static forceCreate(array $attributes)
 * @method \App\Models\Post firstOrNew(array $attributes = [], array $values = [])
 * @method \App\Models\Post firstOrFail($columns = ['*'])
 * @method \App\Models\Post firstOrCreate(array $attributes, array $values = [])
 * @method \App\Models\Post firstOr($columns = ['*'], \Closure $callback = null)
 * @method \App\Models\Post firstWhere($column, $operator = null, $value = null, $boolean = 'and')
 * @method \App\Models\Post updateOrCreate(array $attributes, array $values = [])
 * @method null|static first($columns = ['*'])
 * @method static static findOrFail($id, $columns = ['*'])
 * @method static static findOrNew($id, $columns = ['*'])
 * @method static null|static find($id, $columns = ['*'])
 *
 * @property-read string $id
 *
 * @property string $title
 * @property string $body
 * @property array $private_notes
 * @property \Illuminate\Support\Carbon|null $published_at
 *
 * @property-read \App\Models\User $user
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Comment>|\App\Models\Comment[] $comments
 *
 * @property-read \Illuminate\Support\Carbon $created_at
 * @property-read \Illuminate\Support\Carbon $updated_at
 *
 * @method static \Database\Factories\PostFactory factory($count = null, $state = [])
 */
class Post extends Model
{
    use SoftDeletes;
    use HasFactory;
    use UuidPrimaryKey;

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = ['private_notes' => 'array', 'published_at' => 'timestamp'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['title', 'body', 'private_notes'];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = ['private_notes'];

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
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo|\App\Models\User
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany|\App\Models\Comment
     */
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}