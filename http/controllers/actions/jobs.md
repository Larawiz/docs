# Jobs

Creates and dispatches one or many [Jobs](https://laravel.com/docs/7.x/queues#dispatching-jobs). By default, every Job created implements the `ShouldQueue` contract, along with any parameter in its constructor.

{% tabs %}
{% tab title="YAML" %}
```yaml
PostController:
  store:
    # ...
    jobs: RefreshHomepage with:post
```
{% endtab %}

{% tab title="Action" %}
```php
public function store(Request $request, Post $post)
{
    // ...

    RefreshHomepage::dispatch($post);

    return redirect()->route('post.show', $post);
}
```
{% endtab %}
{% endtabs %}

The Job is created in the `App\Jobs` directory.

You can also issue a list of jobs.

{% tabs %}
{% tab title="YAML" %}
```yaml
PostController:
  store:
    # ...
    jobs: 
      - RefreshHomepage with:post
      - NotifySubscribers with:post
```
{% endtab %}

{% tab title="Action" %}
```php
public function store(Request $request, Post $post)
{
    // ...

    RefreshHomepage::dispatch($post);
    NotifySubscribers::dispatch($post);
}
```
{% endtab %}
{% endtabs %}

