# Seeders

[Seeders](https://laravel.com/docs/seeding) are conveniently created automatically for the model if their [Factory is enabled](factories.md#no-model-factory), otherwise they won't be created.

Larawiz will register the seeders in your `database/seeds/DatabaseSeeder.php` in the order these appear in your blueprint, so you won't have to register them manually.

```php
// database/factories/DatabaseSeeder.php

public function run()
{
    $this->call(UserSeeder::class);
    $this->call(PodcastSeeder::class);
    $this->call(SubscriptionSeeder::class);
}
```

Larawiz ships with a supercharged seeder made to make your development easier, and each seeder extends that.

Seeding works _better_ than the Laravel version by calling all public methods that start with `seed`, and in the order these appear in the class.

The class itself is very self-explanatory, here is an example for a hypothetical `Podcast` model.

```yaml
models:
  Podcasts:
  # ...
```

```php
<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use App\Models\Podcast;
use Database\Factories\PodcastFactory;

/**
 * This seeder will run all methods that start with 'seed'.
 *
 * @extends \Database\Seeders\BaseSeeder<\App\Models\Podcast>
 */
class PodcastSeeder extends BaseSeeder
{
    /**
     * The model that creates the factory.
     *
     * @var class-string<\App\Models\Podcast>
     */
    protected string $model = Podcast::class;
    
    /**
     * Seed the database with new records.
     */
    public function seed(PodcastFactory $factory): void
    {
        $factory->count($this->pages(2.5))->create();
    }
}
```

Each `seed` method is resolved by the application container, so you can get use Dependency Injection to get anything you need. For example, we can later create a seeder for deleted podcasts.

```php
use Faker\Generator as Faker;
use Database\Factories\PodcastFactory;

/**
 * Seed some trashed podcasts.
 */
public function seedTrashedPodcasts(PodcastFactory $factory, Faker $faker): void
{
    $factory->trashed()->create([
        'excerpt' => $faker->text()
    ]);
}
```

## Return

If you return a factory from the `seed` method, the Seeder will automatically create the records for you.

```php
use Database\Factories\PodcastFactory;

public function seedCustomPodcasts(PodcastFactory $factory)
{
    return $factory->custom()->state(['coolness' => 'high'])->count(20);
}
```

If you return an Eloquent Collection, it will persist all models on it:

```php
use Database\Factories\PodcastFactory;

public function seedCustomPodcasts(PodcastFactory $factory)
{
    $podcasts = $factory->custom()->makeMany();
    
    // Something with the podcasts...
    
    return $podcasts;
}
```

Finally, if you return anything that is `iteratable`, from an `array` to a `Generator`, it will be used to _insert_ that data directly into the Seeder model table in one query.

```php
use Faker\Generator as Faker;
use App\Models\Podcast;

protected string $model = Comment::class;

public function seedComments(Faker $faker)
{
    foreach (Podcast::inRandomOrder()->take(500)->lazy() as $podcast) {
        yield ['comment' => $faker->text(), 'podcast_id' => $podcast_id];
    }
}
```

## Transactions

All `seed` methods are called within a [Database Transaction](https://laravel.com/docs/database#database-transactions). This to avoids the development hell of orphaned or incomplete records when a seeder throws an error. It also speeds up seeding under SQLite.

If you don't want to run transactions at all, set the `$transactions` property to false.

```php
/**
 * If the seeder should use transactions.
 *
 * @var bool|null
 */
protected bool $transactions = false;
```

## Before & After

You may call a method _before_ and _after_ the seeding by just creating them as `before()` and `after()`, respectively. As with the _seed_ methods, these are resolved by the container, so you can use Dependency Injection.

The `before()` method is a great place to make checks or prepare the database beforehand, while the `after()` is a good place to remove artifacts or check everything when right.

```php
use App\Models\Podcast;

public function before(SomethingCool $cool)
{
    // If we already made Podcasts with coolness level, skip the seeder.
    if (Podcast::where('coolness', $cool->highestLevel())->exist()) {
        $this->skip();
    }
    
    // Remove all the table data
    Podcast::query()->truncate();
}

public function after()
{
    // Check if the podcasts were created as we expect, bail if not
    if (Podcast::whereNull('cool_index')->exist()) {
        throw new RuntimeException('Podcasts with no cool index were created!');
    }
    
    // Remove all podcasts that have a banned author
    Podcast::whereHas('author', fn($query) => $query->whereNotNull('banned_at'))->delete();
}
```

## Skipping a seeder

Sometimes you may have a seeder you want to skip for different reasons, like when some records already exist, or you already run it after a prior seeding run failed.

To stop a seed method and continue to the next, invoke the use `skip()` method or the convenience methods `skipIf()` and `skipUnless()`. If you use the Eloquent Query Builder instance, it will automatically check if a record exists as condition.

```php
use App\Models\Podcast;

public function seedTrashedPodcasts(PodcastFactory $factory)
{
    // If there is already trashed podcasts, skip.  
    if (Podcast::whereNotNull('deleted_at')->exist()) {
        $this->skip();
    }
    
    // Or simplified...
    $this->skipIf(Podcast::whereNotNull('deleted_at'));
}
```

To skip the whole seeder, invoke the `skip` on the `before()` method. 

```php
use Illuminate\Support\Facades\DB;

public function before()
{
    // Skip the seeding entirely if there is any record on the table.
    if (DB::table('podcasts')->exists()) {
        $this->skip();
    }
}
```

## No Model Seeder

To disable the seeder for a given model, set the `seeder` as `false`.

```yaml{5}
models:
  Podcast:
    # ...

    seeder: false
```