# Boilerplate for AWS Lambda with Typescript and Prisma ORM

This project is a boilerplate for lambdas using serverless framework and typescript

## Dependencies

There are some important depenencies that we need to have in mind. The most important are:

-   [Serverless framework](https://www.serverless.com/): Serverless manager
    -   [serverless-esbuild](https://www.serverless.com/plugins/serverless-esbuild): Plugin for Typescript compiler
    -   [serverless-offline](https://www.serverless.com/plugins/serverless-offline): Plugin for local lambdas
    -   [serverless-dotenv-plugin](https://www.serverless.com/plugins/serverless-dotenv-plugin): Plugin for load .env file
-   [Middy](https://middy.js.org/): middleware package
-   [Prisma](https://www.prisma.io/): ORM
-   [Tsyringe](https://github.com/microsoft/tsyringe): Dependency injection

#### ExternalDependencies

-   [Docker Compose](https://docs.docker.com/compose/): For containers, like postgres database

#### Linter

For linting we are using Prettier. You can customize this editing the `.pretierrc.json` file

## Usage

### Development

If you don't have a postgres db in your machine, you can use docker-compose file to set up a container with the DB configured and a db manager.

_Optional for postgres database:_

```sh
$ docker compose up -d
```

**Install node_mdoules:**

```sh
$ npm i
```

**Migrate database**: (check _.env_ file to set db params)

```sh
$ npm run prisma:migrate:dev
$ npm run prisma:generate
```

**Start lambdas** localy with serverless offline plugin:

```sh
$ npm run local
```

```
   ┌─────────────────────────────────────────────────────────────────────────────────┐
   │                                                                                 │
   │   POST | http://localhost:3000/dev/product                                      │
   │   POST | http://localhost:3000/2015-03-31/functions/productList/invocations     │
   │   GET  | http://localhost:3000/dev/product                                      │
   │   POST | http://localhost:3000/2015-03-31/functions/productCreate/invocations   │
   │                                                                                 │
   └─────────────────────────────────────────────────────────────────────────────────┘

Server ready: http://localhost:3000 🚀
```

### Deployment

This example is made to work with the Serverless Framework dashboard which includes advanced features like CI/CD, monitoring, metrics, etc.

```sh
$ npm run login
$ npm run deploy
```

To deploy without the dashboard you will need to remove `org` and `app` fields from the `serverless.ts`, and you won’t have to run `sls login` before deploying.

_Note_: In current form, after deployment, your API is public and can be invoked by anyone. For production deployments, you might want to configure an authorizer. For details on how to do that, refer to [http event docs](https://www.serverless.com/framework/docs/providers/aws/events/apigateway/).

### Invocation

After successful deployment, you can call the created application via HTTP:

```bash
curl https://xxxxxxx.execute-api.us-east-1.amazonaws.com/dev/
```

### Local development

To test lambdas localy, you can use the `serverless offline` plugin installed in the project. You only need to execute the proyecto with `npm run local` witch use the plugin under the hood.

To learn more about the capabilities of `serverless-offline`, please refer to its [GitHub repository](https://github.com/dherault/serverless-offline).
