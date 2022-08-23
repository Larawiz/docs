# Soft Deletes

To make a model [soft-deletable](https://laravel.com/docs/eloquent#soft-deleting), just issue the `softDeletes` or `softDeletesTz` into the columns list. Larawiz will automatically detect and use the `SoftDeletes` trait for the Model.

```yaml{4}
models:
  Post:
    title: string
    softDeletes: ~
```

```php{3}
class Post extends Model
{
    use SoftDeletes;
    
    // ...
}
```

```php{4}
Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->softDeletes();
    $table->timestamps();
});
```

You can also issue the column name to use as soft-deletes, that will be reflected in the model itself.

```yaml{4}
models:
  Post:
    title: string
    softDeletes: removed_at
```

```php{5}
class Podcast extends Model
{
    use SoftDeletes;

    protected const DELETED_AT = 'removed_at';
}
```

```php{4}
Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->softDeletes('removed_at');
    $table->timestamps();
});
```

## Deleted factory state

When you create a model with soft deletes and factories enabled by default, Larawiz will conveniently create a `trashed` factory state, for free.


```yaml{4}
models:
  Post:
    title: string
    softDeletes: soft_deleted_at
```

```php{8-13}
class PostFactory extends Factory
{
    public function definition()
    {
        // ...
    }
    
    public function trashed()
    {
        return $this->state([
            $this->newModel()->getDeletedAtColumn() => now(),
        ]);
    }
}
```