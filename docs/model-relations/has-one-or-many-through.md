# Has One or Many Through

A [has-one-through](https://laravel.com/docs/eloquent-relationships#has-one-through) or [has-many-through](https://laravel.com/docs/eloquent-relationships#has-many-through) is made simple with just issuing the model you want to reach to.

For example, let's say a Country can have many Users, and each User can have many Posts. While there is no direct connection between the Country and the Posts, the Country can access the Post _through_ the User model itself.

Essentially, `Country:id <- User:country_id <- Post:user_id`.

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

```php{10,18}
Schema::create('countries', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->timestamps();
});

Schema::create('users', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->foreignIdFor(Country::class); // belongsTo:Country
    $table->timestamps();
});

Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->string('body');
    $table->foreignIdFor(User::class); // belongsTo:User
    $table->timestamps();
});
```

Larawiz will automatically get the target model and intermediate model from the relation name, so Larawiz will understand `userPosts` as:

> _`Post` model through the `User` model_.

## Pointing the correct models

If you're using something like `userAprovedPost`, Larawiz won't be able to guess correctly: it won't know if you're accessing `AprovedPost` through `User`, or `Post` through `UserAproved`. The same goes for relations like `publications`.

When you are not abiding to Laravel naming conventions, you should point the models yourself.

```yaml{4}
models:
  Country:
    name: string
    publications: hasManyThrough:Post,User
```

```php
class Country extends Model
{
    public function publications()
    {
        return $this->hasManyThrough(Post::class, User::class);
    }
}
```

::: tip Always on the safe side
Larawiz will make the columns and relations automatically into the models if you didn't declare it. 
:::

