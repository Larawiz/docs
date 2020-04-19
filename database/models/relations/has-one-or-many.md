# Has One or Many

You can do effortless has-one or has-many relations both ways with just issuing the type and the model itself.

{% tabs %}
{% tab title="YAML" %}
```yaml
models:
  User:
    name: string
    posts: hasMany:Post
    biography: hasOne:Biography
    
  Post:
    title: string
    body: longText
    author: belongsTo:User
    
  Biography:
    body: longText
    user: belongsTo:User
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
    public function author()
    {
        return $this->belongsTo(User::class, 'user_id');
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

If you don't issue the column to relate the Model, like `belongsTo:User,author_id`, Larawiz will try its best to guess it automatically, prioritizing the database table name rather than the method name, as you can see in the example above.

{% hint style="warning" %}
Columns are needed for relations like [`belongsTo`](https://laravel.com/docs/7.x/eloquent-relationships#one-to-one) \(and [`morphTo`](https://laravel.com/docs/7.x/eloquent-relationships#one-to-one-polymorphic-relations)`)`. If these aren't issued, Larawiz will guess the column to create based the model name plus the primary column, like `user_id`. If not, Larawiz will tell you.
{% endhint %}

## Null and index belongsTo

When creating a `belongsTo` relation, you can issue the keyword  `index` to create a index on the relation column. This can speed up greatly getting relations from the belonging model.

You can also use the `nullable` keyword to create a nullable column, which can be used to create models without a belonging parent model.

{% tabs %}
{% tab title="YAML" %}
```yaml
models:
  User:
    name: string
    comments: hasMany:Comment
  
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
If you use `nullable` in your `belongsTo` relation, remember that you can also use `withDefault` .
{% endhint %}

