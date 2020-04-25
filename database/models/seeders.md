# Seeders

[Seeders](https://laravel.com/docs/7.x/seeding) are conveniently created automatically for the model. Just make the model, and the seeder will be automatically created using its key name.

{% tabs %}
{% tab title="YAML" %}
```yaml
models:
  Podcasts:
    # ...
```
{% endtab %}

{% tab title="Seeder" %}
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
{% endtab %}
{% endtabs %}

{% hint style="warning" %}
If you have [disabled the factory](factories.md), you will have to [manually seed the records yourself](https://laravel.com/docs/7.x/seeding#writing-seeders) directly to the database.
{% endhint %}

To disable the seeder creation, use a [Custom Model](./#custom-model) and set the `seeder` as `false`.

```yaml
models:
  Podcast:
    columns:
      # ...

    seeder: false
```

{% hint style="info" %}
While the database seeders will be created, you will have to manually add them to the `run()` method of your `database/seeds/DatabaseSeeder.php` . Alternatively,  [calling them individually](https://laravel.com/docs/7.x/seeding#running-seeders).
{% endhint %}

