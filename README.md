# generator-git-init

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][depstat-image]][depstat-url]

> [Yeoman][yo] generator for simply `git init` and optional `init` commit.  
> [Works great with other generators too](#composability).

[yo]: http://yeoman.io/

## Install

    npm install --global yo generator-git-init

## Usage

    yo git-init

    # standard `init` commit message
    yo git-init -c
    yo git-init --commit

    # custom `init` commit message
    yo git-init --commit='Awesome project start'

## Composability

> Composability is a way to combine smaller parts to make one large thing. Sort of [like Voltron®][voltron]  
> — [Yeoman docs](http://yeoman.io/authoring/composability.html)

Just plug in _git-init_ into your generator and let it initialize git for you. Everybody wins.

### Install

    npm install --save generator-git-init

#### Compose

```js
this.composeWith('git-init', {}, {
  local: require.resolve('generator-git-init')
});
```

Or with custom initial commit message:

```js
this.composeWith('git-init', {
  options: { commit: 'your awesome project' }
}, {
  local: require.resolve('generator-git-init')
});
```

[voltron]: http://25.media.tumblr.com/tumblr_m1zllfCJV21r8gq9go11_250.gif


## License

MIT © [Vladimir Starkov](https://iamstarkov.com)

[npm-url]: https://npmjs.org/package/generator-git-init
[npm-image]: https://img.shields.io/npm/v/generator-git-init.svg?style=flat-square

[travis-url]: https://travis-ci.org/iamstarkov/generator-git-init
[travis-image]: https://img.shields.io/travis/iamstarkov/generator-git-init.svg?style=flat-square

[depstat-url]: https://david-dm.org/iamstarkov/generator-git-init
[depstat-image]: https://david-dm.org/iamstarkov/generator-git-init.svg?style=flat-square

[travis]: https://travis-ci.org/
