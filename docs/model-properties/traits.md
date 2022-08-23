# Traits

Sometimes you may want to take advantage of Model _Boot_ and _Initialization_ using traits, for example, to prepare models data or hook up to Eloquent Events dynamically. Just put the traits in a list below the `uses` key. These will be added to any existing trait of the model, and be put inside the `app\Models\Concerns` directory.

Each trait will be created with an empty `boot{Trait}` and `initialize{Trait}` ready for you to code them. You can even reference and reuse the same trait from other models.

```yaml{9-10,18-19}
models:

  Post:
    id: uuid
    title: string
    excerpt: string nullable
    body: longText

    uses:
      - Utilites\MyCustomTrait

  Podcast:
    columns:
      id: uuid
      title: string
      timestamps: ~
  
    uses:
      - Utilities\MyCustomTrait
```

```php{1,5,12}
use App\Models\Concerns\Utilities\MyCustomTrait;

class Post extends Model
{
    use MyCustomTrait;

    // ...
}

class Podcast extends Model
{
    use MyCustomTrait;
 
    // ...
}
```

```php
<?php

namespace App\Models\Concerns\Utilities;

trait MyCustomTrait
{
    /**
     * Boot this trait once for the model.
     *
     * @return void
     */
    protected static function bootMyCustomTrait()
    {
        // TODO: Boot the MyCustomTrait trait.
    }

    /**
     * Initialize this trait for each model instance.
     *
     * @return void
     */
    protected function initializeMyCustomTrait()
    {
        // TODO: Initialize the MyCustomTrait trait.
    }
}
```

## External traits

You may want to use external traits, like the ones included with Laravel, or you may want to prepare a Model with a trait from another package, like [Laragear TwoFactor](https://github.com/Laragear/TwoFactor). In any case, you can prefix the trait using `\`. Larawiz won't make any check regarding the external traits, but still add it to the model.

```yaml
models:

  Customer:
    # ...

    uses:
      - \Illuminate\Auth\MustVerifyEmail
      - \Laragear\TwoFactor\TwoFactorAuthentication
```

```php
namespace App\Models;

use Illuminate\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laragear\TwoFactor\TwoFactorAuthentication;

class Customer extends Authenticatable
{
    use MustVerifyEmail;
    use TwoFactorAuthentication;
    
    // ...
}
```