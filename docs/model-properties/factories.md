# Factories

Factories for Models are created automatically for [Quick Models](../model.md#quick-model) and [Custom Models](../model.md#custom-model).

When creating models, the `HasFactory` trait will be automatically included in the model and documented via its PHPDoc.

::: tip Soft Deletes comes free
Laravel includes the `trashed` state when your model uses [soft-deletes](../model-columns/soft-deletes.md#deleted-factory-state).
:::

```yaml
models:
  Post:
    title: string
    slug: string
    body: longText
    published_at: timestamp nullable
    length: int
    softDeletes: ~
```

```php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * ... 
 * @method static \Database\Factories\PostFactory factory($count = null, $state = [])
 */
class Post extends Model
{
    use HasFactory;
    use SoftDeletes;
    
    // ...
}
```

```php
namespace Database\Factories;

use App\Models\Post;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @implements \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    protected $model = Post::class;

    public function definition()
    {
        throw new \RuntimeException("The factory for model [Post] has no defined attributes yet.");
        // return [
        //     // ...
        // ];
    }
}
```

::: tip I will remember you
Larawiz automatically adds Exceptions to the definition and the factory states, so you can remember to fill the attributes before anything else.
:::

## No Model Factory

You can disable factories by issuing the `factory` key with the `false` value. This will also disable including the `HasFactory` trait in the model.

```yaml{9}
models:
  Post:
    title: string
    body: longText
    published_at: timestamp useCurrent
  
    factory: false
```

::: warning No Factory, no Seeder
If you disable the Factory of the Model, it will also [disable the Seeder](seeders.md) for it.
:::

## Factory States

You can add additional [factory states](https://laravel.com/docs/database-testing#factory-states) by defining a list on the `factory` key with the state names you wish to add.

```yaml{6-8}
models:
  Post:
    title: string
    body: longText
    
    factory:
      - unpublished
      - scheduled
```

```php{6-14,16-24}
public function definition()
{
    // ...
}

public function unpublished()
{
    return $this->state(static function (array $attributes): array {
        throw new \RuntimeException("The factory for model [$model->name] has no defined the [$state] state yet.");
        // return [
        //     // ...
        // ];
    });
}

public function scheduled()
{
    return $this->state(static function (array $attributes): array {
        throw new \RuntimeException("The factory for model [$model->name] has no defined the [$state] state yet.");
        // return [
        //     // ...
        // ];
    });
}
```

States will be created empty with an exception to remember to setting the apropiate attributes.