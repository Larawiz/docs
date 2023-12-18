# Scaffolding

Once your blueprint is ready, go to [Larawiz.com](https://larawiz.fly.dev/), paste your YAML file, put your email and hit the `Scaffold` button. The system will validate the blueprint and once done it will queue your app to be delivered in your email.

::: tip No errors, no problems
If there is a problem in your Blueprint, you will receive the error to fix it.
:::

The `.zip` file available for download will have your Laravel app scaffolded. You only need to drop it to a folder and call [Composer](http://getcomposer.org/) to install the application. Before you do, you're free to edit the `composer.json` with additional packages, like [Laravel JetStream](https://jetstream.laravel.com/), or [Laragear ReCaptcha](https://github.com/Laragear/ReCaptcha).

```shell
unzip my-app.zip
cd my-app
composer install
```

### From the Terminal

You can also use the one-command line handed in your email to automatically download and install your app from the Terminal through Composer. The command is specific for your scaffolded application.

This command will look like this:

```shell
composer create-project larawiz/larawiz my-blog --repository='{\"type\":\"package\",\"package\":{\"name\":\"larawiz/larawiz\",\"version\":\"1.0\",\"dist\":{\"url\":\"https://larawiz-projects.s3-website-us-east-1.amazonaws.com/XGEUdoPWFoNG21SmPHls3UFf2wuoAOvfRrHH3Vormsw.zip\",\"type\":\"zip\"}}}' --stability=stable --remove-vcs
cd my-blog
php artisan serve
```

After that, your project will be created in the path of your Terminal with its name in `kebab-case`, so you can start development immediately.

::: warning The link is public
Larawiz generates your project using a hash. Anyone with the link to the hash will be able to download it.
:::