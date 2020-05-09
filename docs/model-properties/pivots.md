# Pivots

Some relations need a Pivot table to work. Don't worry, Larawiz will automatically create pivot tables for your `belongsToMany` and `morphToMany` relations by using Laravel naming convention automatically.

:::: tabs
::: tab "YAML"
```yaml
User:
  name: string
  roles: belongsToMany:Role as:permissionsSet

Role:
  name: string
  users: belongsToMany:User
```
:::

::: tab "Models"
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
:::

::: tab "Migrations"
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
:::
::::

For the case of polymorphic pivots, Larawiz will also guess the migration. Let's use the same Laravel example that many Posts or Videos having multiple Tags. Note that, again, we didn't issue the pivot table anywhere.

:::: tabs
::: tab "YAML"
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
:::

::: tab "Models"
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
:::

::: tab "Migrations"
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
:::
::::

::: warning
The only requisite for automatic pivot tables is for the related models to have an integer-based primary key \(like `id` \) or `uuid`. If these are not present, Larawiz will tell you.
:::

## Using Pivot models

You can also create your own Pivot model, or a Morphable Pivot model, by setting the `type` key to `pivot` or `morphPivot`, respectively.

Then, **use the `using` method in the relation declaration** to let Larawiz know you're using a Pivot Model instead of a normal Eloquent Model to avoid creating an automatic pivot migration.

:::: tabs
::: tab "YAML"
```yaml
User:
  name: string
  subscriptions: belongsToMany:Podcast using:Subscription

Podcast:
  title: string
  subscribers: belongsToMany:User using:Subscription

Subscription:
  user: belongsTo:User
  podcast: belongsTo:Podcast
  last_heard: timestamp nullable
```
:::

::: tab "Models"
```php
class User extends Model
{
    public function subscriptions()
    {
        return $this->belongsToMany(Podcast::class)
                    ->using(Subscription::class);
    }
}

class Podcast extends Model
{
    public function subscribers()
    {
        return $this->belongsToMany(User::class)
                    ->using(Subscription::class);
    }
}

class Subscription extends Pivot // Type changed automatically.
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function podcast()
    {
        return $this->belongsTo(Podcast::class);
    }
}
```
:::

::: tab "Migrations"
```php
Schema::create('users', function (Blueprint $table) {
    $table->id();
    $table->string('name');
});

Schema::create('podcasts', function (Blueprint $table) {
    $table->id();
    $table->string('name');
});

Schema::create('subscriptions', function (Blueprint $table) {
    $table->bigUnsignedInteger('user_id');
    $table->bigUnsignedInteger('podcast_id');
    $table->timestamps();
});

```
:::
::::

When you reference a Model as a Pivot, Larawiz will automatically change the type of Model to `Pivot` or `MorphPivot` instead of just `Model` depending on the case.

::: tip
When creating [Pivot models](https://laravel.com/docs/eloquent-relationships#defining-custom-intermediate-table-models), soft-deleted, primary keys and timestamps are automatically disabled. You can re-enable them using the `primary` and `timestamps` keys or columns, but soft-deletes are bypassed since the framework still doesn't support it, [but it may in the future](https://github.com/laravel/framework/pull/31224).

```yaml
Subscription:
  id: ~
  user: belongsTo:User
  podcast: belongsTo:Podcast
  last_heard: timestamps nullable
  timestamps: ~
```
:::

::: danger
When using Pivot Models, **Larawiz will hands-off the pivot to you**, so be sure to add the needed columns and relations so the pivot table can work properly once your project is scaffolded.
:::

::: warning
If you declare the Pivot Model, and create a migration for it, you will get an error. Only automatic pivot tables can be overridden.
:::

