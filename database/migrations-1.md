# 📝 Migrations

The `migrations` key represents a quick way to add raw tables that are **not** tied to Models and any other addendum. For example, the `failed_jobs` tables can be declared like this:

{% tabs %}
{% tab title="YAML" %}
```yaml
migrations:
  failed_jobs:
    id: ~
    connection: text
    queue: text
    payload: longText
    exception: longText
    failed_at: timestamp useCurrent
```
{% endtab %}

{% tab title="Migration" %}
```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFailedJobsTable extends Migration
{

    /**
     * Run the migrations.
     *
     *
     * @return void
     */
    public function up()
    {
        Schema::create('failed_jobs', function (Blueprint $table) {
            $table->id();
            $table->text('connection');
            $table->text('queue');
            $table->longText('payload');
            $table->longText('exception');
            $table->timestamp('failed_at')->useCurrent();
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
        Schema::dropIfExists('failed_jobs');
    }
}
```
{% endtab %}
{% endtabs %}

The migrations are defined using the table name as key, and a list of columns directly under the name. These are passed as-it-is to the migration class, using the same column notation.

## Overriding pivot tables

When using automatic pivot tables or polymorphic pivot tables, you can override the tables by just issuing the table name with your own columns. Larawiz will automatically use your migration instead of the automatic pivot table.

For example, we can override the `card_player` table to add some information about the card, like an aliased name the player may have for it.

{% tabs %}
{% tab title="YAML" %}
```yaml
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
    player_id: unsignedBigInteger
    card_id: unsignedBigInteger    
    alias: string nullable
```
{% endtab %}

{% tab title="Models" %}
```php
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
{% endtab %}

{% tab title="Migrations" %}
```php
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

// Pivot "card_player" table manually overridden by developer.
Schema::create('card_player', function (Blueprint $table) {
    $table->id();
    $table->unsignedBigInteger('card_id');
    $table->unsignedBigInteger('player_id');
    $table->string('alias')->nullable();
});
```
{% endtab %}
{% endtabs %}

The same concept applies for polymorphic pivot tables. In the next example, the automatic table is called `routables`, so with adding the migration manually you can customize the table, like adding a column to point out the `difficulty` for the attached `Car` or `Bus` model.

{% tabs %}
{% tab title="YAML" %}
```yaml
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
{% endtab %}

{% tab title="Models" %}
```php
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
{% endtab %}

{% tab title="Migrations" %}
```php
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

// Morph Pivot "routables" table manually overridden by developer.
Schema::create('routables', function (Blueprint $table) {
    $table->id();
    $table->unsignedBigInteger('route_id');
    $table->morphs('routable');
    $table->string('difficulty')->default('low');
});
```
{% endtab %}
{% endtabs %}

