# Many to Many (and Polymorphic)

Many-to-many relations are easy to make. Larawiz will automatically create pivot tables for your `belongsToMany` and `morphToMany` relations by using Laravel naming convention automatically.

::: warning Stranded in an ID-land
Many-to-many relations will not work if one of the parent models is:

* not using Primary Keys,
* using a custom Primary Key, or
* using a Primary Key different from the other parent models.

Larawiz will return an error and recite the Necronomicon loudly.
:::

## Many to Many

For [many-to-many](https://laravel.com/docs/eloquent-relationships#many-to-many) relations, just simply add the `belongsToMany` in each. No need to add the Model pointing to the other if we can infer that from the relation names.

**The pivot table is created automatically** based on Laravel naming conventions, so you don't have to worry about doing it yourself manually.

```yaml{4,8}
models:
  User:
    name: string
    roles: belongsToMany as:permissionsGroup
  
  Role:
    name: string
    users: belongsToMany
```

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
    $table->foreignIdFor(User::class);
    $table->foreignIdFor(Role::class);
});
```

::: tip Works even on one model
You don't need to declare both models with a `belongsToMany`, automatic pivot table creation will work anyway.
:::

## Polymorphic Many to Many

For the case of [many-to-many-polymorphic](https://laravel.com/docs/eloquent-relationships#many-to-many-polymorphic-relations), Larawiz will also guess the pivot migration. Let's use the same Laravel example that many Posts or Videos having multiple Tags.

Note that, again, we didn't issue the pivot table anywhere.

::: warning I'm a wizard, not a mentalist
Polymorphic Many-to-many relations cannot be guessed by Larawiz. These needs both the target Model, and the name of _~able_ relation as second argument.
:::

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
    $table->foreignIdFor(Tag::class);
    $table->morphs('taggable');
});
```

The example above will create the `taggables` table automatically, since Larawiz uses the second argument from the `morphToMany`.

::: tip Effortless relations
There is no need to create a `morphedByMany` relation in the child model, but is recommended to.
:::

If the models use UUID as primary key, no problem, Larawiz will automatically create a pivot table using `uuidMorphs` and/or reference the target model by its primary key.

```yaml{3,8,13}
models:
  Post:
    id: uuid
    name: string
    tags: morphToMany:Tag,taggable

  Video:
    id: uuid
    name: string
    tags: morphToMany:Tag,taggable

  Tag:
    id: uuid
    name: string
    posts: morphedByMany:Post,taggable
    videos: morphedByMany:Video,taggable
```

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

```php
// Polymorphic Pivot created automatically for [taggable].
Schema::create('taggables', function (Blueprint $table) {
    $table->foreignIdFor(Tag::class);
    $table->uuidMorphs('taggable');
});
```

## [Overriding automatic pivot tables](../migrations.md#overriding-pivot-tables)

To override an automatic pivot table, you may create a migration for it. More details in the [Migration section](../migrations.md#overriding-pivot-tables).