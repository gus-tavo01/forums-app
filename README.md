# Forums App

This React app was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

App available [here](https://forums-app.herokuapp.com/)

## Getting started

### Install project dependencies

must have nodejs installed

- npm install

### Run the project

starts the app on [http://localhost:3000](http://localhost:3000)
The page will reload if the code is edited.

- npm start

### Test

Run ui tests

- npm run test

### Build the application

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

- npm run build

## Pending Core functionality

### Public forums

- if no forums, disable pagination buttons
- add floating action create button (if auth)

### Forum details

### Topic page

- implement topics list component
- implement comments service
- add spinner when load comments

## Known issuess

- none 😮

## To be defined

- UI testing strategy
- Error handling
  - on api calls
  - on forms fill
- About Page
  - add my photo
  - short self description
  - my cats photo
- Redux
  - errors reducer
  - auth reducer
  - modals reducer?
- App languages
  - switch language
    - english
    - spanish
  - read language from user preferences

## Incoming features

- View forum details
  - participants (when auth)
- Login
- Register
- Forgot password
- Password reset
- View my profile
- Create a forum
- Create a topic
- Post a comment
- Invite users to a forum
- Switch language
- Change app theme
- Select an image for the forum
- Select an avatar image
