# Soft Deletes

To make a model [soft-deletable](https://laravel.com/docs/eloquent#soft-deleting), just issue the `softDeletes` or `softDeletesTz` into the columns list. Larawiz will automatically detect and use the `SoftDeletes` trait for the Model.

:::: tabs :options="{ useUrlFragment: false }"
::: tab "YAML" id="soft-deletes-yaml"
```yaml{4}
models:
  Post:
    title: string
    softDeletes: ~
```
:::

::: tab "Model" id="soft-deletes-model"
```php{3}
class Post extends Model
{
    use SoftDeletes;
    
    // ...
}
```
:::

::: tab "Migration" id="soft-deletes-migration"
```php{4}
Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->softDeletes();
    $table->timestamps();
});
```
:::
::::

Alternatively, you can issue the column name to use as soft-deletes, that will be reflected in the model itself.

:::: tabs :options="{ useUrlFragment: false }"
::: tab "YAML"  id="soft-deletes-yaml-2"
```yaml{4}
models:
  Post:
    title: string
    softDeletes: soft_deleted_at
```
:::

::: tab "Model" id="soft-deletes-model-2"
```php{3,5}
class Podcast extends Model
{
    use SoftDeletes;

    protected const DELETED_AT = 'soft_deleted_at';
}
```
:::

::: tab "Migration" id="soft-deletes-migration-2"
```php{4}
Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->softDeletes('soft_deleted_at');
    $table->timestamps();
});
```
:::
::::

::: warning Soft-deletes are always timestamps 
Laravel doesn't support non-timestamp soft-delete columns, but you're free to create your own soft-deleted column logic after scaffolding.
:::

## Deleted factory state

When you create a model with soft deletes and factories enabled by default, Larawiz will conveniently create a `deleted` factory state, for free.

:::: tabs :options="{ useUrlFragment: false }"
::: tab "YAML" id="deleted-factory-state-yaml"
```yaml{4}
models:
  Post:
    title: string
    softDeletes: soft_deleted_at
```
:::

::: tab "Factory" id="deleted-factory-state-factory"
```php{5-9}
$factory->define(Post::class, function (Faker $faker) {
    // ...
});

$factory->state(Post::class, 'deleted', function (Faker $faker) {
    return [
        'soft_deleted_at' => $faker->dateTime,
    ];
});
```
:::
::::