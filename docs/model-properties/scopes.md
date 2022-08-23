# Scopes

Sometimes thinking ahead for Global and Local Scopes is a good way to leverage creating and handling database filters dynamically.

Using [Quick Models](../model.md#quick-model) or [Custom Models](../model.md#custom-model), issue the `scopes` key with a list to generate each automatically, ready to be edited by you:

- To create a [Local Scope](https://laravel.com/docs/eloquent#local-scopes), issue the name in `camelCase`, like `behindPaywall`.
- To create a [Global Scope](https://laravel.com/docs/eloquent#global-scopes), issue a `Capitalized` name, like `Unpublished`.

```yaml{8-10}
models:
  Post:
    title: string
    body: string
    is_paywalled: bool default:false
    published_at: timestamp

    scopes:
      - behindPaywall
      - Unpublished
```

```php{11,17-26}
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

/**
 * ...
 * 
 * @method \Illuminate\Database\Eloquent\Builder|static behindPaywall()
 */
class Post extends Model
{
   // ...
   
    /**
     * Query scope for "behindPaywall".
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    protected function scopeBehindPaywall(Builder $query): Builder
    {
        // TODO: Add the 'scopeBehindPaywall' scope.
    }
}
```

```php
<?php

namespace App\Scopes;

use App\Models\Post;
use Illuminate\Database\Eloquent\Scope;
use Illuminate\Database\Eloquent\Builder;

class UnpublishedScope implements Scope
{
    public function apply(Builder $builder, Post $post)
    {
        // TODO: Apply builder methods to the UnpublishedScope scope.
    }

    public function extend(Builder $builder)
    {
        // TODO: Add methods to the builder instance if needed.
    }
}
```

::: tip No need to add "scope" to the scopes
Larawiz automatically:

- starts your **Local Scope** with the `scope` string, and,
- finishes your **Global Scope** with the `Scope` string.

This saves critical keystrokes that you can use in development. 
:::

Global Scopes will be saved inside the `app/Scopes` directory, allowing to reuse them across multiple Models in your app blueprint.

```yaml
models:
  Post:
    # ...
    scopes:
      - Unpublished

  Article:
    # ...
    scopes:
      - Unpublished
```

Since you can do amazing things with Global Scopes, like applying them at runtime, Larawiz won't add it to your model, [but you can apply the Global Scope manually](https://laravel.com/docs/eloquent#applying-global-scopes).