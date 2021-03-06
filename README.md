# harmony-consumer

Harmony Consumer Quote

###### This app is bootstrapped with a custom version of Create React App

[Repo](https://github.com/facebook/create-react-app)  
[User Guide](https://facebook.github.io/create-react-app/)

### Getting setup

clone the repository (requires access rights) from bitbucket
`git clone git@bitbucket.org:exzeo-usa/harmony-consumer.git`  
\*_its likely you will be cloning multiple projects, we recommend using a common directory for them_

_From the root of the project_

add `.npmrc` file \*_you will need this file before attempting_ `npm install`

```bash
//registry.npmjs.org/:_authToken=GET_ACCESS_TOKEN_FROM_DEVOPS
@exzeo:registry=https://registry.npmjs.org/
```

add `.env.local` file  
\*_this file is used to override default the configuration which runs locally, and points to a local Harmony backend._

```.bash
# point to specific env
REACT_APP_API_URL=https://api.harmony-ins.com

# point cypress to a different environment
#CYPRESS_BASE_URL=https://[URL TO BE NAMED LATER]
```

install dependencies

```bash
npm ci
```

run the app

```bash
npm start
```

### Contributing to Harmony Consumer

All components must meet the following criteria

- Follow linting rules ( `npm run lint` must exit with 0 code )
- Any test plan associated with work being done must be met with unit/cypress tests
- A front end dev approval required for PR's
