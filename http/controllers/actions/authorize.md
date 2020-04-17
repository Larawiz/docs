# Authorize

To authorize a given action, you can issue the `authorize` key. Larawiz will guess the model automatically and create a Model Policy.

{% tabs %}
{% tab title="YAML" %}
```yaml
PostController:
  update:
    models: Post
    authorize: ~
```
{% endtab %}

{% tab title="Action" %}
```php
public function update(Post $post)
{
    $this->authorize($post);
}
```
{% endtab %}

{% tab title="Policy" %}
```php
<?php

namespace App\Policies;

use Illuminate\Auth\Access\HandlesAuthorization;
use App\Post;
use App\User;

class PostPolicy
{
    use HandlesAuthorization;
    
    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function viewAny(User $user)
    {
        //
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\User  $user
     * @param  \App\Post  $post
     * @return mixed
     */
    public function view(User $user, Post $post)
    {
        //
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\User  $user
     * @param  \App\Post  $post
     * @return mixed
     */
    public function update(User $user, Post $post)
    {
        //
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\User  $user
     * @param  \App\Post  $post
     * @return mixed
     */
    public function delete(User $user, Post $post)
    {
        //
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\User  $user
     * @param  \App\Post  $post
     * @return mixed
     */
    public function restore(User $user, Post $post)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\User  $user
     * @param  \App\Post  $post
     * @return mixed
     */
    public function forceDelete(User $user, Post $post)
    {
        //
    }
}
```
{% endtab %}
{% endtabs %}

{% hint style="success" %}
Model Policies are created with all empty CRUD methods, ready to be edited by you.
{% endhint %}

If you need more control, you can always pass the action and [model variable](models.md#variable-name) names you want to authorize, especially if the controller action is not the same as the CRUD action you want to authorize.

{% tabs %}
{% tab title="YAML" %}
```yaml
PostController:
  publish:
    models: 
      publication: Post:id
    authorize: update publication
```
{% endtab %}

{% tab title="Action" %}
```php
public function publish(Post $publication)
{
    $this->authorize('update', $publication);
}
```
{% endtab %}
{% endtabs %}

{% hint style="danger" %}
Authorize only supports **model policies**. If you need **gates**, you should use the Authorization layer of Larawiz.
{% endhint %}

You can also pass the [Model name you have set previously](../../../database/models/) in case there is no variable, like when happens with the `create` and `store` actions.

{% tabs %}
{% tab title="YAML" %}
```yaml
# larawiz/database.yml
models:
  Post:
    # ...

# larawiz/http.yml
PostController:
  store:
    authorize: store Post
```
{% endtab %}

{% tab title="Action" %}
```php
public function store()
{
    $this->authorize('store', Post::class);
}
```
{% endtab %}
{% endtabs %}

