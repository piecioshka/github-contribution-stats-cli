# github-contribution-stats-cli

[![npm version](https://badge.fury.io/js/github-contribution-stats-cli.svg)](https://badge.fury.io/js/github-contribution-stats-cli)
[![downloads count](https://img.shields.io/npm/dt/github-contribution-stats-cli.svg)](https://www.npmjs.com/~piecioshka)
[![travis-ci](https://api.travis-ci.com/piecioshka/github-contribution-stats-cli.svg?branch=master)](https://app.travis-ci.com/github/piecioshka/github-contribution-stats-cli)
[![coveralls](https://coveralls.io/repos/github/piecioshka/github-contribution-stats-cli/badge.svg?branch=master)](https://coveralls.io/github/piecioshka/github-contribution-stats-cli?branch=master)
[![snyk](https://snyk.io/test/github/piecioshka/github-contribution-stats-cli/badge.svg?targetFile=package.json)](https://snyk.io/test/github/piecioshka/github-contribution-stats-cli?targetFile=package.json)

:hammer: CLI for read GitHub Contributions and Streaks

## Installation

```bash
npm install -g github-contribution-stats-cli
```

## CLI

```bash
github-contribution-stats <login> [-d days]
```

ex.

```bash
github-contribution-stats piecioshka # default days=20
github-contribution-stats piecioshka -d 30
```

## Unit tests

```bash
npm test
```

## Code coverage

```bash
npm run coverage
```

## Related

* [github-track-followers](https://github.com/piecioshka/github-track-followers)
* [github-contribution-stats](https://github.com/moqada/github-contribution-stats)

## Credits

Thanks [@moqada][1] for make a package [github-contribution-stats][2] :tada:

## License

[The MIT License](http://piecioshka.mit-license.org) @ 2019-2021

[1]: https://github.com/moqada
[2]: https://github.com/moqada/github-contribution-stats
