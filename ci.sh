#! /bin/bash -ex

# echo "Testing with yarn install"
# yarn test

echo "Testing with npm install"
rm -rf node_modules
npm i
DEBUG=* yarn test