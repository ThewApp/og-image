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

## Endpoints

```
/<hostname>.png?path=/<path>
/<hostname>/<any>.png?path=/<path>
```

`<hostname>`

- www.thewdhanat.com
