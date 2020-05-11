# Factories

Factories for Models are created automatically for [Quick Models](../model.md#quick-model) and [Custom Models](../model.md#custom-model).

:::: tabs :options="{ useUrlFragment: false }"
::: tab "YAML" id="factories-yaml"
```yaml
models:
  Post:
    title: string
    slug: string
    body: longText
    published_at: timestamp nullable
    length: int
```
:::

::: tab "Factory" id="factories-factory"
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
:::
::::

::: warning Always check the factory
Larawiz will try to guess the `Faker` values for each property by using the name of the column, but in any case you should go to your factory and check them manually just to be sure.
:::

## Disabled Factory

You can disable factories by issuing the `factory` key with the `false` value. You can do this directly below the Model definition of a [Custom Model](../model.md#custom-model).

```yaml{9}
models:
  Post:
    columns:
      id: ~
      title: string
      body: longText
      timestamps: ~
  
    factory: false
```

You can add additional states by defining a list on the `factory` key:

:::: tabs :options="{ useUrlFragment: false }"
::: tab "YAML" id="factories-yaml-2"
```yaml{5-7}
models:
  Post:
    title: string
    body: longText
    factory:
      - unpublished
      - scheduled
```
:::

::: tab "Factory" id="factories-factory-2"
```php{5-7,9-11}
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
:::
::::

States will be created empty so you can fill them later.

::: tip Soft Deletes comes free
If you're using [soft-deletes](../model-columns/soft-deletes.md#deleted-factory-state), the `deleted` state will be created for free.
:::