# <img src="public/icon-48.png" width="38" align="left" /> Streams Live

> Helps tracking your favorite streamers across different platforms!

Streams Live is an extension that allows you managing your live followed streamers without bothering of accessing different platforms!

From the extension window you can access live streams, see the stream title, category, uptime, viewers amount, sort and group them by many parameters or search for something you're looking for via "Search" field.

Also extension can send you notification about new live streamers or category changes if you want to (available in notifications settings)

## Build

1. Create your [Twitch application](https://dev.twitch.tv/console/apps).

2. Create an environment file '.env' in the root of the project with following parameters:

```
TWITCH_CLIENT_ID="wirakoeisjyhdsihztjfam956l6nkf"
AUTH_REDIRECT_URI="https://nether0ne.github.io/#/streams-live/auth"
```

3. Install project dependencies (`yarn install`) and build for desired platform:

- `yarn build:chrome` for Google Chrome build
- `yarn build:ff` for Mozilla Firefox build

## Contributing

### Bugs and suggestions

If you have found a bug or you have a suggestion for the application - list it at the [issues](https://github.com/Nether0ne/Streams-Live/issues) page.

### Donating

Streams Live is a free and open source application, that doesn't collect or process your personal data.

To support this project you can consider donating via available options to keep this project running.

## Honorable mentions

I would like to thank [Seldszar](https://github.com/Seldszar) for his Twitch extension [Gumbo](https://github.com/Seldszar/Gumbo), which inspired me and helped in many ways to develop Streams Live extension.
Also I would like to thank my friends who advised and helped me through the development process!

## License

Copyright (c) 2022 nether0ne

See the [LICENSE](https://github.com/Nether0ne/Streams-Live/blob/main/LICENSE) file for further information
