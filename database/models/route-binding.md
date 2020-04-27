# Route Binding

While you may want to change [how to route bind the Model](https://laravel.com/docs/7.x/routing#implicit-binding) into the controllers later in your application, or setting it in your App Service Provider, you can simply override it using the `route` key and the name of the model property when you use [Custom Models](./#custom-model).

{% tabs %}
{% tab title="YAML" %}
```yaml
models:
  Post:
    columns:
      id: ~
      title: string
      excerpt: string index
      body: longText
      timestamps: ~
      
    route: title
```
{% endtab %}

{% tab title="Model" %}
```php
class Post extends Model
{
    public function getRouteKeyName()
    {
        return 'title';
    }
}
```
{% endtab %}
{% endtabs %}

This will override the `getRouteKeyName` method to point to the property of the model it should be used to route-bind it on controllers actions.

{% hint style="info" %}
It's always recommended to add `index` or `primary` to the column definition when you route-bind the Model to that column for performance reasons, if it's not set. For the above example, `title: string unique` should suffice.
{% endhint %}



