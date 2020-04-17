# Route

Each time you create a Controller action, Larawiz will try to guess the route it should generate based on the CRUD name of the action, so you won't need to issue the route for it.

{% tabs %}
{% tab title="YAML" %}
```yaml
User\PostController:
  show:
    models: Post
    # ...
  create:
    validate:
      - title: required|string
      - body: required|string
    # ...

PublishController:
  invoke:
    view: publish.controller
```
{% endtab %}

{% tab title="Routes" %}
```php
Route::get('user/post/{post}', 'User\PostController@show')
  ->name('user.post.show');
Route::post('user/post', 'User\PostController@create')
  ->name('user.post.create');
Route::get('publish', 'PublishController');
```
{% endtab %}
{% endtabs %}

Alternatively, you can issue the route for the action yourself, and optionally, the name of it. This is mandatory when you issue non-CRUD actions names, like `publish` for example.

If you're using a [model as part of the action parameter](models.md), you can [issue the column from which the Model should be retrieved](https://laravel.com/docs/7.x/routing#route-model-binding).

{% tabs %}
{% tab title="YAML" %}
```yaml
Post\CreatorController:
  publish:
    route: get:post-creator/post/{post:slug} post-creator.show
    models: Post
    redirect: post.show post
```
{% endtab %}

{% tab title="Controller" %}
```php
class CreatorController extends Controller
{
    public function publish(Post $post)
    {
        return redirect('post.show', $post);
    }
}
```
{% endtab %}

{% tab title="Route" %}
```php
Route::get('post-creator/post/{post:slug}', 'Post\CreatorController:@publish')
    ->name('post-creator.show');
```
{% endtab %}
{% endtabs %}

{% hint style="warning" %}
If you don't issue the method for the non-CRUD action name, Larawiz will assume it's a `GET` method.
{% endhint %}

{% hint style="success" %}
Larawiz is intelligent to know that if you use `showForm` as an action method, it will be considered as the `show` CRUD method.
{% endhint %}

If you use a custom Model variable name, you must define it as you have set it.

{% tabs %}
{% tab title="YAML" %}
```yaml
User\PostController:
  show:
    models: 
      - publication: Post
    route: get:post-creator/post/{publication:slug} post-creator.show
```
{% endtab %}

{% tab title="Route" %}
```php
Route::get('post-creator/post/{publication:slug}', 'User\PostController@show')
    ->name('post-creator.show');
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
Currently there is no support for `MATCH` HTTP method, which allows to match different verbs.
{% endhint %}

## Disabling automatic route generation

If you want to disable automatic route generation for the action controller, issue the `route` key with `false`.

```yaml
User\PostController:
  show:
    route: false
    # ...
```

