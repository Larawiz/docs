# Has One or Many

You can do effortless [has-one](https://laravel.com/docs/eloquent-relationships#one-to-one) or [has-many](https://laravel.com/docs/eloquent-relationships#one-to-many) relations both ways with just issuing the type, following Laravel naming conventions.

In this example, Larawiz gets a hint of the model you want to reach using the relation name:

- In the `User` model, the `post: hasMany` means it _has many `Post`_
- In the `Post` and `Biography` models, the `user: belongsTo` means it _belongs to an `User`_.

The result is all models and migrations relations in sync.

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

```php{10,17}
Schema::create('users', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->timestamps();
});

Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->longText('body');
    $table->foreignIdFor(User::class);
    $table->timestamps();
});

Schema::create('biographies', function (Blueprint $table) {
    $table->id();
    $table->longText('body');
    $table->foreignIdFor(User::class);
    $table->timestamps();
});
```

::: tip Guessing columns
Larawiz always tries to guess the column to create based the model name plus the primary column, like `user_id` or `post_title` if you are using [custom primary keys](../model-columns/primary-key.md#primary-key-on-custom-models).
:::

## Indexed and null `belongsTo`

When creating a `belongsTo` relation, you can issue the keyword  `index`  or `unique` to create an index or unique index on the relation column, respectively. This can **greatly speed up retrieving relations** from the parent model, like using `unique` for one-to-one relations and `index` for one-to-many.

You can also use the `nullable` keyword to create a nullable column, which can be used to create models without a belonging parent model, even in combination with index keywords.

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

```php
class Comment extends Model
{
    public function comment()
    {
        return $this->belongsTo(User::class)->withDefault();
    }
}
```

```php{8,13}
Schema::create('user', function (Blueprint $table) {
  $table->id();
  $table->string('name');
});

Schema::create('comments', function (Blueprint $table) {
  $table->id();
  $table->foreignIdFor(User::class)->index()->nullable();
});

Schema::create('biographies', function (Blueprint $table) {
  $table->id();
  $table->foreignIdFor(User::class)->unique();
});
```

::: tip `withDefault` is recommended
If you use `nullable` in your `belongsTo` relation, remember that you can also [use `withDefault`  to return an empty relation instance](https://laravel.com/docs/eloquent-relationships#default-models) if the record is not found.
:::

## Of Many

For the case of [has one of many](https://laravel.com/docs/eloquent-relationships#has-one-of-many), you can mix the declaration with `latestOfMany`, `oldestOfMany` and `ofMany` with basic syntax. These methods will be set in the Model, with their respective PHPDoc. These also receive arguments.

Since the most normal name of the relation would be "lastSomething" or "firstSomething", Larawiz will extract the last word and guess the model with it. For example, `lastOrder` will point to the `Order` model.

```yaml
models:
  Customer:
    orders: hasMany
    oldestOrder: hasOne oldestOfMany
    largestOrder: hasOne ofMany:max,price

  Order:
    # ...
```

```php
class Customer extends Model
{
    public function orders()
    {
        return $this->hasMany(Order::class);
    }
    
    public function oldestOrder()
    {
        return $this->hasOne(Order::class)->oldestOfMany();
    }
    
    public function largestOrder()
    {
        return $this->hasOne(Order::class)->ofMany('max', 'price');
    }
}
```
