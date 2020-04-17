# Queries

Creates retrieval queries over a Model and saves them into a variable specified by its key.

{% tabs %}
{% tab title="YAML" %}
```yaml
showPage:
  queries:
    - posts: Post with:comments paginate
  view: post.page with:posts
```
{% endtab %}

{% tab title="Action" %}
```php
public function showPage()
{
    $posts = Post::with('comments')->paginate();
    
    return view('post.page', [
        'pages' => $pages
    ]);
}
```
{% endtab %}
{% endtabs %}

Queries always start with the name of the Model key, and from then you can chain Eloquent Builder methods as you want.

{% hint style="info" %}
All method arguments use string only.
{% endhint %}

