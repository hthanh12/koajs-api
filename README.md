# koajs-api
koajs + postgres

## Quickstart

### Install dependencies:
`
$ npm install
`

### Create file .env:

```bash
$ touch .env
```

Copy to .env
```
NODE_ENV='development'
JWT_EXPIRATION='1d'
JWT_SECRET='secretKey'
APP_VERSION='v1.0.0'
PORT=3000
DB_PORT=5432
DB_HOST=localhost
DB_NAME=express
DB_USER=root
DB_PASS=123456
```

### Start the server:
```bash
$ npm start
```

View the website at: http://localhost:3000

### Database
