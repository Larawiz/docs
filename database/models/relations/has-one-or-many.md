# Has One or Many

You can do effortless [has-one](https://laravel.com/docs/7.x/eloquent-relationships#one-to-one) or [has-many](https://laravel.com/docs/7.x/eloquent-relationships#one-to-many) relations both ways with just issuing the type, following Laravel naming conventions.

In this example, Larawiz gets a hint of the model you want to reach using the relation name. The `post: hasMany` means it has many `Post` , while the `user: belongsTo` means it belongs to the `User` model.

{% tabs %}
{% tab title="YAML" %}
```yaml
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
{% endtab %}

{% tab title="Models" %}
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
{% endtab %}

{% tab title="Migrations" %}
```php
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
{% endtab %}
{% endtabs %}

{% hint style="success" %}
While reference columns are needed for relations like [`belongsTo`](https://laravel.com/docs/7.x/eloquent-relationships#one-to-one) and [`morphTo`](https://laravel.com/docs/7.x/eloquent-relationships#one-to-one-polymorphic-relations), Larawiz will try to guess the column to create based the model name plus the primary column, like `user_id`. 
{% endhint %}

## Null and index belongsTo

When creating a `belongsTo` relation, you can issue the keyword  `index`  or `unique` to create a index or unique index on the relation column. This can speed up greatly getting relations from the belonging model.

You can also use the `nullable` keyword to create a nullable column, which can be used to create models without a belonging parent model.

{% tabs %}
{% tab title="YAML" %}
```yaml
models:
  User:
    name: string
    comments: hasMany
  
  Comment:
    author: belongsTo:User index nullable withDefault
```
{% endtab %}

{% tab title="Migration" %}
```php
Schema::create('user', function (Blueprint $table) {
  $table->id();
  $table->string('name');
});

Schema::create('comments', function (Blueprint $table) {
  $table->id();
  $table->unsignedBigInteger('user_id')->index()->nullable();
});
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
If you use `nullable` in your `belongsTo` relation, remember that you can also [use `withDefault`  to return an empty relation instance](https://laravel.com/docs/7.x/eloquent-relationships#default-models) if the record is not found.
{% endhint %}

