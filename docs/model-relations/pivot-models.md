# Pivots Models

[Intermediate table models](https://laravel.com/docs/eloquent-relationships#defining-custom-intermediate-table-models), also called Pivot Models, are easy to do: simply point them out in the relations and Larawiz will automatically change the model type to a Pivot Model or Polymorphic Pivot Model, and add the corresponding migration.

::: danger Finish that spell 
Always point the Pivot Model on **all relations**. If one relation is missing the pivot model, Larawiz will understand you will be using automatic pivot tables for that relation, and you will end up with an additional table.
:::

## Many-to-Many Pivot Models

If you want to use a Pivot Model, simply create a `belongsToMany` and **add the pivot model in ALL the relations** as second parameter, or through `using`.

```yaml{4,8,10-13}
models:
  User:
    name: string
    subscriptions: belongsToMany:Podcast using:Subscription
  
  Podcast:
    title: string
    subscribers: belongsToMany:User,Subscription # Same effect
  
  Subscription:
    user: belongsTo
    podcast: belongsTo
    last_heard: timestamp nullable
```

```php{5-6,14-15,19-32}
class User extends Model
{
    public function subscriptions()
    {
        return $this->belongsToMany(Podcast::class, Subscription::class);
    }
}

class Podcast extends Model
{
    public function subscribers()
    {
        return $this->belongsToMany(User::class, Subscription::class);
    }
}

class Subscription extends Pivot
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

```php{11-15}
Schema::create('users', function (Blueprint $table) {
    $table->id();
    $table->string('name');
});

Schema::create('podcasts', function (Blueprint $table) {
    $table->id();
    $table->string('name');
});

Schema::create('podcast_user', function (Blueprint $table) {
    $table->foreignIdFor(Podcast::class);
    $table->foreignIdFor(User::class);
    $table->timestamps();
});
```

### Table names

When using Pivot Models for a `belongsToMany` relation, pivot tables will be created using Laravel conventions, regardless of the Model name you have set.

To override the table name, [declare the table name manually](../model-properties/table.md):

```yaml{9}
models:
  User:
    podcasts: belongsToMany using:PodcastUser
  Podcast:
    users: belongsToMany using:PodcastUser
  Subscription:
    user: belongsTo
    podcast: belongsTo
    table: subscriptions
```

```php{21}
class User extends Model
{
    public function podcasts()
    {
        return $this->belongsToMany(Podcast::class, 'subscriptions')
                    ->using(PodcastUser::class);
    }
}

class Podcast extends Model
{
    public function users()
    {
        return $this->belongsToMany(User::class, 'subscriptions')
                    ->using(PodcastUser::class);
    }
}

class Subscription extends Pivot
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

```php{1}
Schema::create('subscriptions', function (Blueprint $table) {
    $table->bigUnsignedInteger('user_id');
    $table->bigUnsignedInteger('podcast_id');
    $table->timestamps();
});
```

## Polymorphic Many-to-Many Pivot Models

You may also use Polymorphic Pivot Models in the same way.

For example, here all related models use UUID, but the tag itself uses an integer as primary key. Here the `Taggable` model will be changed automatically to `MorphPivot`. Since Larawiz will guess that all models that reference a `taggables.tagable` are UUID, it will create a `uuidMorphs()` column automatically.

```yaml{18-19}
models:
  Post:
    id: uuid
    title: string
    tags: morphToMany:Tag,taggable using:Taggable

  Video:
    id: uuid
    name: string
    tags: morphToMany:Tag,taggable using:Taggable

  Tag:
    name: string
    posts: morphedByMany:Post,taggable
    videos: morphedByMany:Video,taggable
    
  Taggable:
    tag: belongsTo
    taggable: morphTo
    timestamps: ~
```

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

```php{20,21}
Schema::create('posts', function (Blueprint $table) {
    $table->uuid('id')->primary();
    $table->string('title');
    $table->timestamps();
});

Schema::create('videos', function (Blueprint $table) {
    $table->uuid('id')->primary();
    $table->string('title');
    $table->timestamps();
});

Schema::create('tags', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->timestamps();
});

Schema::create('taggables', function (Blueprint $table) {
    $table->foreignIdFor(Tag::class);
    $table->uuidMorphs('taggable');
    $table->timestamps();
});
```

::: tip Don't repeat yourself
As long as one relation sets the pivot model with `using`, the pivot will be created. There is no need to declare `using` on all models, buy you may if you need to access the pivot table anyway.
:::

## Adding primary keys and timestamps

When creating [Pivot models](https://laravel.com/docs/eloquent-relationships#defining-custom-intermediate-table-models), Primary Keys and Timestamps are disabled.

You can re-enable Primary Keys and Timestamps using the `primary` and `timestamps` keys, respectively.

```yaml
models:
  User:
    subscriptions: belongsToMany:Podcast using:Subscription withTimestamps withPivot:last_heard
    # ...
  Podcast:
  # ...

  Subscription:
    id: ~ # Re-enabled
    user: belongsTo:User
    podcast: belongsTo:Podcast
    last_heard: timestamps nullable
    timestamps: ~ # Re-enabled
```

 

```php
class Subscription extends Pivot
{
    public $incrementing = true;
    protected $casts = ['last_heard' => 'timestamp'];
    
    // ...
}
```

You can also create your own Pivot model, or a Morphable Pivot model, without any relation pointing to it. Set the `type` key to `pivot` or `morphPivot`, respectively, through a [Custom Model](../model.md#custom-model).

```yaml{12}
models:
  User:
    # ...
  
  Podcast:
    # ...
  
  Subscription:
    columns:
      user: belongsTo
      podcast: belongsTo
    type: pivot
```

```php
class Subscription extends Pivot
{
    // ...
}
```

::: warning No soft-deletes
Pivots models do not support soft-deletes.

Declaring `softDeletes: ~` in the Pivot Model doesn't do anything, but there is a very low chance Larawiz will summon you into a Nickelback concert.
:::
