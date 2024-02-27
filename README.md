# Ricknmorty

This project was generated with Angular version 17.2.1.

## Development server

First, Run `npm install` to download and install all the necessary dependencies.

Then you need to have installed the minimum Node.js version of `v18.13` required by Angular Cli

Finnally, you must be able to:
Run `ng serve` or `npm start`  for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test` or ``npm run test`` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## The App

The application demonstrates the use of reactive programming, incorporates state management, and exhibits scalability through the reuse of components. It avoids hardcoded information and maintains 100% typed code, utilizing interfaces to represent entities within the application.

Furthermore, the application is effective due to the implementation of Lazy Loading modules, ensuring modular scalability and leveraging Angular routing for enhanced performance.

Lastly, each component is thoroughly covered by unit testing, as well as the services.

## Libraries Implemented

### RxJs

It's used a certain list of function and operators from this library:
  * Observable: They are fundamental in handling asynchronous operations and events in a reactive manner.
  * of: It's handy for converting static values, arrays, or arguments into an observable sequence.
  * take: because allows you to limit the number of emitted values from an observable. We have it implemented to get the Detail$ from the state if there are. 
  * tap: used for side-effects in the observable pipeline. It allows you to perform actions or log information without modifying the emitted values.
  * shareReplay: the operator to cache and replay the latest emitted value to one subscriber. This is beneficial to avoid unnecessary HTTP requests.
  * catchError: to handle errors in observables.

### NgRx

NgRx is a state management library for Angular applications, based on the principles of Redux. It provides a predictable state container to manage and share the state across different components.
In this project, NgRx is employed to handle application state efficiently, preventing over-requesting and minimizing unnecessary back-and-forth of information. It offers a powerful data store, facilitating an asynchronous programming approach when switching between components.



