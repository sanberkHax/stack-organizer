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

## Problems I have Faced
- ### File System
Even though I made a proper plan before writing any code, I highly underestimated how complicated the file system was.

As I dived into implementation in the "Save As" modal first and succesfully implemented project selection, I got completely stuck with the folder selection. Since it needed to have nested folders, it couldn't just be a dropdown selection. And because I had a very specific design for it, I couldn't find any third party library to fit my needs.

After days of researching how to properly store nested data in redux and database, learning more about normalized data and bunch of trial and errors. I finally managed to make it work.

While it was a tough challenge, I really enjoyed getting my hands dirty with something like this, it was a great learning experience.

- ### Firebase
Even though I've used Firebase in my other projects before, none of those projects scale was as big as this one. So I spent few days how to properly integrate Firebase with Automated Testing and Redux.

## What I have Learned
This whole project was a challenge on another level but also a great opportunity to improve my knowledge, because stepping out of my comfort zone and diving right into something new is the best way for me to learn something.

I've learned how to manage complex states with Redux and how to store data efficiently in database to work with.

Greatly improved my knowledge on Automated Testing.

Got the grasp of managing a bigger scale project from start to finish.

And found out Stack Organizer is actually useful, because I kept getting lost inside multiple Stack Overflow tabs and wished I had built it sooner.
After dealing with bunch of small bugs, I eventually set up Firebase Emulators for Automated Testing to mock Firebase services in tests.
