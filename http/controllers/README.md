# Controllers

Controllers are defined by their name, You can create simple controllers by just issuing the action name directly underneath the controller name.

{% tabs %}
{% tab title="YAML" %}
```yaml
controllers:

  PostController:
    show: ~
    create: ~
    store: ~
```
{% endtab %}

{% tab title="Controller" %}
```php
<?php

namespace App\Http\Controllers;

class PostController extends Controller
{
    public function show()
    {
        // TODO: Prepare the "show" action for the Post Controller.
    }

    public function create()
    {
        // TODO: Prepare the "create" action for the Post Controller.
    }

    public function store()
    {
        // TODO: Prepare the "store" action for the Post Controller.
    }
}
```
{% endtab %}
{% endtabs %}

If you want to add middleware to the controller itself, you should use the `middleware` key beneath the controller name:

{% tabs %}
{% tab title="YAML" %}
```yaml
controllers:

  PostController:
    middleware:
      - auth only:create,store
      - fingerprint
    show: ~
    create: ~
    store: ~
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
        $this->middleware('auth')->only('create', 'store');
        $this->middleware('fingerprint');
    }

    public function show()
    {
        // TODO: Prepare the "show" action for the Post Controller.
    }

    public function create()
    {
        // TODO: Prepare the "create" action for the Post Controller.
    }

    public function store()
    {
        // TODO: Prepare the "store" action for the Post Controller.
    }
}
```
{% endtab %}
{% endtabs %}

## Invokable controllers

You can pass directly to an invokable controller by just setting the `invoke` as the only action:

{% tabs %}
{% tab title="YAML" %}
```yaml
PublishPostController:
  invoke:
    models: Post
    save:
      post:
        published_at: "now()"
    redirect: back
```
{% endtab %}

{% tab title="Controller" %}
```php
<?php

namespace App\Http\Controllers;

class PublishPostController extends Controller
{
    public function __invoke(Post $post)
    {
        $post->published_at = now();
        $post->save();
        
        return back();
    }
}
```
{% endtab %}
{% endtabs %}

