# Notify

Creates and dispatches a notification.

{% tabs %}
{% tab title="YAML" %}
```yaml
PostController:
  store:
    # ...
    notify: PostPublishedNotification to:post.author with:post
```
{% endtab %}

{% tab title="Action" %}
```php
public function store(Request $request, Post $post)
{
    // ...

    Notification::send($post->author, new PostPublishedNotification($post));
}
```
{% endtab %}
{% endtabs %}

The notification is automatically created in `App\Notifications`, along the parameters in the constructor.

Alternatively, you can send a notification to the authenticated user using the `toAuth` if you want to send it to the authenticated user.

{% tabs %}
{% tab title="YAML" %}
```yaml
  PostController:
  store:
    # ...
    notify: PostPublishedNotification toAuth with:post
```
{% endtab %}

{% tab title="Action" %}
```php
public function store(Request $request, Post $post)
{
    // ...

    Notification::send(auth()->user(), new PostPublishedNotification($post));
}
```
{% endtab %}
{% endtabs %}



