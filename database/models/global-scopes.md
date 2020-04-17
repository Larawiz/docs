# Global Scopes

Sometimes thinking ahead for Global Scopes is a good way to leverage creating and handling them in the model itself. 

Using [Custom Models](./#custom-model), issue the `scopes` key with a list to generate each automatically, ready to be edited by you.

{% tabs %}
{% tab title="YAML" %}
```yaml
models:
  Post:
    columns:
      # ...
    scopes:
      - Unpublished
```
{% endtab %}

{% tab title="Scope" %}
{% code title="app/Scopes/Post/UnpublishedScope.php" %}
```php
<?php

namespace App\Scopes\Post;

use Illuminate\Database\Eloquent\Scope;
use Illuminate\Database\Eloquent\Model;
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
    public function apply(Builder $builder, Model $model)
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
{% endcode %}
{% endtab %}
{% endtabs %}

Each of the scopes are saved inside the `app/Scopes` directory, allowing you to separate each scope by its Model. After that, you're free to add them to your application however you want.

{% hint style="danger" %}
Local scopes are not supported in Larawiz... yet. But probably won't ever to avoid cluttering up the YAML file.
{% endhint %}

