# Traits

Sometimes you may want to take advantage of Model Booting and Initializing using traits, for example, to prepare models or hook up to Eloquent Events dynamically. Just issue the traits in a list below the `traits` key the model, and that's it.

Each trait contains an empty `boot{Trait}` and `initialize{Trait}` ready for you to code them. You can even reference the same trait from other models.

{% tabs %}
{% tab title="YAML" %}
```yaml
namespace: Models

models:

  Post:
    uuid: ~
    title: string
    excerpt: string nullable
    body: longText

    traits:
      - Utilites\HasPrimaryUuid

  Podcast:
    columns:
      uuid: ~
      title: string
      timestamps: ~
  
    traits:
      - Utilities\HasPrimaryUuid
```
{% endtab %}

{% tab title="Model" %}
```php
class Post extends Model
{
    use Utilities\HasPrimaryUuid;

    // ...
}

class Podcast extends Model
{
    use Utilities\HasPrimaryUuid;
 
    // ...
}
```
{% endtab %}

{% tab title="Trait" %}
```php
<?php

namespace App\Utilites;

trait HasPrimaryUuid
{
    /**
     * Boot the Has Primary Uuid trait for a model.
     *
     * @return void
     */
    protected static function bootHasPrimaryUuid
    {
        // TODO: Boot the HasPrimaryUuid trait.
    }

    /**
     * Initialize the Has Primary Uuid trait for an instance.
     *
     * @return void
     */
    protected function initializeSoftDeletes()
    {
        // TODO: Initialize the HasPrimaryUuid trait.
    }
}
```
{% endtab %}
{% endtabs %}

{% hint style="warning" %}
Ensure the `trait` key is a list. If you issue a string in the YAML file, it will be treated as a column.
{% endhint %}

## External traits

In other occasions, you may have a package that has a trait and you want to use it. 

For illustration purposes, we are gonna install a package that [allows users to have Two Factor Authentication without external providers](https://github.com/DarkGhostHunter/Laraguard). We can immediately use the trait that comes with the package by just issuing it into the list.

{% tabs %}
{% tab title="YAML" %}
```yaml
models:
  User:
    name: string
    email: string
    password: string

    traits:
      - DarkGhostHunter\Laraguard\TwoFactorAuthentication
```
{% endtab %}

{% tab title="Model" %}
```php
<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;
use DarkGhostHunter\Laraguard\TwoFactorAuthentication;

class User extends Authenticatable
{
    use TwoFactorAuthentication;

    // ...
}
```
{% endtab %}
{% endtabs %}

{% hint style="warning" %}
If a trait doesn't exists, watch out, it will be created inside the application namespace.
{% endhint %}

