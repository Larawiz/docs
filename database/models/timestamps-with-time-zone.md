# Timestamps time zone

Larawiz automatically sets normal timestamps when using [Quick Models](./#quick-model). Laravel by default always saves dates converted to UTC into the database, so in most scenarios using **time zone is not needed**.

{% hint style="warning" %}
If you plan to **save and retrieve time using different time zones into the database**, like displaying it to users from different parts of the world or run logic for each of them at a given time, **you may use time-zone-aware timestamps**.
{% endhint %}

To change **all Quick Models** to to time-zone-aware Timestamps, set the `timestampsTz` key to `true`:

{% tabs %}
{% tab title="YAML" %}
```yaml
timestampsTz: true

models:
  User:
    name: string
    softDeletes: ~
```
{% endtab %}

{% tab title="Migration" %}
```php
Schema::create('users', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->timestampsTz();
    $table->softDeletes();
)};
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
If you're using [Custom Models](./#custom-model), this value has no influence on the columns.
{% endhint %}

Alternatively, you can always use `timestampsTz` in the columns definitions to swap the normal timestamps to these in a case-by-case scenario, or vice versa.

{% tabs %}
{% tab title="YAML" %}
```yaml
timestampsTz: true

models:
  Post:
    title: string
    body: string
  Comment:
    body: string
    timestamps: ~
```
{% endtab %}

{% tab title="Migration" %}
```php
Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->string('body');
    $table->timestampsTz();
)};

Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->string('body');
    $table->timestamps(); // Overridden from `timestampsTz`
)};
```
{% endtab %}
{% endtabs %}

