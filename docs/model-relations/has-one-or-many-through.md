# Has One or Many Through

A [has-one-through](https://laravel.com/docs/eloquent-relationships#has-one-through) or [has-many-through](https://laravel.com/docs/eloquent-relationships#has-many-through) is made simple with just issuing the model you want to reach to.

For example, let's say a Country can have many Users, and each User can have many Posts. While there is no direct connection between the Country and the Posts, the Country can access the Post _through_ the User model themselves.

:::: tabs
::: tab "YAML" id="has-one-or-many-through-yaml"
```yaml{4,8,13}
models:
  Country:
    name: string
    userPosts: hasManyThrough

  User:
    name: string
    country: belongsTo:Country

  Post:
    title: string
    body: string
    author: belongsTo:User
```
:::

::: tab "Models" id="has-one-or-many-through-models"
```php
class Country extends Model
{
    public function userPosts()
    {
        return $this->hasManyThrough(Post::class, User::class);
    }
}

class User extends Model
{
    public function country()
    {
        return $this->belongsTo(Country::class);
    }
}

class Post extends Model
{
    public function author()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
```
:::

::: tab "Migrations" id="has-one-or-many-through-migrations"
```php{10,18}
Schema::create('countries', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->timestamps();
});

Schema::create('users', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->unsignedBigInteger('country_id'); // belongsTo:Country
    $table->timestamps();
});

Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->string('body');
    $table->unsignedBigInteger('user_id'); // belongsTo:User
    $table->timestamps();
});
```
:::
::::

Larawiz will automatically get the target model and intermediate model from the relation name, so `userPosts` means "`Post` model through the `User` model". 

If you don't abide to Laravel naming conventions, you can always point the models yourself.

```yaml{4}
models:
  Country:
    name: string
    posts: hasManyThrough:Publication,Writer
```

::: tip Always on the safe side 
Larawiz will tell you if the `hasManyThrough` relations don't have the correct `belongsTo` relations, because without these the needed columns won't be present.
:::

