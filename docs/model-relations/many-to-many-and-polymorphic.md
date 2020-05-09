# Many to Many (and Polymorphic)

Many-to-many relations are easy to make. Larawiz will automatically create pivot tables for your `belongsToMany` and `morphToMany` relations by using Laravel naming convention automatically.

::: warning ID or UUID land
Because the nature of many-to-many relations, these are only supported on models with `id` or `uuid` primary keys.
:::

## Many to Many

For [many-to-many](https://laravel.com/docs/eloquent-relationships#many-to-many) relations, just simply add the `belongsToMany` in each. No need to add the Model pointing to the other if we can infer that from the relation names.

:::: tabs
::: tab "YAML" id="many-to-many-yaml"
```yaml{4,8}
models:
  User:
    name: string
    roles: belongsToMany as:permissionsGroup
  
  Role:
    name: string
    users: belongsToMany
```
:::

::: tab "Models" id="many-to-many-models"
```php
class User extends Model
{
    public function roles()
    {
        return $this->belongsToMany(Role::class)
                    ->as('permissionsGroup');
    }
}

class Role extends Model
{
    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}
```
:::

::: tab "Migrations" id="many-to-many-migrations"
```php{11-15}
Schema::create('users', function (Blueprint $table) {
    $table->id();
    $table->string('name');
});

Schema::create('roles', function (Blueprint $table) {
    $table->id();
    $table->string('name');
});

// Pivot created automatically for "Role" and "User".
Schema::create('role_user', function (Blueprint $table) {
    $table->bigUnsignedInteger('user_id');
    $table->bigUnsignedInteger('role_id');
});
```
:::
::::

**The pivot table is created automatically** based on Laravel naming conventions, so you don't have to worry about doing it yourself manually.

::: tip Works even on one model
You don't need to declare both models with a `belongsToMany`, automatic pivot table creation will work anyway.
:::

## Polymorphic Many to Many

For the case of [many-to-many-polymorphic](https://laravel.com/docs/eloquent-relationships#many-to-many-polymorphic-relations), Larawiz will also guess the pivot migration. Let's use the same Laravel example that many Posts or Videos having multiple Tags. Note that, again, we didn't issue the pivot table anywhere.

::: warning
Polymorphic Many-to-many relations cannot be guessed by Larawiz. These needs both the target Model, and the name of "~able" relation as second argument. 
:::

:::: tabs
::: tab "YAML" id="polymorphic-many-to-many-yaml"
```yaml{4,8,12-13}
models:
  Post:
    name: string
    tags: morphToMany:Tag,taggable

  Video:
    name: string
    tags: morphToMany:Tag,taggable

  Tag:
    name: string
    posts: morphedByMany:Post,taggable
    videos: morphedByMany:Video,taggable
```
:::

::: tab "Models" id="polymorphic-many-to-many-models"
```php
class Post extends Model
{
    public function roles()
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }
}

class Video extends Model
{
    public function users()
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }
}

class Tag extends Model
{
    public function posts()
    {
        return $this->morphedByMany(Post::class, 'taggable');
    }
    
    public function videos()
    {
        return $this->morphedByMany(Video::class, 'taggable');
    }
}
```
:::

::: tab "Migrations" id="polymorphic-many-to-many-migrations"
```php{16-20}
Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->string('name');
});

Schema::create('videos', function (Blueprint $table) {
    $table->id();
    $table->string('name');
});

Schema::create('tags', function (Blueprint $table) {
    $table->id();
    $table->string('name');
});

// Polymorphic Pivot created automatically by Larawiz for "tags"
Schema::create('taggables', function (Blueprint $table) {
    $table->unsignedBigInteger('tag_id');
    $table->morphs('taggable');
});
```
:::
::::

The example above will create the `taggables` table automatically, since Larawiz will use the second argument from the `morphToMany` and pluralize it for the migration.

::: tip Effortless relations
There is no need to create a `morphedByMany` relation in the child model, but is recommended to.
:::

If the models use UUID as primary key, no problem, Larawiz will automatically create a pivot table using `uuidMorphs` and/or reference the target model by its primary key.

:::: tabs
::: tab "YAML" id="polymorphic-many-to-many-yaml-2"
```yaml{3,8,13}
models:
  Post:
    uuid: ~
    name: string
    tags: morphToMany:Tag,taggable

  Video:
    uuid: ~
    name: string
    tags: morphToMany:Tag,taggable

  Tag:
    uuid: ~
    name: string
    posts: morphedByMany:Post,taggable
    videos: morphedByMany:Video,taggable
```
:::

::: tab "Models" id="polymorphic-many-to-many-models-2"
```php
class Post extends Model
{
    public function roles()
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }
}

class Video extends Model
{
    public function users()
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }
}

class Tag extends Model
{
    public function posts()
    {
        return $this->morphedByMany(Post::class, 'taggable');
    }
    
    public function videos()
    {
        return $this->morphedByMany(Video::class, 'taggable');
    }
}
```
:::

::: tab "Migrations" id="polymorphic-many-to-many-migrations-2"
```php
// Polymorphic Pivot created automatically for [taggable].
Schema::create('taggables', function (Blueprint $table) {
    $table->uuid('tag_uuid');
    $table->uuidMorphs('taggable');
});
```
:::
::::

::: danger Primary key uniformity
Polymorphic many-to-many must have **ALL parent models** with either `id` or `uuid` for primary keys. If one of these uses one different from the others, you will get an error.
:::

## Overriding automatic pivot tables

You can always override the pivot table created automatically by Larawiz by just issuing a migration table with the same name. This works for both normal and polymorphic pivot tables.

This is very handy if you don't want the pivot model overhead, and add some properties to the pivot relation.

:::: tabs
::: tab "YAML" id="overriding-automatic-pivot-tables-yaml"
```yaml{11-14}
models:
  User:
    name: string
    roles: belongsToMany withPivot:associated_at
  
  Role:
    name: string
    users: belongsToMany

migrations:
  role_user:
    role_id: unsignedBigInteger
    user_id: unsignedBigInteger
    associated_at: timestamp useCurrent
```
:::

::: tab "Migrations" id="overriding-automatic-pivot-tables-migrations"
```php{11-16}
Schema::create('users', function (Blueprint $table) {
    $table->id();
    $table->string('name');
});

Schema::create('roles', function (Blueprint $table) {
    $table->id();
    $table->string('name');
});

// Table overriden by the developer.
Schema::create('role_user', function (Blueprint $table) {
    $table->bigUnsignedInteger('user_id');
    $table->bigUnsignedInteger('role_id');
    $table->timestamp('associated_at')->useCurrent();
});
```
:::
::::