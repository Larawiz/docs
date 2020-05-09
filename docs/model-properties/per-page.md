# Per Page

By default, Eloquent Models retrieve 15 records from the database when paginating. This is usually a good number for most scenarios, but you may want to change that for more or less.

To do that, just use `perPage` key with the number you want using [Custom Models](../model.md#custom-model).

:::: tabs :options="{ useUrlFragment: false }"
::: tab "YAML" id="per-page-yaml"
```yaml{6}
models:
  Post:
    columns:
      # ...

    perPage: 30
```
:::

::: tab "Model" id="per-page-model"
```php{3}
class Post extends Model
{
    protected $perPage = 30;
}
```
:::
::::

::: tip Two and a half pages
[Seeders](seeders.md) automatically create two-and-a-half pages of records. If you set your `perPage` to 30, then the factory will create 75 records.

Don't worry, you can edit the seeder with your own number of records.
:::

