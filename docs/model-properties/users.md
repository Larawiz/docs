# Users

You may want to create an [Authenticable](https://laravel.com/docs/authentication) and [Authorizable](https://laravel.com/docs/authorization) user, like the one shipping by default with Laravel.

Issuing a `password` or `rememberToken` as columns will instruct Larawiz to change the type of the model to a User.

```yaml{5-6}
models:

  Admin:
    name: string unique
    password: string
    rememberToken: ~
    age: unsignedSmallInteger default:18
```

```php{10}
<?php

namespace App\Models;

use Illuminate\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Admin extends Authenticatable
{
    use Notifiable;
    use HasFactory;
    
    // ...
}
```

## Forcing a User model

You can force Larawiz to make a model as a User by setting the `type` key to `user`, which is useful if you want an User to authenticate without passwords or remember tokens.

```yaml{7}
models:

  Kid:
    name: string unique
    age: unsignedSmallInteger default:18
    
    type: user 
```

```php{10}
<?php

namespace App\Models;

use Illuminate\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Kid extends Authenticatable
{
    use Notifiable;
    use HasFactory;
    
    // ...
}
```

## No user model

You can force Larawiz to not change the type of the model to a User by setting the `type` key to `model`.

```yaml{9}
models:

  Admin:
    name: string unique
    password: string
    rememberToken: ~
    age: unsignedSmallInteger default:18

    type: model
```

```php{1}
class Admin extends Model
{
    // ...
}
```