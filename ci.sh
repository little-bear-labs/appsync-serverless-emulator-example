#! /bin/bash -ex

echo "Testing with yarn install"
yarn test

# We have previously run into issues where we have a working build on yarn
# but not with npm.
echo "Testing with npm install"
rm -rf node_modules
npm i 
DEBUG=1 yarn test
