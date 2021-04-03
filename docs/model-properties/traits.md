# Traits

Sometimes you may want to take advantage of Model Booting and Initializing using traits, for example, to prepare models or hook up to Eloquent Events dynamically. Just issue the traits in a list below the `traits` key the model, and that's it.

Each trait contains an empty `boot{Trait}` and `initialize{Trait}` ready for you to code them. You can even reference the same trait from other models.

:::: tabs :options="{ useUrlFragment: false }"
::: tab "YAML" id="traits-yaml"
```yaml{9-10,18-19}
models:

  Post:
    uuid: ~
    title: string
    excerpt: string nullable
    body: longText

    traits:
      - Utilites\MyCustomTrait

  Podcast:
    columns:
      uuid: ~
      title: string
      timestamps: ~
  
    traits:
      - Utilities\MyCustomTrait
```
:::

::: tab "Model" id="traits-model"
```php{1,5,12}
use App\Models\Utilities\MyCustomTrait;

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
:::

::: tab "Trait" id="trait-trait"
```php
<?php

namespace App\Models\Utilities;

trait MyCustomTrait
{
    /**
     * Boot the My Custom Trait trait for a model.
     *
     * @return void
     */
    protected static function bootMyCustomTrait()
    {
        // TODO: Boot the HasPrimaryUuid trait.
    }

    /**
     * Initialize the My Custom Trait trait for an instance.
     *
     * @return void
     */
    protected function initializeMyCustomTrait()
    {
        // TODO: Initialize the HasPrimaryUuid trait.
    }
}
```
:::
::::

::: warning Only lists accepted
Ensure the `trait` key is a **list**. If you issue a string in the YAML file, it will be treated as a column.
:::

## External traits

In other occasions, you may have a package with a trait you want to use. 

For illustration purposes, we are going to install a package that [allows users to have Two Factor Authentication without external providers](https://github.com/DarkGhostHunter/Laraguard). We can immediately use the trait that comes with the package by just issuing it into the list.

:::: tabs :options="{ useUrlFragment: false }"
::: tab "YAML" id="external-traits-yaml"
```yaml{7-8}
models:
  User:
    name: string
    email: string
    password: string

    traits:
      - DarkGhostHunter\Laraguard\TwoFactorAuthentication
```
:::

::: tab "Model" id="external-traits-model"
```php{10}
<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use DarkGhostHunter\Laraguard\TwoFactorAuthentication;

class User extends Authenticatable
{
    use TwoFactorAuthentication;

    // ...
}
```
:::
::::

::: warning Ensure the trait exists
If a trait doesn't exist, watch out, it will be created inside the application models namespace, which is `App\Models`
:::

