# Relations

To make relations, issue the name of the relation followed by the type of the relation. You can pass arguments to it separated by comma if needed, but mostly you won't.

{% tabs %}
{% tab title="YAML" %}
```yaml
models:
  User:
    name: string
    comments: hasMany:Comment

  Comment:
    id: ~
    body: string
    author: belongsTo:User
```
{% endtab %}

{% tab title="Models" %}
```php
class User extends Model
{
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}

class Comment extends Model
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
Schema::create('users', function (Blueprint $table) {
    $table->id();
    $table->string('name');
});

Schema::create('comments', function (Blueprint $table) {
    $table->id();
    $table->string('body');
    $table->unsignedBigInteger('user_id');
});
```
{% endtab %}
{% endtabs %}

Larawiz will understand automatically the column is relation, and add the needed properties and columns to the model magically.

If you don't issue the column to relate the Model, like `belongsTo:User,author_id`, Larawiz will try its best to guess it automatically, prioritizing the database table name rather than the method name.

{% hint style="success" %}
Columns are needed for relations like [`belongsTo`](https://laravel.com/docs/7.x/eloquent-relationships#one-to-one) and [`morphTo`](https://laravel.com/docs/7.x/eloquent-relationships#one-to-one-polymorphic-relations). If these aren't issued, Larawiz will guess the column to create based the class name plus the primary column, like `user_id`.
{% endhint %}

## Polymorphic Relations

For polymorphic relations, you can just simply set it as `morphTo`. If you don't add the column name to the `morphsTo` relation, it will be inferred in from the relation name.

In this example, this will create the `Post` , `Article` and `Category`models with the relationships set, fully aware of the `Category` relation name. The migration for the `Category` model will include the morphs automatically.

{% tabs %}
{% tab title="YAML" %}
```yaml
models:
  Post:
    title: string
    body: string
    category: morphOne:Category
  
  Article:
    title: string
    body: string
    category: morphOne:Category

  Category:
    name: string
    categorizable: morphTo
```
{% endtab %}

{% tab title="Models" %}
```php
class Post extends Model
{
    public function category()
    {
        return $this->morphOne(Category::class, 'categorizable');
    }
}

class Article extends Model
{
    public function category()
    {
        return $this->morphOne(Category::class, 'categorizable');
    }
}

class Category extends Model
{
    public function categorizable()
    {
        return $this->morphTo();
    }
}
```
{% endtab %}

{% tab title="Migrations" %}
```php
Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->string('body');
    $table->timestamps();
});

Schema::create('articles', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->string('body');
    $table->timestamps();
});

Schema::create('categories', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->morphs('categorizable');
    $table->timestamps();
});
```
{% endtab %}
{% endtabs %}

{% hint style="danger" %}
If a model has more than a `morphTo` relationship and the other models don't specify which one, Larawiz will automatically pick the first.
{% endhint %}

If all the related models use `uuid` as primary key, don't worry, Larawiz will automatically change the migration column to use `uuid`.

{% tabs %}
{% tab title="YAML" %}
```yaml
models:
  Post:
    uuid: ~
    title: string
    body: string
    category: morphOne:Category
  
  Article:
    uuid: ~
    title: string
    body: string
    category: morphOne:Category

  Category:
    name: string
    categorizable: morphTo
```
{% endtab %}

{% tab title="Models" %}
```php
class Post extends Model
{
    public function category()
    {
        return $this->morphOne(Category::class, 'categorizable');
    }
}

class Article extends Model
{
    public function category()
    {
        return $this->morphOne(Category::class, 'categorizable');
    }
}

class Category extends Model
{
    public function categorizable()
    {
        return $this->morphTo();
    }
}
```
{% endtab %}

{% tab title="Migrations" %}
```php
Schema::create('posts', function (Blueprint $table) {
    $table->uuid();
    $table->string('title');
    $table->string('body');
    $table->timestamps();
});

Schema::create('articles', function (Blueprint $table) {
    $table->uuid();
    $table->string('title');
    $table->string('body');
    $table->timestamps();
});

Schema::create('categories', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->uuidMorphs('categorizable');
    $table->timestamps();
});
```
{% endtab %}
{% endtabs %}

## Has One or Many Through

A far relationship is made simple with just issuing the model you want to reach to.

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

## Nullable and Index column

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
    author: belongsTo:User index nullable
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

For the case of `morphTo` relation, an index is set automatically by Eloquent Blueprint. Instead, you can use the keywords `nullable` to allow null relations:

{% tabs %}
{% tab title="YAML" %}
```yaml
models:
  Image:
    imageable: morphTo nullable
```
{% endtab %}

{% tab title="Model" %}
```php
class Image extends Model
{
    public function imageable()
    {
        return $this->morphsTo();
    }
}
```
{% endtab %}

{% tab title="Migration" %}
```php
Schema::create('images', function (Blueprint $table) {
  $table->id();
  $table->nullableMorphs('imageable');
});
```
{% endtab %}
{% endtabs %}

