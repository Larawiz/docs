# Route Binding

While you may want to change [how to route bind the Model](https://laravel.com/docs/routing#implicit-binding) into the controllers later in your application, or setting it in your App Service Provider, you can simply override it using the `route` key with the name of the property when you use [Custom Models](../model.md#custom-model).

:::: tabs
::: tab "YAML" id="route-binding-yaml"
```yaml{10}
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
:::

::: tab "Model" id="route-binding-model"
```php{3-6}
class Post extends Model
{
    public function getRouteKeyName()
    {
        return 'title';
    }
}
```
:::
::::

This will override the `getRouteKeyName` method to point to the property of the model it should be used to route-bind it on controllers actions.

::: tip Use the Index, Luke!
It's always recommended to add `index` or `primary` to the column definition when you route-bind the Model to that column for performance reasons, if it's not set. For the above example, `title: string unique` should suffice.
:::



