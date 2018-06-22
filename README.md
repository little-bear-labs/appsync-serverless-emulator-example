# Appsync Emulator test repo
[![Build Status](https://travis-ci.com/ConduitVC/appsync-serverless-emulator-example.svg?branch=master)](https://travis-ci.com/ConduitVC/appsync-serverless-emulator-example)

This repository contains the test code for the appsync emulator.

We leverage https://github.com/sid88in/serverless-appsync-plugin to provide
the configuration and deployment model for appsync.

This is _alpha_ quality and we expect bugs. To enable logging export the following
environment variable: `NODE_DEBUG=appsync*`

General note the dynamodb emulator is downloaded when this package is installed. 
As a result java is required dependency on the machine but we do not require
that anyone download the dynamodb emulator itself.

## Usage

After running `yarn`

Start the emulator

```js
yarn start-emulator
```

Start the dev server.

```js
yarn start
```

Go to `http://localhost:5000`

## Supported

The appsync emulator supports the following source types:

  - lambda
  - dynamodb
  - none

# Things to try

  - VTL can be changed without restarting the emulator
  - lambda function can be changed without restarting the server
  - add new endpoints (requires server restart)
  - subscriptions
  - mutations
  - batch operations
  - writing tests with an apollo client interface.

The code in src/ contains a very simple test app using `aws-amplify` for
authentication.
