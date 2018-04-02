# Neighbourhood Map App
This project contains the file for Udacity Neighbourhood Map Project.

To run the application, open `index.html` on a browser.

## Requirements
Libraries: Knockout JS, JQuery  
APIs: Google Maps API, Wikipedia

Install Knockout through `npm install knockout` in the project folder.

## Project Overview
This repository covers the requirements for Udacity - Full Stack Web Development Neighbourhood app project.

The project displays a list of locations in the following interfaces:
1. Map View - Display markers on a google map.
2. List View - Display a dynamic list of locations through Knowckout JS.

The app relies on Google Maps API to handle all markers and infowindows.
Relevant links are retrieved asynchronously from Wikipedia API.

The List View is dynamically updated through a ko.computed() instance.

The tasks covered by the app are:
1. Display all visible categories.
2. Apply text filters on both List and Map View.
3. Display unique information about the markers when selected through the map or the list.
4. Show/Hide markers from the map.

## Credits
All maps are sourced from Google Maps API.
Fonts are from FontAwesome and Google Fonts.
