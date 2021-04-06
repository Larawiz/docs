# Factories

Factories for Models are created automatically for [Quick Models](../model.md#quick-model) and [Custom Models](../model.md#custom-model).

When creating models, the `HasFactory` trait will be automatically included in the model.

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
namespace Database\Factories;

use App\Models\Post;
use Illuminate\Database\Eloquent\Factories\Factory;

class PostFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Post::class;
    
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->faker->name,
            'slug' => $this->faker->slug,
            'body' => $this->faker->body,
            'published_at' => $this->faker->datetime,
            'length' => $this->faker->randomInteger,
        ];
    }
}
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
    id: ~
    title: string
    body: longText
    timestamps: ~
  
    factory: false
```

This will also disable including the `HasFactory` trait in the model.

## Factory States

You can add additional states by defining a list on the `factory` key, which will create new methods for the states you list inside the model factory.

:::: tabs :options="{ useUrlFragment: false }"
::: tab "YAML" id="factories-yaml-2"
```yaml{6-8}
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
```php{6-17,15-22}
public function definition()
{
    // ...
}

public function unpublished()
{
    return $this->state(function (array $attributes) {
        return [
            // TODO: Add attributes for the Post "unpublished" state.
        ]
    });
}

public function scheduled()
{
    return $this->state(function (array $attributes) {
        return [
            // TODO: Add attributes for the Post "scheduled" state.
        ]
    });
}
```
:::
::::

States will be created empty, so you can fill them later with any attribute you need to.

::: tip Soft Deletes comes free
If you're using [soft-deletes](../model-columns/soft-deletes.md#deleted-factory-state), the `deleted` state will be created for free.
:::