# Anime Web Application

# Table of Contents

- [General Information](#General Information)
- [File Structure for Backend](#File Structure for Backend)
- [Main Technologies](#Main Technologies)
- [Launch](#Launch)
- [Generating the documentation](#Generating the documentation)
- [Needed environmental variables](#Needed environmental variables)
- [Plans for future](#Plans for future)

# General Information
## General

This is a web application created for my Bachelor's Degree. It's one of 2 parts - [link to Backend here](https://github.com/TheSausages/Anime_Web_Application-Backend "Backend").
The main desire for creating this app was to enable both Polish and international users to access information and discuss Anime.
Users would be able to find selected anime, get detailed information on it and, if they want to, discuss it with others. 

## Frontend specific

The aim for the frontend portion of the application was to create a web application that would look good on both pc and mobile devices. Additionaly, user should be able to change languages on the fly.

# File Structure for Frontend

The structure should at least consist of these files and folders:
1) build - folder appears when the app is build
2) node_modules, nodejs, npm - folders containing elements needed to run the app.
3) public - folders containing elelents that should be public, like favion or the starting html file *index.html*
4) src - folder with code
5) package-lock.json and package.json - files containing information on the app, like dependencies
6) tsconfig.json - configuration of the typeScript elements

Additionally, if Backend is used, both front- and backend folders must be in the same folder and have the names:
- *Any Name* - for backend
- *ReactFrontEnd* for frontend

If the frontend folder has any other name, please change the *ReactFrontEnd* value to the correct value in the *gradle.build* file in backend.

# Main Technologies

- Visual Studio Code
- React 17.0.2
- TypeScript 4.3.5
- Material UI 5
- I18next 21.3.3
- yup 0.32.9

# Launch

1) In order to launch the frontend locally, use the command:
    ```shell
    npm start
    ```

2) In order to build the application, use:
    ```shell
    npm run build
    ```

3) If frontend is build together with backend and server as static data, the building is done by the backend. [More here](https://github.com/TheSausages/Anime_Web_Application-Backend#Launch).

# Generating the documentation

In order to generate the documentation, use:
```shell
npx typedoc ./src
```

The documentation will be available in the *documentation* folder. please start with the *index.html* file.
For this generation setup, each component is it's each own module.

# Plans for future

- when clicking button, make it load
- better min/max itp for yups
- write tests
- make backend calls cancelable
- Add user picture (together with backend)
- add sort by for both queries (together with backend)
- Adjust dto to whats needed (together with backend)
- when changing anime using link in relations, add loading

# Miscellaneous

The 'favicon' is provided by Font Awesome.

* [Link to site with icon](https://fontawesome.com/v5.15/icons/phoenix-framework)
* [Link to the license](https://fontawesome.com/license)
* Color of the icon was changes