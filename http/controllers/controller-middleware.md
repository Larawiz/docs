# Controller Middleware

Middleware can be set separately in-controller using the `middleware` key, as long is the first key below the controller name.

Additionally, you can chain the `only` and `except` methods to filter which actions should be filtered for the middleware.

{% tabs %}
{% tab title="YAML" %}
```yaml
PostController:
  middleware:
    - auth:web only:show,index
    - custom-middlware except:create
    - foo:bar,50
  # ...
```
{% endtab %}

{% tab title="Controller" %}
```php
<?php

namespace App\Http\Controllers;

class PostController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:web')->only('show', 'index');
        $this->middleware('customMiddleware')->except('create');
        $this->middleware('foo:bar,50');
    }

    // ...
}
```
{% endtab %}
{% endtabs %}





