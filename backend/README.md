# Rauxa Contact Manager backend

### Conventions

#### Configure

Please add your AWS key and secret in config/custom.js

#### Using schema models
We will use schema based models for future database engine migrations.

#### Realtime

Added hooks on change model, it fires event each time we create new Contact, or update or delete a Contact.

#### Modular project
Use stand alone action syntax for modular development

[Sails - stand alone Actions](https://sailsjs.com/documentation/concepts/actions-and-controllers#?standalone-actions)

This adds the functionallity we need to add the following module pattern

```bash
├── controllers
│   ├── module
│   │   └── action
```

#### Always same response structure.

Added wrapper service for responses, all responses has the same structure, for better parse time in clients.
```
{
  status:'SUCCESS'|'ERROR',
  data:{},
  error:{}, // optional when error fires
  message:String // optional when error fires
}
```

### Tests and Coverage

```
sudo npm install -g grunt-cli
sudo npm install -g eslint
npm install
```


```
npm run test
```

### Run the project
For production
```bash
npm start
```
For Environment
```bash
NODE_ENV=env&& node app.js
```
For Development
```bash
npm run start-dev
```

it has windows scripts, with sufix '-win'

### Can be better.

* Should have Auth (no time)
* Should have more tests ( for sockets )

### Experience

* Mostly software architecture for backend(Java & NodeJs)
* 1st time for vue.js
* Had experience with AngularJs, but it seems to be old.
