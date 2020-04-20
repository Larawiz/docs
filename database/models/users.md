# Users

You may want to create an [Authenticable](https://laravel.com/docs/7.x/authentication) and [Authorizable](https://laravel.com/docs/7.x/authorization) user, like the one that ships by default with Laravel. This will create a model with all the tools needed to abide to the framework authentication and authorization mechanisms.

If you're using a [Quick Model](./#quick-model), issuing a `password`, `rememberToken`, or both, will instruct Larawiz to treat the model as an User Model.

{% tabs %}
{% tab title="YAML" %}
```yaml
models:

  Admin:
    name: string unique
    password: string
    rememberToken: ~
    age: unsignedSmallInteger default:18
```
{% endtab %}

{% tab title="Model" %}
```php
<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Admin extends Authenticatable
{
    use Notifiable;
}
```
{% endtab %}

{% tab title="Migration" %}
```php
Schema::create('admins', function (Blueprint $table) {
    $table->id();
    $table->string('name')->unique();
    $table->string('password');
    $table->rememberToken();
    $table->unsignedSmallInteger('age')->default(18);
    $table->timestamps();
});
```
{% endtab %}
{% endtabs %}

If you're using [Custom Models](./#custom-model), you will need to change the type of the model by just setting the `type` key to `user`, even if there is already  a `password` or `rememberToken` column.

```yaml
models:

  Admin:
    columns:
      id: ~
      name: string unique
      password: string
      rememberToken: ~
      age: unsignedSmallInteger default:18
      timestamps: ~
    type: user
```

{% hint style="success" %}
If you set an User model with `password` ,  Larawiz will add a mutator to automatically encrypt the password into the model attributes, for free.

```php
class Admin extends Authenticatable
{
    // ...

    public function setPasswordAttribute($password)
    {
        $this->attributes['password'] = app('hash')->make($password);
    }
}
```
{% endhint %}



