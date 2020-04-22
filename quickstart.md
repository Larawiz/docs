# ⚡ Quickstart

## 💾Installation

To install Larawiz, just fire up Composer in your project root folder and require it in your development dependencies.

```bash
composer require -dev larawiz/larawiz 
```

## 📘 Usage

To start using Larawiz, just publish the sample Database scaffold file using the `larawiz:sample` command and you're done. These files are meant to have a syntax very self-explanatory, so you should get the gist of what's happening.

```bash
php artisan larawiz:sample

# Larawiz v1.0
#
# Scaffold sample files published. Happy coding!
#
# * var/www/app/larawiz/database.yml
#
# Once you're done, use `larakick:scaffold` to create your proyect.
```

The above will publish files for a sample blog site so you can tinker around immediately. Once you're done, simply scaffold your project.

```bash
php artisan larawiz:scaffold

# Larawiz v1.0
#
# Scaffodling your proyect, it will take a little time.
```

Larawiz will try to guess almost everything you want. This documentation will help you do some advanced things that Larawiz may not guess, or to override some behevarious for your convenience.

## 📂 Backups

Larawiz will automatically copy your `app` and some of your `database` directories as backups every time you scaffold.

You can find it in your application default storage path under the `storage/larawiz/backups` directory, and copy them over your project if you need to go back to a previous state.

