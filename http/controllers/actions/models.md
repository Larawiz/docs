# Models

The `models` key specifies the model or models to use in the action as method parameters. These will available as camel case \(`camelCase`\) inside the action.

{% tabs %}
{% tab title="YAML" %}
```yaml
PostController:
  show:
    models: User Post
```
{% endtab %}

{% tab title="Action" %}
```php
public function show(User $user, Post $post)
{
    // ...
}
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
Remember to use [the same Model name](../../../database/models/) you have set in your database scaffold file.
{% endhint %}

## Route binding

Additionally, you can [issue the column from which the Model should be retrieved](https://laravel.com/docs/7.x/routing#route-model-binding).

{% tabs %}
{% tab title="YAML" %}
```yaml
PostController:
  show:
    models: Post:slug
```
{% endtab %}

{% tab title="Route" %}
```php
Route::get('post/{post:slug}', 'PostController@show');
```
{% endtab %}
{% endtabs %}

## Variable name

To change the name of the variable where the model is stored inside the action, define it as key-value. This will be reflected in the [automatic route definition](route.md).

{% tabs %}
{% tab title="YAML" %}
```yaml
PostController:
  show:
    models:
      - author: User
      - publication: Post:slug
```
{% endtab %}

{% tab title="Action" %}
```php
public function store(User $author, Post $publication)
{
    // ...
}
```
{% endtab %}

{% tab title="Route" %}
```php
Route::get('author/{author}/publication/{publication:slug}', 'PostController@show');
```
{% endtab %}
{% endtabs %}

{% hint style="warning" %}
This variable will be used along all other actions, so be wary of that.
{% endhint %}

