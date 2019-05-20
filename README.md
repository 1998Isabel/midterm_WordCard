# Vocabulary Word Card

A web-based study application that allows students to memorize vocabulary words via flipped cards.

### How to start?

1. Clone the repository
2. Use `npm install` to install packages for backend
3. Then `cd client` and use `npm install` to install packages for front end
4. After installing, `cd ..` to go back to the root directory and use `node server.js` to run the server
5. Then `cd client` and use `npm start` to run the client
6. The website should now running on `localhost:3000`

### How it works?

Unflipped Cards            |  Flippable Cards
:-------------------------:|:-------------------------:
![](https://i.imgur.com/cUf4UEg.png)  |  ![](https://i.imgur.com/EQTAe3O.png)


     
* Your word list will be sorted by `Times appeared` of each word in descending order. (My main function!)
* You can add your vocabulary words by entering the text fields on the side, and press `ADD WORD`.
* If a word was already in your word list, the number of `Times appeared` on the card will increase and the card will move forward.
* You can delete the word by pressing the `delete` icon, or you can clear the whole word list by pressing `DELETE ALL` on the side.
* Switch the `Flip Cards` on the side can change your cards to flippable cards, enable you to start learning your vocabulary words.


### Development
* Client-side programs in React.js
* Server-side programs in Express (Node.js)
* Database in Mongodb

### My Contribution

Design the user interface and the functions, and all the implementation except the packages mensioned above.

### Reflection

* Their are lots of useful packages available for your react app, like material-ui makes my app's interface a little bit like Google's.
* Using server to do some action is quite convenient XD
* The bugs I met while using `socket.io` still confused me a lot...
