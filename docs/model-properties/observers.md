# Eloquent Observers

You can also create an [Observer](https://laravel.com/docs/eloquent#observers) for all Eloquent operations over the model, which may come handy to centralize operations. Using a Custom Model, set the `observers` key to `true`.

Larawiz will automatically create an observer in the `app\Observers` directory based on the Model name.

```yaml{6}
models:
  Post:
    columns:
      # ...

    observers: true
```

```php
<?php

namespace App\Observers;

use App\Models\Post;

class PostObserver
{
    public function created(Post $post)
    {
        //
    }
    
    public function updated(Post $post)
    {
        //
    }

    public function deleted(Post $post)
    {
        //
    }

    public function restored(Post $post)
    {
        //
    }

    public function forceDeleted(Post $post)
    {
        //
    }
}
```

You can also create multiple observers for a given Model by issuing a list. This is handy when you want to centralize operations around a task, without having to make one wall of text as an observer.

```yaml{6-8}
models:
  Post:
    columns:
      # ...

    observers:
      - PreparePublishingTime
      - DraftCleanup
```

```php
// app\Models\Observers\PreparePublishingTime.php
class PreparePublishingTime
{
    // ...
}

// app\Models\Observers\DraftCleanup.php
class DraftCleanup
{
    // ...
} 
```

::: tip I'm looking at you
Larawiz will automatically register your observers in the `EventServiceProvider`, so you don't have to.

```php
// app/providers/EventServiceProvider.php

use App\Models\Post;
use App\Observers\PreparePublishingTime;
use App\Observers\DraftCleanup;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The model observers for your application.
     *
     * @var array
     */
    protected $observers = [
        Post::class => [PreparePublishingTime::class, DraftCleanup::class],
    ];
    
    // ...
}
```
:::

::: tip You can use external observers too
If you want to use an external observer, just append `\` to the name, like `\Vendor\Package\ExternalObserver`. Larawiz won't create that observer, so you can add it through a third party package later.
:::