# Pivot tables

Larawiz will [guess pivot tables if you don't issue them](../models/relations/pivots.md), along with columns needed to reach each model of the `belongsToMany` and `morphsToMany` relations. So there is **no need to create migrations for pivot columns**.

While migrations with the same table name of Models will throw an error so you can make your mind , like a `Post` model and a `posts` table, migrations for pivot models can be safely overwritten.

In this example, we will set the `podcast_user` pivot table and manually add the columns we need.

{% tabs %}
{% tab title="YAML" %}
```yaml
models:
  User:
    name: string
    subscriptions: belongsToMany:Podcast

  Podcast:
    title: string
    subscribers: belongsToMany:User
  
migrations:
  podcast_user:
    podcast_id: unsignedBigInteger
    user_id: unsignedBigInteger index
    last_heard: timestamp nullable
    timestamps: ~
```
{% endtab %}

{% tab title="Models" %}
```php
class User extends Model
{
    public function subscriptions()
    {
        return $this->belongsToMany(Podcast::class)
                    ->as('subscription')
                    ->withTimestamps()
                    ->withPivot('last_heard');
    }
}

class Podcast extends Model
{
    public function subscribers()
    {
        return $this->belongsToMany(User::class)
                    ->as('subscription');
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

Schema::create('podcasts'), function (Blueprint $table) {
    $table->id();
    $table->string('title');
});

// Pivot table overriden by developer.
Schema::create('podcast_user', function (Blueprint $table) {
    $table->unsignedBigInteger('podcast_id');
    $table->unsignedBigInteger('user_id');
    $table->timestamp('last_heard')->nullable();
    $table->timestamps();
});
```
{% endtab %}
{% endtabs %}

{% hint style="warning" %}
When you overwrite a pivot table migration, ensure you set the relation columns correctly.
{% endhint %}

The same concept applies for automatic polymorphic pivot columns:

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

migrations:
  taggables:
    id: ~
    tag_id: unsignedBigInteger
    taggable: nullableMorphs
    timestamps: ~
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

// Pivot table overriden by developer.
Schema::create('taggables', function (Blueprint $table) {
    $table->id();
    $table->unsignedBigInteger('tag_id');
    $table->morphs('taggable');
    $table->timestamps();
});
```
{% endtab %}
{% endtabs %}

