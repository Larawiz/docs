# Quickstart

If you want the gist for Larawiz, just publish the sample Database and HTTP scaffold files using the `larawiz:sample` command and you're done. These are pretty much self-explanatory.

```bash
php artisan larawiz:sample

# Larawiz scaffold sample files published. Happy coding!
#
# * var/www/app/larawiz/database.yml
# * var/www/app/larawiz/http.yml
#
# Once you're done, use `larakick:scaffold` to create your proyect.
```

The above will publish files for a sample blog site so you can tinker around immediately. Once you're done, simply scaffold your project.

```bash
php artisan larawiz:scaffold
```

Of course, this will work for simple applications. Larawiz will try to guess almost everything, but if you want to know how to do simple things, you can read the documentation.

## Backups

Larawiz will automatically copy your `app`, `routes` and some of your `database` directories as backups every time you scaffold.

You can find it in your application default storage path under the `storage/larakick/backups` directory, and copy them over your project if you need to go back to a previous state.

