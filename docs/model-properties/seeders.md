# Seeders

[Seeders](https://laravel.com/docs/seeding) are conveniently created automatically for the model if their [Factory is enabled](factories.md#no-model-factory), otherwise it won't be created.

Larawiz ships with a seeder full of convenient tools, so you may not need to change anything but some arguments. The class itself is very self-explanatory, here is an example for a hypothetical `Podcast` model.

```yaml
models:
  Podcasts:
  # ...
```

```php
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Podcast;

class PodcastSeeder extends Seeder
{
    /**
     * Run the database seeder.
     *
     * @return void
     */
    public function run()
    {
        $this->before();
        
        // Transactions will avoid lingering records and speed up SQLite.
        DB::transaction($this->createRecords(...));
        DB::transaction($this->createStates(...));
        DB::transaction($this->createAdditionalRecords(...));
        
        $this->after();
    }
    
    /**
     * Run before seeding the database.
     * 
     * @return void
     */
    protected function before()
    {
        // ...
    }
    
    /**
     * Populate the model records using the factory definition.
     *
     * @return void
     */
    protected function createRecords()
    {
        // This makes 2 and a half pages of your model. You can change it if you want.
        $amount = (int) ((new Podcast())->getPerPage() * 2.5);
        
        Podcast::factory()->times($amount)->create();
    }
    
    /**
     * Creates additional records to populate the database.
     *
     * @return void
     */
    protected function createAdditionalRecords()
    {
        // This method is a convenient way to add personalized records.
        //
        // Podcast::factory()->create(['name' => 'John Doe']);
    }
    
    /**
     * Creates additional records by using states.
     *
     * @return void
     */
    protected function createStates()
    {
        // Add here any states you want to make.
        //
        // Podcast::factory()->times(10)->myAwesomeState()->create();
    }
    
    /**
     * Run after seeding the database.
     * 
     * @return void
     */
    protected function after()
    {
        // ...
    }
}
```

If you didn't get the gist, is very simple to understand.

* The `before()` and `after()` methods run before and after the seeding, respectively. You can use them to create parent models, or call another seeder.
* The `createRecords()` can be used to create records normally.
* The `createAdditionalRecords()` can be used to create custom records.
* The `createStates()` can be used to create custom states.

The `create` methods are invoked through a [Database Transaction](https://laravel.com/docs/database#database-transactions) to avoid creating orphaned models when there is any error. It also speeds up seeding under SQLite.

Of course these are just suggestions. You're free to change, add and remove whatever you see fit. 

::: tip Everything but the kitchen sink
Larawiz will register the seeders in your `database/seeds/DatabaseSeeder.php` in the order these appear in your blueprint.

```php
// database/factories/DatabaseSeeder.php

public function run()
{
    $this->call(UserSeeder::class);
    $this->call(PodcastSeeder::class);
    $this->call(SubscriptionSeeder::class);
}
```
:::


## No Model Seeder

To disable the seeder for a given model, set the `seeder` as `false`.

```yaml{5}
models:
  Podcast:
    # ...

    seeder: false
```

