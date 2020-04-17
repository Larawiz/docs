# Per Page

By default, Eloquent Models retrieve 15 records from the database when paginating. Since this is usually a good number for most scenarios, you may want to change that for more or less.

To do that, just use `perPage` key with the number you want using [Custom Models](./#custom-model).

{% tabs %}
{% tab title="YAML" %}
```yaml
models:
  Post:
    columns:
      # ...
    perPage: 30
```
{% endtab %}

{% tab title="Model" %}
```php
class Post extends Model
{
    protected $perPage = 30;
}
```
{% endtab %}

{% tab title="Seeder" %}
```php
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

{% hint style="info" %}
The number of seeds for the [Seeders](seeders.md) is two-and-a-half times the `perPage` value, which defaults to 38 records.
{% endhint %}



