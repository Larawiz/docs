# Pivots Models

[Intermediate table models](https://laravel.com/docs/eloquent-relationships#defining-custom-intermediate-table-models), also called Pivot Models, are easy to do: simply point them out in the relations and Larawiz will automatically change the model to a Pivot Model or Polymorphic Pivot Model, and add the table names from the Pivot Model.

::: warning You're the Man Now, Dog
When using Pivot Models, **Larawiz will hands-off the pivot to you**, so be sure to add the needed columns and relations so the pivot table can work properly once your project is scaffolded, specially a primary key if you think you will need it.
:::

## Many to Many Pivot Models

If you want to use a Pivot Model, simply create a `belongsToMany` and **add the `using` method in ALL the relations**, pointing the model you want to use as Pivot or Polymorphic Pivot. Yeah, that's it.

:::: tabs :options="{ useUrlFragment: false }"
::: tab "YAML" id="many-to-many-pivot-models-yaml"
```yaml{4,8,11-12}
models:
  User:
    name: string
    subscriptions: belongsToMany:Podcast using:Subscription
  
  Podcast:
    title: string
    subscribers: belongsToMany:User using:Subscription
  
  Subscription:
    user: belongsTo
    podcast: belongsTo
    last_heard: timestamp nullable
```
:::

::: tab "Models" id="many-to-many-pivot-models-models"
```php
class User extends Model
{
    public function subscriptions()
    {
        return $this->belongsToMany(Podcast::class, 'subscriptions')
                    ->using(Subscription::class);
    }
}

class Podcast extends Model
{
    public function subscribers()
    {
        return $this->belongsToMany(User::class, 'subscriptions')
                    ->using(Subscription::class);
    }
}

class Subscription extends Pivot // Type changed automatically.
{
    protected $table = 'subscriptions';

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

::: tab "Migrations" id="many-to-many-pivot-models-migrations"
```php{12-13}
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

When you reference a Model as a Pivot, Larawiz will automatically change the type of Model to `Pivot`  instead of just `Model`, and add the correct table name to the relation if you haven't issued it manually, like `subscriptions: belongsToMany:Podcast,foobar`.

::: tip Remember, no Primary key
When creating [Pivot models](https://laravel.com/docs/eloquent-relationships#defining-custom-intermediate-table-models) as [Quick Models](../model.md#quick-model), primary keys will be disabled.
 
You can re-enable Primary Keys by issuing the `id`, `uuid` or [filling the `primary` key](../model-columns/primary-key.md).

[Soft-deletes](../model-columns/soft-deletes.md) are bypassed since the framework _still_ doesn't support it.

```yaml{5}
models:
  # ...

  Subscription:
    id: ~
    user: belongsTo
    podcast: belongsTo
    last_heard: timestamps nullable
```
:::

### Table names

When using Pivot Models for a `belongsToMany` relation, pivot tables will be created using the model name on plural to respect your model naming if you don't follow Laravel naming convention.

Alternatively, you can follow Laravel naming convention \(two models ordered alphabetically\), which will bypass naming the relation unnecessarily.

:::: tabs :options="{ useUrlFragment: false }"
::: tab "YAML" id="table-names-yaml"
```yaml{3,5,7-8}
models:
  User:
    podcasts: belongsToMany using:PodcastUser
  Podcast: 
    users: belongsToMany using:PodcastUser
  PodcastUser:
    user: belongsTo
    podcast: belongsTo    
```
:::

::: tab "Model" id="table-names-model"
```php
class User extends Model
{
    public function podcasts()
    {
        return $this->belongsToMany(Podcast::class)
                    ->using(PodcastUser::class);
    }
}

class Podcast extends Model
{
    public function users()
    {
        return $this->belongsToMany(User::class)
                    ->using(PodcastUser::class);
    }
}

class PodcastUser extends Pivot // Type changed automatically.
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

::: tab "Migration" id="table-names-migration"
```php
Schema::create('podcast_user', function (Blueprint $table) {
    $table->bigUnsignedInteger('user_id');
    $table->bigUnsignedInteger('podcast_id');
    $table->timestamps();
});
```
:::
::::

## Polymorphic Many to Many Pivot Models

You can also include Polymorphic Pivot Models. If the parent models use UUID as primary key, Larawiz will automatically create a pivot table using `uuidMorphs`.

For example, here all related models use UUID, but the tag itself uses `id`. Here the `Taggable` model will be changed automatically to  `MorphPivot` . We will need to **add the `uuid` to the `morphTo` relation** to make UUID polymorphic relations work.

:::: tabs :options="{ useUrlFragment: false }"
::: tab "YAML" id="polymorphic-many-to-many-pivot-models-yaml"
```yaml{18-19}
models:
  Post:
    uuid: ~
    title: string
    tags: morphToMany:Tag,taggable using:Taggable

  Video:
    uuid: ~
    name: string
    tags: morphToMany:Tag,taggable using:Taggable

  Tag:
    name: string
    posts: morphedByMany:Post,taggable
    videos: morphedByMany:Video,taggable
    
  Taggable:
    tag: belongsTo
    taggable: morphTo uuid
    timestmaps: ~
```
:::

::: tab "Models" id="polymorphic-many-to-many-pivot-models-models"
```php
class Post extends Model
{
    public function tags()
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }
}

class Video extends Model
{
    public function tags()
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

class Taggable extends MorphPivot
{
    public function tag()
    {
        return $this->belongsTo(Tag::class);
    }
    
    public function taggable()
    {
        return $this->morphTo();
    }
}
```
:::

::: tab "Migrations" id="polymorphic-many-to-many-pivot-models-migrations"
```php{20,21}
Schema::create('posts', function (Blueprint $table) {
    $table->uuid();
    $table->string('title');
    $table->timestamps();
});

Schema::create('videos', function (Blueprint $table) {
    $table->uuid();
    $table->string('title');
    $table->timestamps();
});

Schema::create('tags', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->timestamps();
});

Schema::create('taggables', function (Blueprint $table) {
    $table->unsignedBigInteger('tag_id');
    $table->uuidMorphs('taggable');
    $table->timestamps();
});
```
:::
::::
