# 📁 Namespace

A default installation of Laravel uses the `App` as namespace, so if you create a `Post` model, it will be in `App\Post`. You can change the base namespace of all Models using the `namespace` key, which will be appended to the one using your application.

::: tip
Don't be shy to use the `Models` namespace if you want to keep all your models and related files in one folder, especially if you plan to have more than a few and have many related files in it.
:::

For example, setting `MyModels` will get all your models inside the `App\MyModels` namespace.

:::: tabs :options="{ useUrlFragment: false }"
::: tab "YAML"
```yaml
namespace: MyModels

models:
  User:
    # ...
```
:::

::: tab "Model"
```php
<?php

namespace App\MyModels;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    // ...
}
```
:::
::::

You can also put a model inside another level below the default or custom namespace.

:::: tabs :options="{ useUrlFragment: false }"
::: tab "YAML"
```yaml
namespace: Models

models:
  Admin\Message:
    # ...
```
:::

::: tab "Model"
```php
<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    // ...
}
```
:::
::::

::: warning
Watch it! Even if you set a different namespace, your models are referenced **using their key**, like `Admin\Message` in the example above.
:::

