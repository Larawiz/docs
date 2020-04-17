# Eloquent Observers

And finally, you can also create an [Observer](https://laravel.com/docs/7.x/eloquent#observers) for all Eloquent operations over the model, which may come handy. Using a Custom Model, set the `observer` key to `true`.

Larawiz will automatically create an observer based on the Model name, by just calling the appropriate artisan command.

{% tabs %}
{% tab title="YAML" %}
```yaml
Post:
  columns:
    # ...
  observer: true
```
{% endtab %}

{% tab title="Observer" %}
{% code title="app\\Observers\\PostObserver.php" %}
```php
<?php

namespace App\Observers;

use App\Post;

class PostObserver
{
    /**
     * Handle the Post "created" event.
     *
     * @param  \App\Post  $post
     * @return void
     */
    public function created(Post $post)
    {
        //
    }

    /**
     * Handle the Post "updated" event.
     *
     * @param  \App\Post  $post
     * @return void
     */
    public function updated(Post $post)
    {
        //
    }

    /**
     * Handle the Post "deleted" event.
     *
     * @param  \App\Post  $post
     * @return void
     */
    public function deleted(Post $post)
    {
        //
    }

    /**
     * Handle the Post "restored" event.
     *
     * @param  \App\Post  $post
     * @return void
     */
    public function restored(Post $post)
    {
        //
    }

    /**
     * Handle the Post "force deleted" event.
     *
     * @param  \App\Post  $post
     * @return void
     */
    public function forceDeleted(Post $post)
    {
        //
    }
}

```
{% endcode %}
{% endtab %}
{% endtabs %}

The above will create the observer in the `app\Observers` directory.

{% hint style="info" %}
Observers are preferred instead of plain Eloquent Events. If you need them, issue them after scaffolding.
{% endhint %}

