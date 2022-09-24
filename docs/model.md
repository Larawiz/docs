# Models

Start creating a Model under the `models` key by just using the name of the model. The table for it will be inferred automatically using Laravel conventions.  

For example, `GameLeaderboard` will make a table called `game_leaderboards`, without needing to set the name or migration somewhere else.

```yaml{2}
models:
  GameLeaderboard:
    # ...
```

```php{7}
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GameLeaderboard extends Model
{
    // ...
}
```

```php{16}
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('game_leaderboards', function (Blueprint $table) {
           // ...
        });
    }
    
    // ...
}
```

There are two ways to create a model: the _quick way_ and the _custom way_. Let's start with the Quick Model, which pretty much straightforward to declare.

## Quick model

Quick models are the _preferred_ way to create a model that follows Laravel conventions. Just issue the columns directly below the model. The key will be the column name, the value will be the type.

When creating a Quick Model, Larawiz will automatically add [timestamps](model-columns/timestamps.md) and the `id` as [primary key](model-columns/primary-key.md).

```yaml
models:
  Post:
    title: string
    excerpt: string nullable
    body: longText
    published_at: timestamp useCurrent nullable
    user: belongsTo
```

```php
class Post extends Model
{
    use HasFactory;
    
    protected $casts = ['published_at' => 'timestamp']

    protected $fillable = [
        'title',
        'excerpt',
        'body',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
```

```php
// database/factories/PostFactory.php
public function define()
{
//    return [
//      //  
//    ];
}
```

```php
Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->string('excerpt')->nullable();
    $table->longText('body');
    $table->timestamp('published_at')->useCurrent()->nullable();
    $table->foreignIdFor(User::class);
    $table->timestamps();
});
```

## Chores and configuration

When creating a model, the following logic will always be automated, which are mostly chores that take a lot of time once you pile them up.

* [Casting attributes](model-properties/casts.md) to their appropriate type (dates, integers, arrays...)
* [Hiding attributes](model-properties/hidden.md) from serialization, like passwords, tokens and secrets
* [Fillable properties](model-properties/fillable.md) that are user-dependant
* [Relationships](model-relations/index.md) methods and automatic pivot tables
* [Migrations](migrations.md)
* [Factories](model-properties/factories.md)
* [Seeders](model-properties/seeders.md)
* Annotations for query methods, attributes and relations

Also, you can still configure the model you're declaring by using the following keys beneath it:

* `appends`: [Appended attributes](model-properties/appends.md)
* `casts`: [Casts](model-properties/casts.md)
* `factory`: [Factory](model-properties/factories.md)
* `fillable`: [Fillable attributes](model-properties/fillable.md)
* `hidden`: [Hidden attributes](model-properties/hidden.md)
* `observers`: [Observers](model-properties/observers.md)
* `primary`: [Primary key](model-columns/primary-key.md)
* `scopes`: [Scopes](model-properties/scopes.md)
* `seeder`: [Seeder](model-properties/seeders.md)
* `table`: [Table name](model-properties/table.md)
* `uses`: [Traits](model-properties/traits.md)
* `type`: [Model type](model-properties/users.md)

::: tip You can have your columns back
If you want to have a column name that collides with these reserved keys, you can separate the columns using a [Custom Model](#custom-model).
:::

## Custom Model

Custom Models gives you full control on the Model itself. Just explicitly tell which columns you want to create by separating the columns from the rest of the Model configuration. Since Larawiz hands-off the columns to you, this comes with some small _drawbacks_:

* [Primary key](model-columns/primary-key.md) must be issued manually.
* [Timestamps](model-columns/timestamps.md) must be issued manually.
* [Authenticatable Model](model-properties/users.md) must be changed manually.

For example, let's say we want the `Worker` model to have a column called `factory`, where you may put the factory name he is assigned to. Since this collides with the [factory key](model-properties/factories.md), we can separate the columns through the `columns` key.

```yaml
namespace: App\Models

models:
  Worker:
    columns:
      id: ~ # Add the ID manually
      name: string
      is_busy: boolean default:false
      factory: string
      timestamps: ~ # Add the timestamps manually
      softDeletes: ~
    factory:
      - withoutFactory
      - available
```