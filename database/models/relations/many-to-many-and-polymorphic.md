# Many to Many \(and Polymorphic\)

Many-to-many relations are easy to make. Larawiz will automatically create pivot tables for your `belongsToMany` and `morphToMany` relations by using Laravel naming convention automatically.

{% hint style="danger" %}
Because the nature of many-to-many relations, these are only supported on models with `id` or `uuid` primary keys.
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

{% hint style="success" %}
You don't need to declare both models with a `belongsToMany`, automatic pivot table creation will work anyway.
{% endhint %}

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

{% hint style="warning" %}
Polymorphic Many-to-many relations needs the name of "~able" relation as second argument. 
{% endhint %}

The example above will create the `taggables` table automatically, since Larawiz will use the second argument from the `morphToMany` and pluralize it for the migration.

{% hint style="info" %}
There is no need to create a `morphedByMany` relation in the child model, but is recommended to.
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
// Polymorphic Pivot created automatically for [taggable].
Schema::create('taggables', function (Blueprint $table) {
    $table->uuid('tag_uuid');
    $table->uuidMorphs('taggable');
});
```
{% endtab %}
{% endtabs %}

{% hint style="danger" %}
Polymorphic many-to-many only supports ALL parent models with either `id` or `uuid` for primary keys. If one of these models uses one different from the others, you will get an error.
{% endhint %}

## Overriding automatic pivot tables

You can always override the pivot table created automatically by Larawiz by just doing a migration table with the same name. This works for both normal and polymorphic pivot tables.

This is very handy if you don't want the pivot model overhead, and add some properties to the pivot relation.

{% tabs %}
{% tab title="YAML" %}
```yaml
models:
  User:
    name: string
    roles: belongsToMany:Role withPivot:associated_at
  
  Role:
    name: string
    users: belongsToMany:User

migrations:
  role_user:
    role_id: unsignedBigInteger
    user_id: unsignedBigInteger
    associated_at: timestamp useCurrent
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

// Table overriden by the developer.
Schema::create('role_user', function (Blueprint $table) {
    $table->bigUnsignedInteger('user_id');
    $table->bigUnsignedInteger('role_id');
    $table->timestamp('associated_at')->useCurrent();
});
```
{% endtab %}
{% endtabs %}

