# Primary Key

Larawiz automatically creates the `id` primary column on [Quick Models](../model.md#quick-model), so there is no need to waste your precious keystrokes.

```yaml
models:
  Post:
    title: string
    excerpt: string
    body: longText
```

```php{2}
Schema::create('podcasts', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->string('slug');
    $table->longText('body');
    $table->timestamps(); 
});
```

You can change the name of the primary key using the `id` column followed by the new name. Larawiz will automatically point the primary key column name inside the model.

```yaml{3}
models:
  Post:
    id: publication_number
    title: string
    excerpt: string
    body: longText
```

```php{3}
class Post extends Model
{
    protected $primaryKey = 'publication_number';
    
    // ...
}
```

```php{2}
Schema::create('podcasts', function (Blueprint $table) {
    $table->id('publication_number');
    $table->string('title');
    $table->string('slug');
    $table->longText('body');
    $table->timestamps(); 
});
```

::: info ID is just better
Using `id: foo` instead of `foo: id` ensures you only declare a single primary key in a model.
:::

## UID as Primary Key

By setting `id: uuid` or `id: ulid`, Larawiz will automatically [include the `HasUuids` or `HasUlids` traits](https://laravel.com/docs/9.x/eloquent#uuid-and-ulid-keys) that come with Laravel. Larawiz also makes adjustments in the migrations to set them as primary keys appropriately.

```yaml{3,9}
models:
  Post:
    id: uuid
    title: string
    excerpt: string
    body: longText
  
  Image:
    id: ulid
    disk: string
    path: string
```

```php
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasUuids;
    
    // ...
}

class Image extends Model
{
    use HasUlids;
    
    // ...
}
```

```php{2,10}
Schema::create('posts', function (Blueprint $table) {
    $table->uuid('id')->primary();
    $table->string('title');
    $table->string('excerpt');
    $table->longText('body');
    $table->timestamps(); 
});

Schema::create('images', function (Blueprint $table) {
    $table->ulid('id')->primary();
    $table->string('disk');
    $table->string('path');
    $table->timestamps(); 
});
```

::: warning Only for Primary Keys 64
The traits are only attached to the model when using UID as primary keys.

You may add them manually [using the `traits` key](../model-properties/traits.md#external-traits). 
:::

## Primary Key on Custom Models

[Custom Models](../model.md#custom-model) hands-off the primary key declaration to you. You have three options:

1. use a primary column setting `id`,
2. pinpoint other Primary Column,
3. or just disable it altogether.

::: danger No Composite Primary Keys
[Eloquent ORM doesn't support Composite Primary keys](https://github.com/laravel/framework/issues/5355) (made from multiple columns). For that reason, these are also not supported in Larawiz.
:::

Let's check each option in order.

### Adding the ID or UUID manually

By default, if there is a column named `id`, it will be understood the model has a primary key. Larawiz will make the apropiate changes if is auto-incremental or a UUID.

```yaml{4}
models:
  Podcast:
    columns:
      id: uuid
      title: string
      excerpt: string
      body: longText
      timestamps: ~
```

```php{3-4}
class Podcast extends Model
{
    protected $keyType = 'string';
    protected $incrementing = false;

    // ...
}
```

```php{2}
Schema::create('podcasts', function (Blueprint $table) {
    $table->uuid('id')->primary();
    $table->string('title');
    $table->string('excerpt');
    $table->longText('body');
    $table->timestamps();
});
```

### Using another column as Primary Key

Alternatively, you can set any other column as primary by adding `primary` to the declaration. Larawiz will guess the rest based on the column you point as primary key, like the type and incrementing nature.

```yaml{4}
models:
  Podcast:
    columns:
      title: string primary
      excerpt: string
      body: longText
      timestamps: ~
```

```php{3-5}
class Podcast extends Model
{
    protected $primaryKey = 'title';
    protected $keyType = 'string';
    protected $incrementing = false;

    // ...
}
```

```php{2}
Schema::create('podcasts', function (Blueprint $table) {
    $table->string('title')->primary();
    $table->string('excerpt');
    $table->longText('body');
    $table->timestamps();
});
```

### No primary key

On the other hand, if you want your model to not have any primary key, simply don't issue an `id` or auto-incrementing column at all on your [Custom Model](../model.md#custom-model).

```yaml{8}
models:
  Podcast:
    columns:
      title: string
      slug: string
```

```php{3-4}
class Podcast extends Model
{
    protected $primaryKey = null;
    protected $incrementing = false;

    // ...
}
```

```php
Schema::create('podcasts', function (Blueprint $table) {
    $table->string('title');
    $table->string('slug');
});
```

::: info You may want to use Primary Keys anyway
A primary key identifies a single row in the database in a performant way. Laravel rely heavily on these.

Most of the time you will want one in your table, specially if you expect to make changes on a single record.
:::
