# Welcome to the Testing Hackathon
This is the 3rd Hackathon created by and for you.

## Required Commands 

1.- Once the repository is cloned, run:

```bash
npm install
```

2.- Next, to start the application, run:

```bash
ng serve
```

3.- Once the application is running, proceed to install Playwright (it is recommended to open another terminal):

```bash
npm init playwright@latest
```

4.- Once installed, to run the tool, use (it is recommended to open another terminal):

```bash
npx playwright test --ui
```

## General Instructions

The tests will be written in the file \tests\example.spec.ts, and the guidelines for each of them are described below:

1.- Perform a request to the endpoint https://rickandmortyapi.com/api/character, validate that the response to the request was successful, and store at least 5 characters from that response in a variable, ensuring that these 5 characters are displayed in the Playwright Console.

2.- Rick and Morty want to reach the Lexis Nexis offices but do not know the coordinates. Go to the Map screen and fill in the inputs with the following information: Latitude: 19.429727460769172, Longitude: -99.1636975795175. Once the inputs are filled, you must confirm and validate that the map zooms in on the provided coordinates.

3.- Rick has unfinished business with Abradolf Lincler. Navigate to the Characters screen and make sure that the modal information is visible by clicking on Abradolf Lincler’s card.

4.- Perform a request to the endpoint https://rickandmortyapi.com/api/episode, validate that the response to the request was successful, and print in the console the 5 characters with the most appearances in the first 12 episodes.