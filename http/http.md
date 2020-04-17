# 🌐 HTTP

Larawiz conveniently generates controllers for you, along with almost everything you need to make them work, including routes. You only have to point out your controllers, what you want them to do, and that's it.

Controllers in Larawiz are defined in `larakick/http.yml`, using the same ideas behind [Laravel Shift Blueprint](https://github.com/laravel-shift/blueprint) to declare code inside the controller action. 

You don't have to code everything except the most complex logic for your application.

{% tabs %}
{% tab title="YAML" %}
```yaml
middleware:
  fingerprint:
    name: SaveBrowserFingerprint

controllers:
  PostController:
    middleware:
      - auth only:create,store
      - fingerprint
    show:
      models:
        post: Post:name
      view: post.show with:post
    create:
      view: post.create
    store:
      validate:
        - title: required|string
        - body: required|string
      save: Post
      notify: PostPublishedNotification to:post.author with:post
      dispatch: RefreshHomepage with:post
      fire: PostCreated with:post.title
      flash: post.title with:post.title
      custom: "alert()->lang('post.created', ['post' => $post->title])->success()"
      redirect: post.show,post
```
{% endtab %}

{% tab title="Middleware" %}
```php
class SaveBrowserFingerprint
{
    public function handle ($request, Closure $next)
    {
        // ...
        
        return $next($request);
    }
}
```
{% endtab %}

{% tab title="Controller" %}
```php
<?php

namepsace App\Http\Controllers;

class PostController extends Controller
{
    /**
    * Create a new PostController instance.
    *
    * @return void
    */
    public function __construct()
    {
        $this->middleware('auth')->only('create', 'store');
        $this->middleware('fingerprint');
    }
      
    public function show(Post $post)
    {
        return view('post.show', [
            'post' => $post
        ]);
    }
    
    public function create()
    {
        return view('post.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'body' => 'required|string',
        ]);
        
        $post = Post::create($validated);
        
        Notification::send($post->author, new PostPublishedNotification($post));

        Queue::dispatch(new RefreshHomePage($post));
        
        Event::fire(new PostCreated($post->title));
        
        Session::flash('title', $post->title);
        
        alert()->lang('post.created', ['post' => $post->title])->success();
        
        return redirect('post.show', $post)
    }
```
{% endtab %}

{% tab title="Routes" %}
```php
Route::get('show/{post:name}', 'PostController@show')
    ->name('post.show');
    
Route::get('create', 'PostController@create')
    ->name('post.create');

Route::post('store', 'PostController@store')
    ->name('post.store');    
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
Controllers in Larawiz are revolved around Models. If you need to create custom logic, you're better creating a custom controller yourself.
{% endhint %}

We are gonna go for each key so you can further customize what the HTTP Controller does.

