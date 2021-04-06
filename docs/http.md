# HTTP

HTTP Scaffolding in Larawiz are easy to do. Simply name a controller action, and add a series of steps to do inside the controller. Larawiz will automatically generate the code in your controller.

::: tip Controllers and Models
Ensure your Models exists if you use them in any controller action. If not, you will get an error when trying to scaffolding.  
:::

## Creating a controller

Create an `http.yml` file, and populate the `controllers` key. You should get the gist of what's happening with just looking into the example.


:::: tabs :options="{ useUrlFragment: false }"
::: tab "YAML" id="controllers-example-tab-yaml"
```yaml
controllers:

  PostController:
    index:
      get: /post
      actions:
        view:
          name: post.all
          with:
            posts: post.all
    show:
      route: get:/post/{post.slug}
      actions:
        view:
          name: post.show
          with:
            posts: $post
    
    create:
      route: get:/post/new 
      actions:
        
``` 
:::

::: tab "Controller" id="controllers-example-tab-controller"
```php
<?php

namespace App\Http\Controllers;

use App\Models\Post;

class PostControllers extends Controller
{
    /**
     * @return mixed
     */
    public function index()
    {
        return view('post.all')->with('posts', Post::all());
    }
    
    public function show(Post $post)
    {
        return view('post.show')->with('post', $post);
    }
}
?>
``` 
:::


::::