# Migrations

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

{% hint style="warning" %}
Factories and Seeders are not created for migrations. You must do that manually for each of them.
{% endhint %}

