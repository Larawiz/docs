# Eloquent Observers

Finally, you can also create an [Observer](https://laravel.com/docs/eloquent#observers) for all Eloquent operations over the model, which may come handy. Using a Custom Model, set the `observer` key to `true`.

Larawiz will automatically create an observer, based on the Model name, by just calling the appropriate artisan command behind the scenes.

:::: tabs :options="{ useUrlFragment: false }"
::: tab "YAML" id="eloquent-observers-yaml"
```yaml{6}
models:
  Post:
    columns:
      # ...

    observer: true
```
:::

::: tab "Observer"  id="global-scopes-observer"
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
:::
::::

Observers are created in the `app\Observers` directory.

::: tip Observers FTW
Observers are preferred instead of plain Eloquent Events. If you need the latter, create them after scaffolding.
:::

