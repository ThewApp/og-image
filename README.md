# og-image

[![.github/workflows/docker.yml](https://github.com/ThewApp/og-image/actions/workflows/docker.yml/badge.svg)](https://github.com/ThewApp/og-image/actions/workflows/docker.yml)

Node.js application to capture and generate an open graph image.

## Examples

- [Image for https://www.thewdhanat.com/](https://og-image.thew.pro/www.thewdhanat.com/image.png?path=/)
- [Image for https://www.thewdhanat.com/blog/](https://og-image.thew.pro/www.thewdhanat.com/image.png?path=/blog/)
- [Image for https://www.thewdhanat.com/blog/how-to-use-local-fonts-in-google-docs-sheets-slides/#supported-fonts](https://og-image.thew.pro/www.thewdhanat.com/image.png?path=/blog/how-to-use-local-fonts-in-google-docs-sheets-slides/%23supported-fonts)

## Usage

Pull new image

```sh
docker pull ghcr.io/thewapp/og-image:main
```

Start

```sh
docker run -d -p 8080:8080 --restart always --name og-image ghcr.io/thewapp/og-image:main
```

Stop

```sh
docker stop og-image && docker rm og-image
```

## Endpoints

```
/<hostname>.png?path=/<path>
/<hostname>/<any>.png?path=/<path>
```

`<path>` must have leading `/` and encoded with [`encodeURIComponent`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent). Hence `path` can contain query (?) and url fragment (#).

### Accepted `<hostname>`

- www.thewdhanat.com
