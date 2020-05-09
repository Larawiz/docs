# Seeders

[Seeders](https://laravel.com/docs/seeding) are conveniently created automatically for the model. Just make the model, and the seeder will be automatically created using its key name.

:::: tabs
::: tab "YAML" id="seeders-yaml"
```yaml
models:
  Podcasts:
    # ...
```
:::

::: tab "Seeder" id="seeders-seeder"
```php
<?php

use Illuminate\Database\Seeder;
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
        // ...
    }
}
```
:::
::::

::: warning Factory or yourself
If you have [disabled the factory](factories.md#disabled-factory), you will have to [manually seed the records yourself](https://laravel.com/docs/seeding#writing-seeders) directly to the database.
:::

To disable the seeder creation, use a [Custom Model](./#custom-model) and set the `seeder` as `false`.

```yaml{6}
models:
  Podcast:
    columns:
      # ...

    seeder: false
```

::: tip You decide how to run them
While the database seeders will be created, you will have to manually add them to the `run()` method of your `database/seeds/DatabaseSeeder.php` .

Alternatively, [calling them individually](https://laravel.com/docs/seeding#running-seeders) is also a good idea.
:::

