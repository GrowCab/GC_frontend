# Installing the dependencies

On `gc_frontend` run:

```shell
npm install
```

After this command you should be able to run the application

# Running the application

Go to `gc_frontend` and run:
```shell
npm start
```

From there you should be able to either automatically see the browser prop up or visit:

http://localhost:3000

When developing, it can be useful to keep the tests running in watch mode on a separate shell, to do so, run:

```shell
npm test --watch
```

The development version of this app, will has a proxy configured at:

http://localhost:5000

which should be running the backend, the port of the proxy can be modified in the
`package.json` file, this needs to be adjusted to point at the gc_database api server

