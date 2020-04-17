# Routes

Finally, you can add in the `routes` key any route to any controller you want.

For example, we can create our index route to show the latest blog posts of your application. The parameters each route accept is the `methods`,  `name` and `action`.

{% tabs %}
{% tab title="YAML" %}
```yaml
controllers:
  PostController:
    index:
      queries:
        posts: Post with:comments paginate
      view: post.index with:posts

routes:
  /: methods:get name:home action:PostController@index
```
{% endtab %}

{% tab title="Routes" %}
```php
Route::get('/', 'PostController@index')->name('home');
```
{% endtab %}
{% endtabs %}

