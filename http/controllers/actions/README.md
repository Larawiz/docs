# Actions

Actions are defined by their key. For example, if a controller has the action `show`, the same name will be used for its method.

{% tabs %}
{% tab title="YAML" %}
```yaml
PostController:
  actions:
    showForm:
      view: post.form
```
{% endtab %}

{% tab title="Controller" %}
```php
<?php

namespace App\Http\Controllers;

class PostController extends Controller
{
    /**
     * Handle the "Show Form" action.
     *
     * @return \Illuminate\Http\Response
     */
    public function showForm()
    {
        return view('post.form');
    }
}
```
{% endtab %}
{% endtabs %}

{% hint style="success" %}
When issuing CRUD names for methods \(`show`, `update` , ...\), these will be appended by a standard PHPDoc block. If not, you will receive a common one.
{% endhint %}

You can issue empty actions that you can fill later after scaffolding using `~` \(tilde\). You can do this if no action in Larawiz do what you need.

{% tabs %}
{% tab title="YAML" %}
```yaml
PostController:
  actions:
    showForm: ~
```
{% endtab %}

{% tab title="Controller" %}
```php
<?php

namespace App\Http\Controllers;

class PostController extends Controller
{
    /**
     * Handle the "Show Form" action.
     *
     * @return \Illuminate\Http\Response
     */
    public function showForm()
    {
        // TODO: Prepare the "showForm" action of the PostController.
    }
}
```
{% endtab %}
{% endtabs %}

## Action list and order

Most of actions accept a list of items using key-value or plain arrays, and can be in any order you want.

```yaml
PublishPostController:
  action:
    show:
      models:
        post: Post:uuid
        user: User
      jobs:
        - RefreshHomepage with:post
        - NotifyEditors with:post
```

The list of things you can add to a controller definition is here:

| Order | Name | Accepts lists | List type |
| :--- | :--- | :--- | :--- |
| 1 | `route` | ✖ |  |
| 2 | `models` | ✔ | Key-value, values |
| 3 | `authorize` | ✖ |  |
| 4 | `validate` | ✔ | Key-value |
| 5 | `queries` | ✔ | Key-value, values |
| 6 | `save` | ✖ |  |
| 7 | `delete` | ✔ |  |
| 8 | `events` | ✔ | Values |
| 9 | `jobs` | ✔ | Values |
| 10 | `notify` | ✔ | Values |
| 11 | `flash` | ✔ | Key-value, values |
| 12 | `custom` | ✔ | Values |
| 13 | `redirect` | ✖ |  |
| 14 | `view` | ✖ |  |

As you can see, there is an order. No matter how you input them, Larawiz will process each key in the order given and code the controller in that order. In other words, if you issue the `redirect` first, Larawiz will ensure it goes at the end.

