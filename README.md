# Hotel-Service

Purpose of the repo
===================
Backend service to manager a hotel room bookings, config and its inventory.

Description
===================
This Project contains hotel service APIs to fetch room inventory data based on room type and to update the same. Async-lock is being used to handle the concurrency and new relic has been setup for the monitoring purpose.


Stack used
==========
The stack used for developing is described as below :
* [NodeJS](https://nodejs.org/en/)
* [ExpressJS](https://expressjs.com/)
* [Npm](https://www.npmjs.com/)
* [Sequelize](https://www.npmjs.com/package/sequelize)

Steps for Setup
===============
> Make sure Github local credentials are setup in your system and SSH keys added in your profile with appropriate priviledges before proceeding. You can refer to [Setup Git](https://help.github.com/articles/set-up-git/) tutorial for help.
### 1. Clone the repository in workspace of your local system using:
```
git clone https://github.com/akg104/hotel-service.git
```
### 2. Change the current directory to folder of local repository
```
cd hotel-service
```
### 3. In the directory, install node dependencies from the *package.json*
```
npm install
```
### 4. Copy the .env.example file into .env to have local parameters for running the application and update the values in .env
```
cp .env.example .env
```
### 5. Create a DB 'hotel_service' on localhost. Rest, Sequelize will handle the migration part.
```
mysql> create database hotel_service
```
### 6. Run npm script to start the build process.
  1. Development environment
     *  Start the build process manually.
       ```
         npm start
       ```

    This will start the server on port defined in .env under `PORT`, which can be accessed through the URL [http://localhost:{PORT}](http://localhost:{portName}) (e.g. http://localhost:8000)

### Todos

 - Write MORE Tests
