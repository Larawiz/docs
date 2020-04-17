# Namespace

All namespaces for your project controllers are based on the `App\Http\Controllers` on default Laravel installations, which is [declared in the `App\Providers\RouteServiceProviders`](https://github.com/laravel/laravel/blob/c7a0002432351690d28223afa7caa272e769e226/app/Providers/RouteServiceProvider.php#L17).

To avoid too many files inside a directory, you can create controllers appending a namespace:

{% tabs %}
{% tab title="YAML" %}
```yaml
namespace: Admin

controllers:

  PostController:
    # ...
  User\CommentController:
    # ...
```
{% endtab %}

{% tab title="PostController" %}
{% code title="app\\Http\\Controllers\\Admin\\PostController.php" %}
```php
<?php

namespace App\Http\Controllers\Admin\PostController;

use App\Http\Controllers\Controller;

class PostController extends Controller
{
    // ...
}
```
{% endcode %}
{% endtab %}

{% tab title="CommentController" %}
{% code title="app\\Http\\Controllers\\Admin\\User\\CommentController.php" %}
```php
<?php

namespace App\Http\Controllers\Admin\User\CommentController;

use App\Http\Controllers\Controller;

class CommentController extends Controller
{
    // ...
}
```
{% endcode %}
{% endtab %}
{% endtabs %}



