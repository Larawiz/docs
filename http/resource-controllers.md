# Resource controllers

A resource controller is the simplest form to create controllers related to a resource, or a nested resource. You can issue one, or many at a given time.

This will create a [Resource Controller](https://laravel.com/docs/7.x/controllers#resource-controllers) using the models issued, and a default way to run the CRUD logic, saving many minutes creating each action.

Resource controllers are created using sample logic, so you don't need to write almost nothing except the validation rules.

{% tabs %}
{% tab title="YAML" %}
```yaml
controllers:

  PostController: resource:Post
  CommentController: resource:Comment
  UserPostsController: resource:User.posts
```
{% endtab %}

{% tab title="Controller" %}
```php
<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Http\Request;
use App\Http\Resources\PostJsonResource;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $posts = Post::paginate();
        
        return view('posts.index')->with('posts', $posts);
    }
    
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('posts.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            // TODO: Validate the store request input.
        ]);
        
        $post = Post::create($validated)

        return redirect()->route('posts.show', $post);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {
        return view('post.show')->with('post', $post);
    }
    
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function edit(Post $post)
    {
        return view('post.edit')->with('post', $post);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Post $post)
    {
        $validated = $request->validate([
            // TODO: Validate the store request input.
        ]);
        
        $post->fill($validated)->save();

        return redirect()->route('post.show', $post);
    }
    
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        $post->delete();

        return redirect()->route('posts.index');
    }
}
```
{% endtab %}

{% tab title="Route" %}
```php
Route::resource('posts', 'PostController');

Route::resource('comments', 'CommentController');

Route::resource('user.posts', 'UserPostController');
```
{% endtab %}
{% endtabs %}

{% hint style="success" %}
Larawiz will automatically pluralize the route name from the model itself.
{% endhint %}

## Partial Resource Controllers

Alternatively, you can create [Partial Resource Controllers](https://laravel.com/docs/7.x/controllers#restful-partial-resource-routes) by issuing the `except` or `only` keywords with the name of the actions:

{% tabs %}
{% tab title="YAML" %}
```yaml
controllers:

  PostController: resource:Post only:index,show
  UserController:: resource:User except:create,store,update,destroy
```
{% endtab %}

{% tab title="Controllers" %}
```php
class PostController extends Controller
{
    public function index()
    {
        // ...
    }

    public function show(Post $post)
    {
        // ...
    }
}

class UserController extends Controller
{
    public function index()
    {
        // ...
    }

    public function show(Post $post)
    {
        // ...
    }
    
    public function edit(Post $post)
    {
        // ...
    }
}
```
{% endtab %}

{% tab title="Route" %}
```php
Route::resource('posts', 'PostController')->only([
    'index', 'show'
]);

Route::resource('users', 'UserController')->except([
    'create', 'store', 'update', 'destroy'
]);
```
{% endtab %}
{% endtabs %}

## Nested Resource Controllers

[Nested Resource Controllers](https://laravel.com/docs/7.x/controllers#restful-nested-resources) are automatically detected if you issue more than one Model followed by its relation name.

{% tabs %}
{% tab title="YAML" %}
```yaml
controllers:

  UserPostsController: resource:User.posts
```
{% endtab %}

{% tab title="Controller" %}
```php
class PostController extends Controller
{
    // ...

    public function show(User $user, Post $post)
    {        
        return redirect()->route('users.posts.show', [$user, $post]);
    }
    
    public function edit(User $user, Post $post)
    {
        return redirect()->route('users.post.edit', [$user, $post]);
    }

    public function update(Request $request, User $user, Post $post)
    {
        $post->fill($request->validated())->save();

        return redirect()->route('users.post.show', [$user, $post]);
    }
    
    public function destroy(User $user, Post $post)
    {
        $post->delete();
        
        return redirect()->route('users.posts.index', $user);
    }
}
```
{% endtab %}

{% tab title="Route" %}
```php
Route:resource('user.posts', 'UserPostController');
```
{% endtab %}
{% endtabs %}

## JSON Resource Controllers

Instead of creating JSON Resources separately, you can use the `json` key to instruct Larawiz to conveniently create a Controller with all CRUD operations based on a new JSON Resource from the Model you set. 

Actions for JSON Resource Controllers come with sample code ready.

{% tabs %}
{% tab title="YAML" %}
```yaml
controllers:

  PostController: resource:Post json
```
{% endtab %}

{% tab title="Controller" %}
```php
<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Http\Request;
use App\Http\Resources\PostResource;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return new PostResource::collection(Post::paginate());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            // ...
        ]);
        
        $post = Post::create($validated);

        return $this->show($post);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Post $podcast)
    {
        return new PostResource($podcast);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Podcast $podcast)
    {
        $validated = $request->validate([
            // ...
        ]);
        
        $podcast->fill($validated)->save();

        return $this->show($podcast);
    }
    
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Podcast $podcast)
    {
        $podcast->delete();

        return $this->show($podcast);
    }
}
```
{% endtab %}

{% tab title="JSON Resource" %}
```php
<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'body' => $this->body,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
```
{% endtab %}
{% endtabs %}

## Resource Authorization

Just issue the `policy` word to the controller declaration. Larawiz will create a Model Policy if it wasn't created previously, and attach the authorization layer to it.

{% tabs %}
{% tab title="YAML" %}
```yaml
controllers:

  PostController: resource:Post json policy
```
{% endtab %}

{% tab title="Controller" %}
```php
<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Http\Request;
use App\Http\Resources\PostJsonResource;

class PostController extends Controller
{
    /**
     * Create a new Post Controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(Post::class, 'post');
    }
    
    // ...
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

{% hint style="info" %}
If you issue a Policy for a [Nested Resource Controller](resource-controllers.md#nested-resource-controllers), it will be created for the last Model declared.
{% endhint %}

## Resource Controller Middleware

Sometimes you will need to add proper middleware to a resource controller. Instead of doing it after scaffolding, you can use the `middleware` key, while you set the resource controller parameters in the `resource` key.

You can do this for normal Resource Controllers or [JSON Resource Controllers](resource-controllers.md#json-resource-controllers), with or without policy.

{% tabs %}
{% tab title="YAML" %}
```yaml
controllers:

  PostController:
    resource: Post
    json: true
    policy: true
    middleware:
     - auth:web
     - signature
```
{% endtab %}

{% tab title="Controller" %}
```php
<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Http\Request;
use App\Http\Resources\PostJsonResource;

class PostController extends Controller
{
    /**
     * Create a new Post Controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(Post::class, 'post');
        
        $this->middleware('auth:web');
        $this->middleware('signature');
    }
    
    // ...
}
```
{% endtab %}
{% endtabs %}

## Automatic Form Request binding

If you have set a [Form Request](form-requests.md) named `{Action}{Model}Request`, the Resource Controller will automatically use it in the Action of the controller itself.

{% tabs %}
{% tab title="YAML" %}
```yaml
forms:
  StorePostRequest:
    validate:
      title: required|string
      body: required|string
    authorize: true

controllers:
  PostController: resource:Post
```
{% endtab %}

{% tab title="Controller" %}
```php
class PostController extends Controller
{
    // ...

    public function store(StorePostRequest $request)
    {        
        $post = Post::create($request->validated());

        return redirect()->route('posts.show', $post);
    }
    
    // ...

    public function update(StorePostRequest $request, Post $post)
    {
        $post->fill($request->validated())->save();

        return redirect()->route('post.show', $post);
    }
    
    // ...
}
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
You can alias [Form Requests](form-requests.md#aliasing-automatic-form-request-binding) to pick up multiple Resource Controller methods automatically.
{% endhint %}

In the case of [Nested Resource Controllers](resource-controllers.md#nested-resource-controllers), the Form Request will pick up the last Model from the Controller Name:

{% tabs %}
{% tab title="YAML" %}
```yaml
forms:
  StorePostRequest:
    validate:
      title: required|string
      body: required|string
    authorize: true

controllers:
  UserPostController: resource:User.posts
```
{% endtab %}

{% tab title="Controller" %}
```php
class UserPostController extends Controller
{
    // ...

    public function store(StorePostRequest $request, User $user, Post $post)
    {        
        // ...
    }
    
    // ...

    public function update(StorePostRequest $request, User $user, Post $post)
    {
        // ...
    }
    
    // ...
}
```
{% endtab %}
{% endtabs %}

