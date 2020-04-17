# Validate

Creates a Request with validation rules. Validated inputs are available as `$validated`.

{% tabs %}
{% tab title="YAML" %}
```yaml
PostController:
  store:
    validate:
      title: required|string
      body: required|string
    # ...
```
{% endtab %}

{% tab title="Action" %}
```php
public function store(Request $request)
{
    $validated = $request->validate([
        'title' => 'required|string',
        'body' => 'required|string',
    ]);
    
    // ...
}
```
{% endtab %}
{% endtabs %}

{% hint style="danger" %}
There is no support to using [`Rule` objects](https://laravel.com/docs/7.x/validation#using-rule-objects). If you need more complex validation, you can edit the validation rules afterwards.
{% endhint %}

## Form Requests

If you want to create a [Form Request](https://laravel.com/docs/7.x/validation#form-request-validation) to centralize validation and authorization, just issue the name of the Form Request you have set in the `forms` key and that's it. Larawiz will automatically use it as parameter in the action of your choice.

{% tabs %}
{% tab title="YAML" %}
```yaml
controllers:
  PostController:
    store:
      validate: StorePostRequest
  
  AdminPostController:
    store:
       validate: StorePostRequest
     
forms:
  StorePostRequest:
    validate:
      title: required|string
      body: required|string
    authorize: true
```
{% endtab %}

{% tab title="Controllers" %}
```php
class PostController extends Controller
{
    public function store(StorePostController $request)
    {
        // ...
    }
}

class AdminPostController extends Controller
{
    public function store(StorePostController $request)
    {
        // ...
    }
}
```
{% endtab %}
{% endtabs %}

