# Scopes

Sometimes thinking ahead for Global and Local Scopes is a good way to leverage creating and handling database filters dynamically.

Using [Custom Models](../model.md#custom-model), issue the `scopes` key with a list to generate each automatically, ready to be edited by you:

- To create a [Local Scope](https://laravel.com/docs/eloquent#local-scopes), issue the name in `camelCase`, like `behindPaywall`.
- To create a [Global Scope](https://laravel.com/docs/eloquent#global-scopes), issue the `Capitalized` name, like `Unpublished`.

:::: tabs :options="{ useUrlFragment: false }"
::: tab "YAML" id="scopes-yaml"
```yaml{6-8}
models:
  Post:
    columns:
      # ...

    scopes:
      - behindPaywall
      - Unpublished
```
:::

::: tab "Model" id="scopes-local-scope"
```php{11,17-26}
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

/**
 * ...
 * 
 * @method \Illuminate\Database\Eloquent\Builder behindPaywall()
 */
class Post extends Model
{
   // ...
   
    /**
     * Query scope for "behindPaywall".
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return void
     */
    protected function scopeBehindPaywall(Builder $query)
    {
        // TODO: Code the 'scopeBehindPaywall' scope.
    }
}
```
:::

::: tab "Global Scope" id="scopes-global-scope"
```php
<?php

namespace App\Scopes\Post;

use App\Models\Post;
use Illuminate\Database\Eloquent\Scope;
use Illuminate\Database\Eloquent\Builder;

class UnpublishedScope implements Scope
{
    /**
     * Apply the scope to a given Eloquent query builder.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $builder
     * @param  \Illuminate\Database\Eloquent\Model|\App\Models\Post $model
     * @return void
     */
    public function apply(Builder $builder, Post $post)
    {
        // TODO: Apply builder methods to the UnpublishedScope scope.
    }

    /**
     * Extend the query builder with per-instance macro callables.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $builder
     * @return void
     */
    public function extend(Builder $builder)
    {
        // Add methods to the builder instance if needed.
    }
}
```
:::
::::

::: tip No need to add "scope" to the scopes
When you create a local scope, Larawiz will automatically append the `scope` name to the class method, and add it to the PHPDoc. For example, if you set `behindPaywall` or `scopeBehindPaywall`, it will become the latter no matter what.

Same goes for a global scope; the `Scope` name will be appended to the class, so `Unpublished` will become `UnpublishedScope`.
:::

Global Scopes will be saved inside the `app/Scopes/{Model}` directory, allowing you to separate each scope by its Model, or reuse them.

Since you can do amazing things with Global Scopes, like applying them at runtime, Larawiz won't add it to your model, [but you can apply the Global Scope manually](https://laravel.com/docs/eloquent#applying-global-scopes).