# Pivots Models

Pivot models are easy to do: simply point them out in the relations and Larawiz will automatically change the model ti a Pivot Model or Polymorphic Pivot Model.

{% hint style="danger" %}
When using Pivot Models, **Larawiz will hands-off the pivot to you**, so be sure to add the needed columns and relations so the pivot table can work properly once your project is scaffolded.
{% endhint %}

## Many to Many

If you want to use a Pivot Model, simply create a `belongsToMany` and **add the `using` method in the relation declaration**, pointing the model you want to use as Pivot or Polymorphic Pivot. Yeah, that's it.

{% tabs %}
{% tab title="YAML" %}
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
{% endtab %}

{% tab title="Models" %}
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
{% endtab %}

{% tab title="Migrations" %}
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
{% endtab %}
{% endtabs %}

When you reference a Model as a Pivot, Larawiz will automatically change the type of Model to `Pivot` or `MorphPivot` instead of just `Model` depending on the case.

{% hint style="info" %}
When creating [Pivot models](https://laravel.com/docs/7.x/eloquent-relationships#defining-custom-intermediate-table-models), soft-deleted, primary keys and timestamps are automatically disabled. You can re-enable them using the `primary` and `timestamps` keys or columns, but soft-deletes are bypassed since the framework still doesn't support it, [but it may in the future](https://github.com/laravel/framework/pull/31224).

```yaml
Subscription:
  id: ~
  user: belongsTo:User
  podcast: belongsTo:Podcast
  last_heard: timestamps nullable
  timestamps: ~
```
{% endhint %}

## Polymorphic Pivot Tables

The same goes for Polymorphic pivot tables, and if the models use UUID as primary key, no problem, Larawiz will automatically create a pivot table using `uuidMorphs`.

{% tabs %}
{% tab title="YAML" %}
```yaml
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
    tag: belongsTo:Tag
    taggable: morphTo
    timestmaps: ~
```
{% endtab %}

{% tab title="Models" %}
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
{% endtab %}

{% tab title="Migrations" %}
```php
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
{% endtab %}
{% endtabs %}

