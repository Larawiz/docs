# Many to Many \(and Polymorphic\)

Many-to-many relations are easy to make. Larawiz will automatically create pivot tables for your `belongsToMany` and `morphToMany` relations by using Laravel naming convention automatically.

{% hint style="danger" %}
Because the nature of many-to-many relations, these are only supported on models with primary keys.
{% endhint %}

## Many to Many

For [many-to-many](https://laravel.com/docs/7.x/eloquent-relationships#many-to-many) relations, just simply add the `belongsToMany` in each Model pointing to the other.

{% tabs %}
{% tab title="YAML" %}
```yaml
models:
  User:
    name: string
    roles: belongsToMany:Role as:permissionsSet
  
  Role:
    name: string
    users: belongsToMany:User
```
{% endtab %}

{% tab title="Models" %}
```php
class User extends Model
{
    public function roles()
    {
        return $this->belongsToMany(Role::class)
                    ->as('permissionsSet');
    }
}

class Role extends Model
{
    public function users()
    {
        return $this->belongsToMany(User::class);
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

Schema::create('roles', function (Blueprint $table) {
    $table->id();
    $table->string('name');
});

// Pivot created automatically for "Role" and "User".
Schema::create('role_user', function (Blueprint $table) {
    $table->bigUnsignedInteger('user_id');
    $table->bigUnsignedInteger('role_id');
});
```
{% endtab %}
{% endtabs %}

The pivot table is created automatically based on Laravel naming conventions, so you don't have to worry about creating the pivot table yourself manually.

## Polymorphic Many to Many

For the case of [many-to-many-polymorphic](https://laravel.com/docs/7.x/eloquent-relationships#many-to-many-polymorphic-relations), Larawiz will also guess the pivot migration. Let's use the same Laravel example that many Posts or Videos having multiple Tags. Note that, again, we didn't issue the pivot table anywhere.

{% tabs %}
{% tab title="YAML" %}
```yaml
models:
  Post:
    name: string
    tags: morphToMany:Tag,taggable

  Video:
    name: string
    tags: morphToMany:Tag,taggable

  Tag:
    name: string
    posts: morphedByMany:Post,taggable
    videos: morphedByMany:Video,taggable
```
{% endtab %}

{% tab title="Models" %}
```php
class Post extends Model
{
    public function roles()
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }
}

class Video extends Model
{
    public function users()
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }
}

class Tag extends Model
{
    public function posts()
    {
        return $this->morphedByMany(Post::class, 'taggable');
    }
    
    public function videos()
    {
        return $this->morphedByMany(Video::class, 'taggable');
    }
}
```
{% endtab %}

{% tab title="Migrations" %}
```php
Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->string('name');
});

Schema::create('videos', function (Blueprint $table) {
    $table->id();
    $table->string('name');
});

Schema::create('tags', function (Blueprint $table) {
    $table->id();
    $table->string('name');
});

// Polymorphic Pivot created automatically by Larawiz for "tags"
Schema::create('taggables', function (Blueprint $table) {
    $table->unsignedBigInteger('tag_id');
    $table->morphs('taggable');
});
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
Polymorphic Many-to-many relations needs the name of "~able" relation as second argument.
{% endhint %}

If the models use UUID as primary key, no problem, Larawiz will automatically create a pivot table using `uuidMorphs`.

{% tabs %}
{% tab title="YAML" %}
```yaml
models:
  Post:
    uuid: ~
    name: string
    tags: morphToMany:Tag,taggable

  Video:
    uuid: ~
    name: string
    tags: morphToMany:Tag,taggable

  Tag:
    uuid: ~
    name: string
    posts: morphedByMany:Post,taggable
    videos: morphedByMany:Video,taggable
```
{% endtab %}

{% tab title="Models" %}
```php
class Post extends Model
{
    public function roles()
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }
}

class Video extends Model
{
    public function users()
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }
}

class Tag extends Model
{
    public function posts()
    {
        return $this->morphedByMany(Post::class, 'taggable');
    }
    
    public function videos()
    {
        return $this->morphedByMany(Video::class, 'taggable');
    }
}
```
{% endtab %}

{% tab title="Migrations" %}
```php
// Polymorphic Pivot created automatically by Larawiz for "tags"
Schema::create('taggables', function (Blueprint $table) {
    $table->uuid('tag_uuid');
    $table->uuidMorphs('taggable');
});
```
{% endtab %}
{% endtabs %}

{% hint style="danger" %}
Polymorphic many-to-many only supports models with either `id` or `uuid` . If you use another type of primary key for your models, you should create the relation yourself after scaffolding.
{% endhint %}

