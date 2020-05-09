# Has One or Many

You can do effortless [has-one](https://laravel.com/docs/eloquent-relationships#one-to-one) or [has-many](https://laravel.com/docs/eloquent-relationships#one-to-many) relations both ways with just issuing the type, following Laravel naming conventions.

In this example, Larawiz gets a hint of the model you want to reach using the relation name. The `post: hasMany` means it has many `Post` , while the `user: belongsTo` means it belongs to the `User` model.

:::: tabs
::: tab "YAML" id="has-one-or-many-yaml"
```yaml{4-5,10,14}
models:
  User:
    name: string
    posts: hasMany
    biography: hasOne
    
  Post:
    title: string
    body: longText
    user: belongsTo
    
  Biography:
    body: longText
    user: belongsTo
```
:::

::: tab "Models" id="has-one-or-many-models"
```php
class User extends Model
{
    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function biography()
    {
        return $this->hasOne(Biography::class);
    }
}

class Post extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

class Biography extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
```
:::

::: tab "Migrations" id="has-one-or-many-migrations"
```php{10,17}
Schema::create('users', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->timestamps();
});

Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->longText('body');
    $table->unsignedBigInteger('user_id');
    $table->timestamps();
});

Schema::create('biographies', function (Blueprint $table) {
    $table->id();
    $table->longText('body');
    $table->unsignedBigInteger('user_id');
    $table->timestamps();
});
```
:::
::::

::: tip Guessing columns 
Larawiz always tries to guess the column to create based the model name plus the primary column, like `user_id` or `post_uuid`. 
:::

## Indexed and null `belongsTo`

When creating a `belongsTo` relation, you can issue the keyword  `index`  or `unique` to create a index or unique index on the relation column, respectively. This can speed up greatly getting relations from the belonging model, like using `unique` for one-to-one relations and `index` for one-to-many.

You can also use the `nullable` keyword to create a nullable column, which can be used to create models without a belonging parent model, even in combination with index keywords.

:::: tabs
::: tab "YAML" id="null-and-index-belongsto-yaml"
```yaml{7,10}
models:
  User:
    name: string
    comments: hasMany
  
  Comment:
    author: belongsTo:User index nullable withDefault
    
  Biography:
    user: belongsTo unique
```
:::

::: tab "Migration" id="null-and-index-belongsto-migration"
```php{8,13}
Schema::create('user', function (Blueprint $table) {
  $table->id();
  $table->string('name');
});

Schema::create('comments', function (Blueprint $table) {
  $table->id();
  $table->unsignedBigInteger('user_id')->index()->nullable();
});

Schema::create('biographies', function (Blueprint $table) {
  $table->id();
  $table->unsignedBigInteger('user_id')->unique();
});
```
:::
::::

::: tip withDefault is recommended 
If you use `nullable` in your `belongsTo` relation, remember that you can also [use `withDefault`  to return an empty relation instance](https://laravel.com/docs/eloquent-relationships#default-models) if the record is not found.
:::

