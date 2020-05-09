# Users

You may want to create an [Authenticable](https://laravel.com/docs/authentication) and [Authorizable](https://laravel.com/docs/authorization) user, like the one shipping by default with Laravel.
 
If you're using a [Quick Model](./#quick-model), issuing a `password`, `rememberToken`, or both, will instruct Larawiz to treat the model as an User Model.

:::: tabs
::: tab "YAML" id="users-yaml"
```yaml{5-6}
models:

  Admin:
    name: string unique
    password: string
    rememberToken: ~
    age: unsignedSmallInteger default:18
```
:::

::: tab "Model" id="users-model"
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
:::

::::

If you're using [Custom Models](../model.md#custom-model), you will need to change the type of the model by just setting the `type` key to `user`, even if there is already  a `password` or `rememberToken` column.

```yaml{12}
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

::: tip
If you set an User model with `password`, Larawiz will [add a mutator](https://laravel.com/docs/eloquent-mutators#defining-a-mutator) to automatically encrypt the password into the model attributes, for free.

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
:::



