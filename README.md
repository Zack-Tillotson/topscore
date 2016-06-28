# topscore-api
Zack Tillotson

## Development

Configure your firebase application (on the firebase administration pages), then modify these configuration files with your module's information:

1. package.json
1. firebase.json

Then just modify the components in src/firebase/utils.js, src/Application/Page, and src/components/... with your application code!

```
npm install
npm start
open http://localhost:8888/
```

Note you might have to global install webpack-dev-server if you haven't already.
```
npm install -g webpack-dev-server
```

## Description

An easy to use javascript api for interacting with the TopScore web API.

Copyright 2015 Zachery Tillotson