# Relations

[Relations](https://laravel.com/docs/eloquent-relationships) in Larawiz are effortless. Just add the name of the relation, the type, and that's it. Larawiz will guess the target model from the relation name and add it to both the Model and the migrations, and also including their PHPDoc annotation.

```yaml{3,6}
models:
  User:
    posts: hasMany
  Post:
    title: string
    user: belongsTo
```

```php{2,6-9,13,17-20}
/**
 * @property-read \Illuminate\Database\Eloquent\Collection<int,\App\Models\Post>|\App\Models\Post[] $posts
 */
class User extends Model
{
    public function posts()
    {
        return $this->hasMany(Post::class);
    }
}

/**
 * @property-read \App\Models\User $user
 */
class Post extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
```

```php{2}
Schema::create('posts', function (Blueprint $table) {
    $table->foreignIdFor(User::class);
})
```

Alternatively, you can always set the name of the model, specially if you don't abide to Laravel naming conventions.

```yaml{3,5}
models:
  User:
    publications: hasMany:Post
  Post:
    author: belongsTo:User
```

```php{2,6-9,13,17-20}
/**
 * @property-read \Illuminate\Database\Eloquent\Collection<\App\Models\Post>|\App\Models\Post[] $publications
 */
class User extends Model
{
    public function publications()
    {
        return $this->hasMany(Post::class);
    }
}

/**
 * @property-read \App\Models\User $author
 */
class Post extends Model
{
    public function author()
    {
        return $this->belongsTo(User::class);
    }
}
```

::: danger Primary Keys are required
Larawiz will break the wand if you make a relation to a Model without a primary key.
:::