# Factories

Factories for Models are created automatically for [Quick Models](./#quick-model) and [Custom Models](./#custom-model).

{% tabs %}
{% tab title="YAML" %}
```yaml
models:
  Post:
    title: string
    slug: string
    body: longText
    published_at: timestamp nullable
    length: int
```
{% endtab %}

{% tab title="Factory" %}
```php
$factory->define(Post::class, function (Faker $faker) {
    return [
        'title' => $faker->name,
        'slug' => $faker->slug,
        'body' => $faker->body,
        'published_at' => $faker->datetime,
        'length' => $faker->randomInteger,
    ];
});
```
{% endtab %}
{% endtabs %}

{% hint style="warning" %}
Larawiz will try to guess the `Faker` values for each property by using the name of the column, but in any case you should go to your factory and check them manually just to be sure.
{% endhint %}

You can disable factories by issuing the `factory` key with the `false` value. You can do this directly below the Model definition of a [Quick Model](./#quick-model) or [Custom Model](./#custom-model).

```yaml
models:
  User:
    name: string
    password: string
    factory: false
  
  Post:
    columns:
      id: ~
      title: string
      body: longText
      timestamps: ~
    factory: false
```

You can add additional states by defining a list on the `factory` key:

{% tabs %}
{% tab title="YAML" %}
```yaml
Post:
  title: string
  body: longText
  factory:
    - unpublished
    - scheduled
```
{% endtab %}

{% tab title="Factory" %}
```php
$factory->define(Post::class, function (Faker $faker) {
    // ...
});

$factory->state(Post::class, 'unpublished', [
    // TODO: Add attributes for the Post "unpublished" state.
]);

$factory->state(Post::class, 'scheduled', [
    // TODO: Add attributes for the Post "scheduled" state.
]);
```
{% endtab %}
{% endtabs %}

States will be created empty so you can fill them later.

