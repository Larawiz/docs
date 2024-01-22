# Seeders

Model [Seeders](https://laravel.com/docs/seeding) are conveniently created when the model [Factory is enabled](factories.md#no-model-factory). If the factory has been disabled, they won't be included.

For starters, Larawiz registers the seeders in your `database/seeds/DatabaseSeeder.php` file, in the order these appear in your blueprint, so you don't have to.

```php
// database/factories/DatabaseSeeder.php

public function run()
{
    $this->call(UserSeeder::class);
    $this->call(PodcastSeeder::class);
    $this->call(SubscriptionSeeder::class);
}
```

Each Model Seeder is supercharged from a custom seeder from Larawiz, to make your development easier. This way you can seed a model separately, skip seeders, and even stop the whole seeding.

The class itself is very self-explanatory, here is an example for a hypothetical `Podcast` model.

```yaml
models:
  Podcasts:
  # ...
```

```php
<?php

namespace Database\Seeders;

use App\Models\Podcast;
use Database\Factories\PodcastFactory;

class PodcastSeeder extends Seeder
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

Your Model Seeder executes all method that start with `seed`, and each method is resolved by the application container to take advantage of Dependency Injection. For example, you may add another seeding procedure for trashed models and call the `Faker` generator for some random text.

```php
use Faker\Generator as Faker;
use Database\Factories\PodcastFactory;

/**
 * Seed some trashed podcasts.
 */
public function seedTrashedPodcasts(PodcastFactory $factory, Faker $faker): void
{
    $factory->trashed()->create([
        'trashed_reason' => $faker->text()
    ]);
}
```

## Returning data

If you return a Model Factory from the seeding method, the Seeder will automatically create the records for you.

```php
use Database\Factories\PodcastFactory;

public function seedCustomPodcasts(PodcastFactory $factory)
{
    return $factory->custom()->state(['coolness' => 'high'])->count(20);
}
```

On the other hand, if you return an Eloquent Collection, it will persist all models and relations on it.

```php
use Database\Factories\PodcastFactory;

public function seedCustomPodcasts(PodcastFactory $factory)
{
    $podcasts = $factory->custom()->makeMany();
    
    // Do something with the podcasts...
    
    return $podcasts;
}
```

Finally, if you return anything that is `iteratable`, like an `array`, `Generator` or Collection, it will be used to _insert_ that data directly into the Seeder model table in one query.

```php
use Faker\Generator as Faker;
use App\Models\Podcast;

protected string $model = Comment::class;

public function seedCommentsDirectlyToDatabase(Faker $faker)
{
    foreach (Podcast::inRandomOrder()->take(500)->lazy() as $podcast) {
        yield ['comment' => $faker->text(), 'podcast_id' => $podcast_id];
    }
}
```

## Transactions

All seeding methods are called within a [Database Transaction](https://laravel.com/docs/database#database-transactions) to avoid ~~the development hell of~~ orphaned or incomplete records when a seeder throws an error in the middle of the operation. It also speeds up seeding under SQLite when using a file-based database by default.

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

You may execute some logic _before_ and _after_ the calling all the seeding methods by just creating the `before()` and `after()` methods, respectively. As with the _seed_ methods, these are resolved by the container, so you can use Dependency Injection.

The `before()` method is a great place to [skip](#skipping-a-seeder) the seeder class or prepare the database beforehand. The `after()` is good to remove unwanted artifacts or just stop if something is not right.

```php
namespace Database\Seeders;

use App\Models\Podcast;
use Database\Factories\PodcastFactory;

class PodcastSeeder extends Seeder
{
    public function before(SomethingCool $cool)
    {
        // If we already made Podcasts with coolness level, skip the seeder.
        if (Podcast::where('coolness', $cool->highestLevel())->exist()) {
            $this->skip();
        }
        
        // Remove all the table data to start from the first ID.
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
}
```

## Skipping a seeder

Sometimes you may have a seeder you want to skip for different reasons, like when some records already exist, or you already run it after a prior seeding run failed.

To stop a seed method and continue to the next, invoke the use `skip()` method or the convenience methods `skipIf()` and `skipUnless()`. If you use an Eloquent Query Builder instance, it will check if there is any existing record for that query.

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

To skip the whole seeder, invoke the `skip()` on the `before()` method. 

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

> Skips everything
> 
> When methods [run within a transactions](#transactions), skipping will _roll back_ all changes made. Instead, divide your logic on more seeders, and put the skipping logic before any database manipulation.

## Calling other seeders with arguments

As you may (correctly) suspect, using `call()` with parameters works differently since the Larawiz Seeder overrides the `run()` call.

Instead, when you pass parameters, these are passed down to all `seed()` methods.

```php{11,17}
use App\Models\User;
use Database\Factories\UserFactory;
use Database\Factories\KarmaFactory;

class UserSeeder extends Seeder
{
    public function seedUser(UserFactory $factory)
    {
        $user = $factory->create()
        
        $this->call(KarmaSeeder::class, ['user' => $user])
    }
}

class KarmaSeeder extends Seeder
{
    public function seedKarma(KarmaFactory $factory, $user)
    {
        $factory->for($user)->times(2)->create(['amount' => $user->karma / 2])
    }
}
```

If you need to pass parameters to specific seeding methods, just issue them with the method name as key and the parameters as an array.

```php{11-13,19}
use App\Models\User;
use Database\Factories\UserFactory;
use Database\Factories\KarmaFactory;

class UserSeeder extends Seeder
{
    public function seedUser(UserFactory $factory)
    {
        $user = $factory->create()
        
        $this->call(KarmaSeeder::class, [
            'seedKarma' => ['user' => $user]
        ])
    }
}

class KarmaSeeder extends Seeder
{
    public function seedKarma(KarmaFactory $factory, User $user)
    {
        $factory->for($user)->times(2)->create(['amount' => $user->karma / 2])
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

I mean, really? I just dumped 150 lines of code to make your development easier, and you dare to disable the seeder? Not cool man, not cool.