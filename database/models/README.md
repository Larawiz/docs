# 📦 Models

Models are named by the key name in singular. Table migrations are created automatically using studly case on plural.

For example, `GameLeaderboard` will make a table called `game_leaderboards`, without needing to set the table manually.

{% tabs %}
{% tab title="YAML" %}
```yaml
models:
  GameLeaderboard:
    # ...
```
{% endtab %}

{% tab title="Model" %}
{% code title="app\\GameLeaderboard.php" %}
```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GameLeaderboard extends Model
{
    // ...
}
```
{% endcode %}
{% endtab %}

{% tab title="Migration" %}
{% code title="database/migrations/2020\_01\_01\_123000\_create\_game\_leaderboards\_table.php" %}
```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGameLeaderboardsTable extends Migration
{
    /**
     * Run the migrations.
     *
     *
     * @return void
     */
    public function up()
    {
        Schema::create('game_leaderboards', function (Blueprint $table) {
            // ... 
        });
    }

    /**
     * Reverse the migrations.
     *
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('game_leaderboards');
    }
}        
```
{% endcode %}
{% endtab %}
{% endtabs %}

When creating a model, the following logic will be automated for you:

* [Attribute Casting ](https://laravel.com/docs/7.x/eloquent-mutators#attribute-casting)their appropriate type \(strings, integers, floats...\).
* [Mutating dates columns](https://laravel.com/docs/7.x/eloquent-mutators#date-mutators) as `date` and `datetime`.
* [Creating relationships](https://laravel.com/docs/7.x/eloquent-relationships) methods and pivot tables, if necessary.
* PHPDoc mixin for Eloquent Builder, `create` and `make` methods among others \(`find`, `firstOrNew`, etc\)
* PHPDoc blocks for model properties and relations.
* [Migrations](../migrations-1.md), [factories](factories.md) and [seeders](seeders.md).

## Quick model

Quick models are the preferred way to create a model. Just issue the columns directly below the model and you're set.

{% tabs %}
{% tab title="YAML" %}
```yaml
models:
  User:
    name: string
    password: string
    email: string
    email_verified_at: timestamp nullable
    softDeletes: ~
    posts: hasMany:Post
  
  Post:
    uuid: ~
    author: belongsTo:User
    title: string
    excerpt: string nullable
    body: longText
    published_at: timestampTz useCurrent nullable
    timestampsTz: ~
```
{% endtab %}

{% tab title="Models" %}
```php
class User extends Authenticatable
{
    uses SoftDeletes;
    uses Notifiable;

    protected $fillable = [
        'name',
        'password',
        'email',
    ];

    public function posts()
    {
        return $this->hasMany(Post::class);
    }   
}

class Post extends Model
{
    protected $primary = 'uuid';
    protected $keyType = 'string';
    protected $incrementing = false;

    protected $fillable = [
        'title',
        'excerpt',
        'body',
    ];

    public function author()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
```
{% endtab %}

{% tab title="Factory" %}
```php
$factory->define(User::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'password' => "$2y$12$3stGkQNBgw6UF0gAepE.mebtZ/ZVDDxJdXJKrdmbW/dkXAMjNyL1e", // "secret"
        'email' => $faker->email,
    ];
});

$factory->define(Post::class, function (Faker $faker) {
    return [
        'user_id' => $faker->randomNumber(),
        'title' => $faker->title,
        'excerpt' => $faker->paragraph,
        'body' => $faker->realText(),
        'published_at' => $faker->dateTime,
    ];
});
```
{% endtab %}

{% tab title="Migrations" %}
```php
Schema::create('users', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->string('password');
    $table->string('email');
    $table->timestamp('email_verified_at')->nullable();
    $table->timestamps();
    $table->softDeletes();
});

Schema::create('posts', function (Blueprint $table) {
    $table->uuid();
    $table->unsignedBigInteger('user_id');
    $table->string('title');
    $table->string('excerpt')->nullable();
    $table->longText('body');
    $table->timestampTz('published_at')->useCurrent()->nullable();
    $table->timestampsTz();
    
    $table->primary('uuid');
});
```
{% endtab %}
{% endtabs %}

When using the columns names directly, Larawiz will understand the following:

* Use auto-incrementing `id` as [primary key](columns/primary-key.md), or `uuid` if the latter is present.
* If it has `password` or `rememberToken`, it will be considered as an [User model](users.md).
* Use [timestamps](columns/timestamps.md), alternatively swapped with `timestampsTz` manually.
* Use a [Factory](factories.md) and [Seeder](seeders.md).
* Make fillable everything except **booleans**, [timestamps](columns/timestamps.md), [soft-deletes](columns/soft-deletes.md) and [primary keys](columns/primary-key.md).

{% hint style="info" %}
Note that columns for `date`, `datetime`, `time` , and their timezone variants, are considered fillable.
{% endhint %}

## Custom Model

Some models may need some non-standard configuration. For example, let's say this `Podcast` model uses different primary key, a limited set of fillable attributes, and some factory states.

To do that, we need only to put the columns inside the `columns` key, so we can separate the other values for the model.

{% tabs %}
{% tab title="YAML" %}
```yaml
namespace: App\Models

models:
  Podcast:
    columns: 
      title: string
      excerpt: string
      show: belongsTo:Show,show_uuid
      subscribers: hasMany:User withDefault
      published_at: timestamp nullable useCurrent
      timestamps: ~
      softDeletes: ~
    perPage: 20
    primary: title
    fillable:
      - title
      - excerpt
    factory:
      - unpublished
      - scheduled
```
{% endtab %}

{% tab title="Model" %}
{% code title="app\\Models\\Podcast.php" %}
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Podcast
 *
 * @package App\Models
 *
 * @mixin \Illuminate\Database\Eloquent\Builder
 * @method static App\Models\Podcast create($attributes = [])
 * @method static App\Models\Podcast make($attributes = [])
 * @method static App\Models\Podcast firstOrCreate(array $attributes, array $values = [])
 * @method static App\Models\Podcast firstOrNew(array $attributes = [], array $values = [])
 * @method static App\Models\Podcast firstOr($columns = ['*'], Closure $callback = null)
 * @method static App\Models\Podcast firstWhere($column, $operator = null, $value = null, $boolean = 'and')
 * @method static App\Models\Podcast updateOrCreate(array $attributes, array $values = [])
 * 
 * @property-read \App\Models\Show $show
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\User[] $subscribers
 *  
 * @property string $show_uuid
 * @property string $title
 * @property string $excerpt
 * @property \Illuminate\Support\Carbon|null $published_at
 * 
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 */
class Podcast extends Model
{
    use SoftDeletes;

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'title';

    /**
     * The "type" of the primary key ID.
     *
     * @var string
     */
    protected $keyType = 'string';

    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = false;

    /**
     * The number of models to return for pagination.
     *
     * @var int
     */
    protected $perPage = 20;

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = [
        'published_at',
    ];
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['title', 'excerpt'];
    
    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo|\App\Models\Show
     */
    public function show()
    {
        return $this->belongsTo(Show::class);
    }
    
    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany|\App\Models\User 
     */
    public function subscribers()
    {
        return $this->hasMany(User::class);
    }
}
```
{% endcode %}
{% endtab %}

{% tab title="Migration" %}
{% code title="database/migrations/2020\_04\_01\_123000\_create\_podcasts\_table.php" %}
```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePodcastsTable extends Migration
{
    /**
     * Run the migrations.
     *
     *
     * @return void
     */
    public function up()
    {
        Schema::create('podcasts', function (Blueprint $table) {
            $table->string('title');
            $table->string('excerpt');
            $table->unsignedBigInteger('show_uuid');
            $table->unsignedBigInteger('length');
            $table->timestamp('published_at')->nullable()->useCurrent();
            $table->timestamps();
            $table->softDeletes();
            
            $table->primary('title');
        });
    }

    /**
     * Reverse the migrations.
     *
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('podcasts');
    }
}

```
{% endcode %}
{% endtab %}

{% tab title="Factory" %}
{% code title="database/factories/PodcastFactory.php" %}
```php
<?php

use App\Models\Podcast;
use Faker\Generator as Faker;

/** @var \Illuminate\Database\Eloquent\FactoryBuilder $factory */
$factory->define(Podcast::class, function (Faker $faker) {
    return [
        'title' => $faker->title,
        'excerpt' => $faker->body,
        'length' => $faker->randomDigitNotNull,
        'published_at' => $faker->dateTime,
    ];
});

$factory->state(Podcast::class, 'unpublished', [
    // ...
]);

$factory->state(Podcast::class, 'scheduled', [
    // ...
]);
```
{% endcode %}
{% endtab %}

{% tab title="Seeder" %}
{% code title="database/seedes/PodcastSeeder.php" %}
```php
<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\Podcast;

class PodcastSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $twoAndHalfPages = ceil(Podcast::make()->getPerPage() * 2.5);
    
        factory(Podcast::class, $twoAndHalfPages)->create();
    }
}
```
{% endcode %}
{% endtab %}
{% endtabs %}

{% hint style="info" %}
When using Custom Models:

* [Primary key](columns/primary-key.md) guessing is limited to only checking the `id` key existence, the `uuid`  won't be considered as primary but another column type.
* [Timestamps](columns/timestamps.md) must be issued manually.
* [User model](users.md) must be set manually.
* [Fillable properties](fillable.md) can be completely overridden.
{% endhint %}

If you want more simplicity, you can use [Quick Models](./#quick-model) in any model, saving you time.

