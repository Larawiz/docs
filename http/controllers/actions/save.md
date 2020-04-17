# Save

Updates or Create a given Model using the Request validated properties.

{% tabs %}
{% tab title="YAML" %}
```yaml
update:
  models: Post
  validate:
    title: required|string
    body: required|string
  save: post
  redirect: back
```
{% endtab %}

{% tab %}
```php
public function update(Request $request, Post $post)
{
    $validated = $request->validated([
        'title' => 'required|string',
        'body' => 'required|string',
    ]);

    $post->fill($validated)->save();

    return back()
}
```
{% endtab %}
{% endtabs %}

Larawiz will automatically get the validated input from the Request and **fill** de model attributes with them.

Alternatively, Larawiz will use the Form Request data if you are using it for validation.

{% tabs %}
{% tab title="YAML" %}
```yaml
update:
  models: Post
  validate: StorePostRequest
  save: post
  redirect: back
```
{% endtab %}

{% tab %}
```php
public function update(StorePostRequest $request, Post $post)
{
    $post->fill($request->validated())->save();

    return back()
}
```
{% endtab %}
{% endtabs %}

{% hint style="warning" %}
Saving only supports one model. If you have more than one, you must specify the model instance you want to save. Trying to save multiple models would mean to have different validated arrays and that's a mess outside scaffolding.

```yaml
update:
  models: User Comment
  validate:
    title: required|string
    body: required|string
  save: comment
  redirect: back
```
{% endhint %}

## Saving additional attributes

Alternatively, you can merge \(or replace\) the values to save by issuing a key-value list. This is **mandatory** if you plan to save something into the model name and no validation was set previously.

The values are passed as plain PHP, and each value is just meant to be one liners.

{% tabs %}
{% tab title="YAML" %}
```yaml
publish:
  models: Post
  save: 
    post:
      - published_at: "now()"
      - slug: "\Str::slug($post->title)"
  redirect: route:post.show,post
```
{% endtab %}

{% tab title="Action" %}
```php
public function publish(Post $post)
{
    $post->published_at = now();
    $post->slug = \Str::slug($post->title);

    $post->save();

    return redirect('post.show', $post);
}
```
{% endtab %}
{% endtabs %}

{% hint style="success" %}
If you don't append them with semicolon \(`;`\), Larawiz will do that for you.
{% endhint %}

