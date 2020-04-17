# Delete

Deletes a model by their variable name.

{% tabs %}
{% tab title="YAML" %}
```yaml
delete:
  model: Post
  delete: post
  redirect: route:post.index
```
{% endtab %}

{% tab title="Action" %}
```php
public function delete(Post $post)
{
    $post->delete();

    return redirect()->route('post.index');
}
```
{% endtab %}
{% endtabs %}

If you have many models, can specify each of them to delete.

{% tabs %}
{% tab title="YAML" %}
```yaml
delete:
  model: Post User
  delete: post user
  redirect: route:post.index
```
{% endtab %}

{% tab title="Action" %}
```php
public function delete(Post $post, User $user)
{
    $post->delete();
    $user->delete();

    return redirect()->route('post.index');
}
```
{% endtab %}
{% endtabs %}





