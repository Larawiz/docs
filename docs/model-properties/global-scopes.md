# Global Scopes

Sometimes thinking ahead for Global Scopes is a good way to leverage creating and handling database filters dynamically. 

Using [Custom Models](../model.md#custom-model), issue the `scopes` key with a list to generate each automatically, ready to be edited by you.

:::: tabs
::: tab "YAML" id="global-scopes-yaml"
```yaml{6-7}
models:
  Post:
    columns:
      # ...

    scopes:
      - Unpublished
```
:::

::: tab "Scope" id="global-scopes-scope"
```php
<?php

namespace App\Scopes\Post;

use App\Post;
use Illuminate\Database\Eloquent\Scope;
use Illuminate\Database\Eloquent\Builder;

class UnpublishedScope implements Scope
{
    /**
     * Apply the scope to a given Eloquent query builder.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $builder
     * @param  \Illuminate\Database\Eloquent\Model|\App\Post $model
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

::: tip Scope append
When you create a scope, Larawiz will automatically append the `Scope` name to it so you can identify it clearly. So if you use `Unpublished` or `UnpublishedScope`, it will become the latter no matter what.
:::

Each of the scopes will be saved inside the `app/Scopes/{Model}` directory, allowing you to separate each scope by its Model. After that, you're free to add them to your application however you want.