# Weather App

An [Odin Project](https://www.theodinproject.com/lessons/javascript-weather-app) in the Javascript course to practice fetching data from an API and using promises, in this case with the async/await syntax.

This simple weather app uses the Open Weather Map API to search for the current weather of a US city. User can search by city name or zipcode. When searching by city name, I display the top 5 results for the user to select one. This is why, due to time constraints, this app searches US locations only-- to use the API's default logic on "top 5 results", rather than write my own.


## Features

- A slide out menu for search bar and tool bar. 

- The background changes according to 6 different weather types. I dont distinguish between things like "Drizzle" and "Rain", and it doesnt take into account day/night.


## Notes

The API key is exposed here. That was left intentionally given I dont have a backend to secure it and its a public key anyway.


## Reflections

This was my first time implementing promises. I have a variable that can be set in two different ways from two separate fetch requests so my ideal solution seemed to be to create a promise that resolves when that variable is set. However, I didnt find a good implementation of this in time so im currently handling the calls to my display functions in two separate places, and two separate files even. Obviously not ideal at all.I'd really like to completely re organize this entire project.