# Redirect

Returns a redirect response back, to a given action or named route.

{% tabs %}
{% tab title="YAML" %}
```yaml
PostController:
  store:
    # ...
    redirect: route:post.show,post
```
{% endtab %}

{% tab title="Action" %}
```php
public function (Post $post)
{
    // ...

    return redirect()->route('post.show', $post);
}
```
{% endtab %}
{% endtabs %}

You can redirect to a given action name using `Class@action` notation.

{% tabs %}
{% tab title="YAML" %}
```yaml
PostController:
  store:
    # ...
    redirect: action:PostController@show,post
```
{% endtab %}

{% tab title="Action" %}
```php
public function (Post $post)
{
    // ...

    return redirect()->action('PostController@show', $post);
}
```
{% endtab %}
{% endtabs %}

Finally, you can use `back` to redirect back to where the user was. This is useful for storing or updating resources.

{% tabs %}
{% tab title="YAML" %}
```yaml
PostController:
  store:
    # ...
    redirect: back
```
{% endtab %}

{% tab title="Action" %}
```php
public function (Post $post)
{
    // ...

    return back();
}
```
{% endtab %}
{% endtabs %}

