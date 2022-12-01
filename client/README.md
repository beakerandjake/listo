# listo client

Written in React, uses tailwindcss for styling and react-router for routing.

## Development

### Installing Packages

listo uses npm workspaces, so the packages should be installed from the root package.json. Refer to the main README file for [installing packages](https://github.com/beakerandjake/listo#install-packages)

**[See main README for information regarding Font Awesome Pro](https://github.com/beakerandjake/listo#important-note-about-font-awesome-pro)**


### Run Locally

There are two options for running the client locally.

#### Run the Client and the API

This is the default way to run locally. From the root of the project run: 

```
npm run dev
```

#### Run the Client without the API

To run just the client, you must tell the client to use its mock api (see [configuration](https://github.com/beakerandjake/listo/tree/main/client#configuration) for more information). Run the following command from the root of the project.
```
REACT_APP_API_IMPLEMENTATION=mock npm run dev:client
```

## Build 

Run the following command from the root of the project.

```
npm run build:client
```

The production build will be saved at `./client/build/`


## Configuration

Configuration is done via environment variables as defined in the create-react-app [documentation](https://create-react-app.dev/docs/adding-custom-environment-variables/)

### Settings of Note
| Name      | Description |
| ----------- | ----------- |
| REACT_APP_API_ENDPOINT      | The base url of the API. When running in development the API is hosted on a different port. If this value is not set the Client will assume the API is hosted at the same location as the Client (this is true when deployed in production).     | 
| REACT_APP_API_IMPLEMENTATION   | Supported values null or `mock`. If the value is set to `mock`, the mock api will be used. Otherwise the Client will query the api. The mock api exists to support the static github pages demo site of listo, and to aid local development.     |
| REACT_APP_ROUTER_OVERRIDE | Supported values: null or `hash`. If the value is set to `hash`, react-router will use the [hash router](https://reactrouter.com/en/6.4.3/router-components/hash-router). Otherwise react-router will use the default of [browser router](https://reactrouter.com/en/6.4.3/router-components/browser-router). This setting exists to support the static github pages demo site. |

## Testing
Run the following command from the root of the project
```
npm run test
```
