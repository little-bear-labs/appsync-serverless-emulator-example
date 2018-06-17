# Appsync Emulator test repo

This repository contains the test code for the appsync emulator.

We leverage https://github.com/sid88in/serverless-appsync-plugin to provide
the configuration and deployment model for appsync.

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
  - edit the lambda function (requires server restart atm)
  - add new endpoints (requires server restart)
  - subscriptions
  - mutations
  - batch operations

The code in src/ contains a very simple test app using `aws-amplify` for
authentication.