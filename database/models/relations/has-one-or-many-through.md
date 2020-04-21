# Has One or Many Through

A [has-one-through](https://laravel.com/docs/7.x/eloquent-relationships#has-one-through) or [has-many-through](https://laravel.com/docs/7.x/eloquent-relationships#has-many-through) is made simple with just issuing the model you want to reach to.

For example, let's say a Country can have many Users, and each User can have many Posts. While there is no direct connection between the Country and the Posts, the Country can access the Post _through_ the User model themselves.

{% tabs %}
{% tab title="YAML" %}
```yaml
models:
  Country:
    name: string
    userPosts: hasManyThrough:Post,User

  User:
    name: string
    country: belongsTo:Country

  Post:
    title: string
    body: string
    author: belongsTo:User
```
{% endtab %}

{% tab title="Models" %}
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
{% endtab %}

{% tab title="Migrations" %}
```php
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
{% endtab %}
{% endtabs %}

{% hint style="danger" %}
Larawiz will throw you an error if the `hasManyThrough` relations don't have the correct `belongsTo` relations, because without these the needed columns won't be present.
{% endhint %}

