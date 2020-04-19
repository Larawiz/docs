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
      id: ~
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

{% hint style="info" %}
Ensure the `trait` key is a list. If you issue a string in the YAML file, it will be treated as a column.
{% endhint %}

