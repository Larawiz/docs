# View

Returns a view using the given parameters.

{% tabs %}
{% tab title="YAML" %}
```yaml
PostController:
  store:
    # ...
    view: post.show with:post
```
{% endtab %}

{% tab title="Action" %}
```php
public function store(Post $post)
{
    // ...

    return view('post.show')->with('post', $post);
}
```
{% endtab %}
{% endtabs %}

You can change the name of the variable to add to the view. 

{% tabs %}
{% tab title="YAML" %}
```yaml
PostController:
  store:
    # ...
    view: post.show with:foo,post
```
{% endtab %}

{% tab title="Action" %}
```php
public function store(Post $post)
{
    // ...

    return view('post.show')->with('publication', $post);
}
```
{% endtab %}
{% endtabs %}

And also use multiple `with`, which will be transformed as an array:

{% tabs %}
{% tab title="YAML" %}
```yaml
PostController:
  store:
    # ...
    view: post.show with:post with:author,user
```
{% endtab %}

{% tab title="Action" %}
```php
public function store(User $user, Post $post)
{
    // ...

    return view('post.show')->with([
        'post' => $post,
        'author' => $user,
    ]);
}
```
{% endtab %}
{% endtabs %}

{% hint style="danger" %}
The `view` key doesn't create the views. You will have to do it yourself, since frontend code varies between projects.
{% endhint %}

