# Movie Picker app

I knew from the beginning that I would want to create a project that uses a movie API as it's something i'm quite passionate about and as a Letterboxd user I was planning on using their API but unfortunately it seems that it is closed to public use. 

Fortunately enough the TMDB(themoviedb.org) API turned out to be perfect for my use case and the JSON data was quite neatly formatted so it was a breeze to use.

So, if you're ever in the situation where you can't think of a film to watch, this tiny web app will provide one for you, randomly, from a huge list of top rated films.

The app also features a persistent watchlist to which you can add or remove films.

The logo for the app was designed in Adobe Illustrator and exported as an ".svg".

## Link

https://harmonious-ganache-bbe92d.netlify.app/

## Usage

The user can click on the "Choose a movie" button in order to display a randomly pick from a list of top rated films. 

When the user arrives at a film that seems promising, he can choose to add it to his watchlist by clicking the purple "Add to watchlist" button. The movie will be added in the bottom container, alongside other movies.

If the user desires to remove a film from the container he can hover with the mouse at the top of the specific movie poster of which he wishes to remove and a "X" icon will appear which when clicked will remove the item from the watchlist as well as from the local storage.

## Project lookback and future considerations 

One of the challenges that I faced was making the movies displayed as randomized as I could, as the film was initially picked from an array with a length of 20, so in order to randomize even more I decided to refresh the window each time the random button is pressed in order to not have to pick from the same array list everytime.

Other than that, I can't think of any other issue that was particulary more challenging than on other projects as by this point I had completed quite a few and I made use of a lot of previously acquired knowledge, so for the most part it was smooth sailing.

I also made use of local storage for this project in order to simulate data persistance as the project features a watchlist where you can save the preferred film. I plan on adding a "clear all" button for the watchlist as well, in order the delete all the items at once without having to remove each film individually.
