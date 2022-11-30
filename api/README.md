## listo API

Written in Express.JS, uses SQLite for the Database and Winston for logging. 

## Development

### Installing Packages
listo uses npm workspaces, so the packages should be installed from the root package.json. Refer to the main README file for [installing packages](https://github.com/beakerandjake/listo#install-packages)

### Run Locally
Refer to main README for [running the Client and the API together](https://github.com/beakerandjake/listo#run-locally). 

To only run the API, run the following command from the root of the project
```
npm run dev:api
```

This will:
* Run the app via nodemon at http://localhost:3001 (see [configuration](https://github.com/beakerandjake/listo/tree/main/api#configuration) for information on how to change the port).
* Create an `items.db` file at the root of the api project if one does not already exist. 

## Documentation

API is fully documented in Swagger, when running locally the Swagger doc can be found at http://localhost:3001/api/docs

![Screenshot 2022-11-30 at 13-47-57 listo api](https://user-images.githubusercontent.com/1727349/204904907-f7f45d75-d99e-42e0-ad2c-44729b0e46fb.png)

## Configuration 

Configuration is handled by the [config](https://www.npmjs.com/package/config) package. Configuration files are located at `./api/config`

Configuration is overwritten based on the node environment.

### Settings of Note
| Name      | Description |
| ----------- | ----------- |
| port      | What port should express listen to requests on?       | 
| logging.level   | The value of the [winston logging level](https://github.com/winstonjs/winston#logging-levels) to use        |
| sqlite.dbLocation | Location on the system where the database will be created and stored. Ensure that the process has permissions to create this file if it does not already exist.|
