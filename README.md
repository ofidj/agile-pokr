# Agile-Poker

> simple agile poker planning (generated from [*yo fidj*](https://github.com/ofidj/generator-fidj))

[![Fidj.io Status][fidj-image]][fidj-url]
[![Build Status][travis-image]][travis-url]

[![video][youtube-img]][youtube-video]

## Build it

Clone and install the project

```bash
npm install
```

and then launch on your device

```bash
npm run ios
```

## Deploy

Check our deployed demos on
[github](https://ofidj.github.io/agile-pokr/www/) -
[heroku](https://agile-pokr.herokuapp.com/) -
[android](https://play.google.com/store/apps/details?id=io.miapp.agilepoker) -
[ios](https://itunes.apple.com/fr/app/agile-pokr/id1358118408?mt=8).

- Github needs the static /www (look at [gh-pages](https://help.github.com/articles/what-is-github-pages))
- Heroku needs a node app
- Mobile OS have [guide for deploying mobile apps](https://ionicframework.com/docs/intro/deploying/)

### Notes

heroku deploy a node/express web.js; it needs

```bash
heroku config:set NPM_CONFIG_PRODUCTION=false
```

[fidj-image]: https://fidj.ovh/_/agile-pokr/badges/github.svg
[fidj-url]: https://fidj.ovh/_/agile-pokr
[youtube-img]: http://img.youtube.com/vi/0FbnCWWg_NY/0.jpg
[youtube-video]: https://www.youtube.com/embed/0FbnCWWg_NY?autoplay=true
[travis-image]: https://travis-ci.org/ofidj/agile-pokr.svg?branch=master
[travis-url]: https://travis-ci.org/ofidj/agile-pokr
