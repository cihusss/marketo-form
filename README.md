[Macs]

- brew install nginx
- vim /opt/homebrew/etc/nginx/nginx.conf => change webserver root here based on where you cloned the repo
- brew services restart/start nginx => restarts or starts the nginx web server
- npm run watch => this watched for code changes and automatically builds the minified bundle
- http://127.0.0.1:8080/capi-fe-engine/public/ => access it locally, can play with the index.html and embedded marketo form in it
