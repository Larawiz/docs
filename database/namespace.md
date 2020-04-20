# 📁 Namespace

Laravel uses the `App` as namespace for your Models, so if you create a `Post` model, it will be in `App\Post`. You can change the base namespace of all Models using the `namespace` key, which will be appended to the base application namespace.

{% hint style="info" %}
Don't be shy to use the `Models` namespace if you want to keep all your models and related files in one folder, especially if you plan to have more than a few and have many related files in it.
{% endhint %}

Since the default namespace in Laravel is `\App`, setting `MyModels` will get all your models inside the `App\MyModels` namespace.

{% tabs %}
{% tab title="" %}
```

```
{% endtab %}

{% tab title="YAML" %}
```yaml
namespace: MyModels

models:
  User:
    # ...
```
{% endtab %}

{% tab title="Model" %}
{% code title="app\\MyModels\\User.php" %}
```php
<?php

namespace App\MyModels;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    // ...
}
```
{% endcode %}
{% endtab %}
{% endtabs %}

You can also put a model inside another level below the default or custom namespace.

{% tabs %}
{% tab title="YAML" %}
```yaml
namespace: Models

models:
  Admin\Message:
    # ...
```
{% endtab %}

{% tab title="Model" %}
{% code title="app\\Models\\Admin\\Message.php" %}
```php
<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    // ...
}
```
{% endcode %}
{% endtab %}
{% endtabs %}

{% hint style="warning" %}
Watch it! Even if you set a different namespace, your models are referenced using their key.

```yaml
namespace: MyModels

models:

  Admin:
    name: string
    email: string
    password: string
    messages: hasMany:Admin\Message
    tasks: hasMany:Admin\Task

  Admin\Message:
    subject: string
    body: string
    admin: belongsTo:Admin

  Admin\Task:
    type: string
    admin: belongsTo:Admin
```
{% endhint %}

