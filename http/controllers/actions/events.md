# Events

The `events` fires one or many events instances. If one of the events doesn't exists, it will be created for you, with its arguments as part of the constructor.

{% tabs %}
{% tab title="YAML" %}
```yaml
PostController:
  store:
    # ...
    events: PostCreated with:post
```
{% endtab %}

{% tab title="Action" %}
```php
public function store(Request $request, Post $post)
{
    // ...

    event(new PostCreated($post));
    
    return redirect()->route('post.show', $post);
}
```
{% endtab %}

{% tab title="Event" %}
```php
<?php

namespace App\Events;

use App\Post;

class PostCreated
{
    /**
     * Post instance
     *
     * @var \App\Post
     */
    public $post;

    /**
     * Create a new Post Created event instance.
     *
     * @param  \App\Post $post
     * @return void
     */
    public function __construct(Post $post)
    {
        $this->post = $post;
    }
}
```
{% endtab %}
{% endtabs %}

The Event is created in the `App\Events` directory.

You can also use a list of events if you want to dispatch more that one.

{% tabs %}
{% tab title="YAML" %}
```yaml
PostController:
  store:
    # ...
    events: 
      - PostCreated with:post
      - UserPublishedSomethind with:post
    redirect: route:post.show,post
```
{% endtab %}

{% tab title="Action" %}
```php
public function store(Request $request, Post $post)
{
    // ...

    event(new PostCreated($post));
    event(new UserPublishedSomethind($post));
}
```
{% endtab %}
{% endtabs %}

