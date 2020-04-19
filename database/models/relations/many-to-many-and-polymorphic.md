# Many to Many

Many-to-many relations are easy to make. Larawiz will automatically create pivot tables for your `belongsToMany` and `morphToMany` relations by using Laravel naming convention automatically.

{% hint style="danger" %}
Many-to-many and Polymorphic many-to-many relations are only supported on models with primary keys.
{% endhint %}

## Many to Many

Just simply add the `belongsToMany` in each Model pointing to the other.

{% tabs %}
{% tab title="YAML" %}
```yaml
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

The pivot table is created automatically.

## Polymorphic Many to Many

For the case of polymorphic pivots, Larawiz will also guess the migration. Let's use the same Laravel example that many Posts or Videos having multiple Tags. Note that, again, we didn't issue the pivot table anywhere.

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
Polymorphic Many-to-many relations needs the name of "~able" relation.
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

