# Stack Organizer
A helpful web application that lets developers search through Stack Overflow and save their desired questions or answers inside dedicated projects and folders.

[Project Details](https://www.sanberk.dev/stack-organizer) / [Live Site](https://stack-organizer.sanberk.dev/)

## Purpose of The Project
I built Stack Organizer because I realized I kept getting lost in multiple Stack Overflow tabs for different problems every time I was working on a project.

You search for one problem and find a solution, but that solution leads to another problem, then that leads to another, then another...

So I decided to solve this problem by building an organizing app that allows you to save your desired solutions inside a dedicated project or inside categorized nested folders to keep things even more organized.

## Tech Stack
- React
- Redux
- Sass
- Firebase Realtime Database
- Firebase Authentication
- Jest

## Features

### Authentication
https://user-images.githubusercontent.com/69405619/158071150-2fca4120-66e3-47a6-9670-bdd466ec2e6b.mp4

### CRUD Operations

https://user-images.githubusercontent.com/69405619/158071171-605dfc81-c67d-4b73-964a-c0d641889219.mp4

### Search through Stack Overflow

https://user-images.githubusercontent.com/69405619/158071199-2d53ee02-451e-4a2f-989b-cd6da4573a22.mp4

### Custom File System

https://user-images.githubusercontent.com/69405619/158071252-899ac85e-24f1-429d-8ed1-d789055e0a53.mp4

### Local Setup
> **Note**
>
> Node version 16.13.0 is recommended
>
> Java needs to be installed for Firebase Emulators to work

***Automated tests can be seen in repository's [Actions](https://github.com/sanberkHax/stack-organizer/actions) tab. But to run tests locally, follow the testing step below.***

#### Prerequisites:
Rename `.env.example` file to `.env` to use testing credentials for Firebase  

Run `npm install` to install dependencies

**Testing:**  
Install Firebase CLI for emulators with `npm install -g firebase-tools`

Run tests through firebase emulators with `firebase emulators:exec --project stack-organizer 'npm run test-ci'` 

> :warning: *It's a slow process, so don't worry if it looks stuck and nothing happens.*

**Development:**   
Run `npm start` to start the project in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser




