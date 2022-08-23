# Migrations

The `migrations` key adds additional tables, and allows to override [automatic pivot tables](#overriding-pivot-tables).

Define migrations using the table name as key, and a list of columns directly under the name. These are passed as-it-is to the migration, using the same column notation you're familiar with.

For example, we will declare the `user_actions` table like it was a Model. All method and arguments **will be taken verbatim** to be used in the migration.

```yaml
migrations:
  user_actions:
    id: uuid primary
    username: string
    action: string
    route: string
    created_at: timestamp useCurrent
```

```php
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
        Schema::create('user_actions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('username');
            $table->string('action');
            $table->string('route');
            $table->timestamp('created_at')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     *
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_actions');
    }
}
```

## Using `foreignIdFor`

Laravel includes the `foreignIdFor` method that automatically generates a _foreign_ column reference to the model by checking its primary key. This is what Larawiz uses to create relations.

You can also use this method manually by setting the model name as key, and the `foreignIdFor` as value. The value accepts the column name as first argument.

```yaml{4,5}
migrations:
  user_actions:
    id:
    User: foreignIdFor
    Action: foreignIdFor:movement_id
    name: string
```

```php{3,4}
Schema::create('user_actions', function (Blueprint $table) {
    $table->id();
    $table->foreignIdFor(User::class);
    $table->foreignIdFor(Action::class, 'movement_id');
    $table->string('name');
});
```

## Overriding pivot tables

When using [automatic pivot tables or polymorphic pivot tables](model-relations/many-to-many-and-polymorphic.md), you can override the tables by just issuing the table name with your own columns. Larawiz will automatically use your migration instead of the automatic pivot table.

For example, we can override the `card_player` table to add some information about the card, like an aliased name the player may have for it. Then, we can use `withPivot` with the name of the additional pivot name to include when retrieving the relation through the pivot record.

::: warning These are your keys
When overriding pivot tables, **Larawiz hands-off all checks to you**, so ensure your pivot tables contain the necessary relation columns.
:::

```yaml{10,12-18}
models:  
  Card:
    name: string
    player: belongsToMany:Player

  Player:
    name: string
    email: string
    password: string
    cards: belongsToMany:Card withPivot:alias

migrations:
  card_player:
    id: ~
    printer: uuid
    Player: foreignIdFor
    Card: foreignIdFor    
    alias: string nullable
```

```php{13}
class Card extends Model
{
    public function players()
    {
        return $this->belongsToMany(Player::class);
    }
}

class Player extends Model
{
    public function cards()
    {
        return $this->belongsToMany(Card::class)->withPivot(['alias']);
    }
}
```

```php{15-21}
Schema::create('cards', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->timestamps();
});

Schema::create('players', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->string('email');
    $table->string('password');
    $table->timestamps();
});

Schema::create('card_player', function (Blueprint $table) {
    $table->id();
    $table->uuid('printer');
    $table->unsignedBigInteger('card_id');
    $table->unsignedBigInteger('player_id');
    $table->string('alias')->nullable();
});
```

The same concept applies for polymorphic pivot tables. In the next example, the automatic table is called `routables`, so with adding the migration manually you can customize the table, like adding a column to point out the `difficulty` for the attached `Car` or `Bus` model.

```yaml{16-20}
models:  
  Car:
    model: string
    routes: morphToMany:Tag,routable withPivot:difficulty

  Bus:
    model: string
    routes: morphToMany:Tag,routable withPivot:difficulty

  Route:
    name: string
    cars: morphToMany:Car,routable
    buses: morphToMany:Bus,routable

migrations:
  routables:
    id: ~
    route_id: unsignedBigInteger
    routable: morphs
    difficulty: string default:low
```

```php{6,15}
class Car extends Model
{
    public function routes()
    {
        return $this->morphToMany(Route::class, 'routable')
                    ->withPivot(['difficulty']);
    }
}

class Bus extends Model
{
    public function routes()
    {
        return $this->morphToMany(Route::class, 'routable')
                    ->withPivot(['difficulty']);
    }
}

class Route extends Model
{
    public function cars()
    {
        return $this->morphToMany(Car::class);
    }
    
    public function buses()
    {
        return $this->morphToMany(Bus::class);
    }
}
```

```php{19-24}
Schema::create('cars', function (Blueprint $table) {
    $table->id();
    $table->string('model');
    $table->timestamps();
});

Schema::create('buses', function (Blueprint $table) {
    $table->id();
    $table->string('model');
    $table->timestamps();
});

Schema::create('routes', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->timestamps();
});

Schema::create('routables', function (Blueprint $table) {
    $table->id();
    $table->unsignedBigInteger('route_id');
    $table->morphs('routable');
    $table->string('difficulty')->default('low');
});
```

::: danger Pivots override only
If you declare the Pivot Model, and create a migration for it, you will get an error. Only automatic pivot tables can be overridden with a migration.

In other words, you may create any migrations as long it doesn't collide with a model you have declared previously.
:::

## Included migrations

Larawiz includes Laravel default migrations which are key for all fresh installations:

* `failed_jobs`, to handle failed jobs from the queue,
* `password_resets`, to handle users password resets, and,
* `personal_access_tokens`, to handle api-style authentication through [Laravel Sanctum](https://laravel.com/docs/sanctum).

These will be added in your scaffolded App automatically. You can disable each of them by issuing `false`:

```yaml
migrations:
  failed_jobs: false
  password_resets: false
  personal_access_tokens: false
```

::: warning They are as it is
The included migrations cannot be overridden with your own. You may do it _after_ your application is scaffolded.
:::