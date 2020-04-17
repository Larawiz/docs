# Custom

Executes the given list of raw PHP code. Useful when you're using third party packages or you need to do something simple outside scaffolding.

The code must set inside double quotes or single quotes. It is pushed as-it-is to the controller.

{% tabs %}
{% tab title="YAML" %}
```yaml
PostController:
  store:
    # ...
    custom: "alert()->lang('post.created', ['post' => $post->title])->success()"
```
{% endtab %}

{% tab title="Action" %}
```php
public function store(Request $request, Post $post)
{
    // ...

    alert()->lang('post.created', ['post' => $post->title])->success();
}
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
PHP lines are meant for only one-liners. If you don't append them with semicolon \(`;`\), Larawiz will do that for you.
{% endhint %}

