# Form Requests

Forms requests are a good way to centralize validation and authorization from the incoming HTTP Request and reference it in many parts of your application.

To create a Form Request, just issue the name of it below the root `forms` key of your `http.yml` file, and add the validation rules under the `validate` key, like[ you would using the controller actions](controllers/actions/validate.md).

```yaml
forms:
  StorePostController:
    validate:
      title: required|string
      body: required|string
      
controllers:
  # ...
```

Once done, you can reference it from the controllers themselves in the `validate` key of each controller action.

{% tabs %}
{% tab title="YAML" %}
```yaml
forms:
  StorePostController:
    validate:
      title: required|string
      body: required|string

controllers:
  PostController:
    store:
      validate: StorePostRequest
  AdminPostController:
    store:
      validate: StorePostRequest
```
{% endtab %}

{% tab title="Form Request" %}
```php
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Htp\FormRequest;

class StorePostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }
    
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'required|string',
            'body' =
        ];
    }
}
```
{% endtab %}

{% tab title="Actions" %}
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

{% hint style="warning" %}
By default, Form Request won't include the `authorize` method in them. If you want to include the method, you can set the `authorize` key and return either `true` or `false`, so you can edit them thoroughly after scaffolding.

```yaml
forms:
  StorePostController:
    validate:
      title: required|string
      body: required|string
    authorize: true
```

```php
class StorePostRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }
    
    //...
}
```
{% endhint %}

## Aliasing for Automatic Form Request Binding

Sometimes it's just better to reuse the same Form Request for saving a Model than creating the same Form Request with different names. In that case, you can issue the Form Request one time, and issue the `alias` key so the same Form Request can be [bound automatically to your Resource Controller](resource-controllers.md#automatic-form-request-binding).

```yaml
forms:
  PostSaveRequest:
    validate:
      title: required|string
      body: required|string
    alias: PostStoreRequest PostUpdateRequest
```

Since Automatic Form Request Binding works using `{Action}{Model}Request`, the `store` and `update` actions of the `PostController` Resource Controller will be automatically bound to the `PostSaveRequest`:

```php
class PostController extends Controller
{
    public function store(PostSaveRequest $request)
    {
        // ...
    }

    public function update(PostSaveRequest $request)
    {
        // ...
    }
}
```

