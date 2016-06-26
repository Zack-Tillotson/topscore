# Jumpstart
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

Boilerplate for my react/redux based web applications which use firebase as a backend.

Copyright 2015 Zachery Tillotson