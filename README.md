# og-image

Node.js application to capture and generate an open graph image.

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

## Paths

```
/<site>.png
/<site>/<any>.png
```

`<site>`

- www.thewdhanat.com
