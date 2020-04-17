# Seeders

Seeders are conveniently created automatically for the model. The seeder always instruct to create two and a half pages of the model in the database.

{% tabs %}
{% tab title="YAML" %}
```yaml
Podcasts:
  # ...
```
{% endtab %}

{% tab title="Seeder" %}
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
{% endtab %}
{% endtabs %}

{% hint style="warning" %}
If you have disabled the factory, you will have to [manually seed the records yourself](https://laravel.com/docs/7.x/seeding#writing-seeders). 
{% endhint %}

To disable the seeder creation, use a [Custom Model](./#custom-model) and set the `seeder` as `false`.

```yaml
Podcast:
  columns:
    # ...
  seeder: false
```

{% hint style="info" %}
While the database seeders will be created, you will have to manually add them to the `run()` method of your `database/seeds/DatabaseSeeder.php` . Alternatively,  [calling them individually](https://laravel.com/docs/7.x/seeding#running-seeders).
{% endhint %}

