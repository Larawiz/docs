# Middleware

Sometimes you want to create your own middleware classes. Instead of creating each one from scratch and adding the manually into your HTTP Kernel, you can just issue your middleware here. 

The middleware you create will be appended to the middleware list of your application, which are contained in the `app\Http\Kernel.php` by default, while your Kernel will be modified to add the middleware to the `$routeMiddleware` list.

{% tabs %}
{% tab title="YAML" %}
```yaml
middleware:
  fingerprint: SaveBrowserFingerprint
```
{% endtab %}

{% tab title="Middleware" %}
```php
<?php

namespace App\Http\Middleware;

use Closure;

class SaveBrowserFingerprint
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */     
    public function handle($request, Closure $next)
    {
        // ...
        
        $next($request);
    }
}
```
{% endtab %}

{% tab title="HTTP Kernel" %}
```php
<?php

namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{  
   // ...
   
    /**
     * The application's route middleware.
     *
     * These middleware may be assigned to groups or used individually.
     *
     * @var array
     */
    protected $routeMiddleware = [
        // ...
        
        'fingerprint' => \App\Http\Middleware\SaveBrowserFingerprint::class,
    ];
}
```
{% endtab %}
{% endtabs %}

These can be referenced by your controller in the `middleware` key.

```yaml
controllers:
  PostController:
    middleware:
      - fingerprint
    # ...
```

## Terminable Middleware

If you need to add a [terminable middleware](https://laravel.com/docs/7.x/middleware#terminable-middleware), like for example doing any logic after the response has been sent to the browser, you can append the `terminable` word.

{% tabs %}
{% tab title="YAML" %}
```yaml
middleware:
  fingerprint: SaveBrowserFingerprint terminable
```
{% endtab %}

{% tab title="Middleware" %}
```php
<?php

namespace App\Http\Middleware;

use Closure;

class SaveBrowserFingerprint
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */     
    public function handle($request, Closure $next)
    {
        $next($request);
    }
    
    /**
     * Handle the outwent response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Illuminate\Http\Response  $response
     * @return void
     */
    public function terminate($request, $response)
    {
        // ...
    }
}
```
{% endtab %}
{% endtabs %}

{% hint style="warning" %}
Terminable middleware always run the `handle` method regardless when the request is received.
{% endhint %}

