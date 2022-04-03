# What is this app

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
This is a chatting app created using ReactJs, axios, Socket.io, express and mongoDb.

This app was created as a coding challenge.

## File Structure
[uniserver-be](https://github.com/DShah-git/uniserver/tree/main/uniserver-fe) is the front-end react app and follow the usual react file structure.

###Instruction for running

1. run `npm install` to install the node_modules.
2. run `npm start` to start the application in **PORT 3000**


[uniserver-fe](https://github.com/DShah-git/uniserver/tree/main/uniserver-be) is the backend express app and follows the usual express/server file structure.

###Instruction for running

1. run `npm install` to install the node_modules.
2. Make a env file and enter a database variable like `mongodb+srv://{USERNAME}:{PASSWORD}@{CLUSTER}/{DATABASE}?retryWrites=true&w=majority`. See the MongoDB documentation on how to connect a application to your own database.
3. run `npm start` to start the application in **PORT 5000**


##Some unique features and things that can be improved
1. Auto load old chat logs on chat page load. Chatting will still work while this process is going on. (This can be improved by making the chat space a component and making 2 states for old chat messages and new one, so rendering of one doesn't affect the other).
2. Auto smooth scroll when new messages are rendered and sharp scroll at the bottom of chat on old messages render.
3. Users are being saved. So we can see who is online. (The component is not created. Can create a API to fetch and render this list and create a event to fetch new users as they join).
4. (Typing bubble. Create a event when a user starts typing and communicate that to IO to render a "isTyping" bubble with the users name)





Here are some screen shots from frontend
![1](https://user-images.githubusercontent.com/88405970/161436614-f84a473a-7ec4-4348-8b94-dd3c9179bf9d.PNG)
![2](https://user-images.githubusercontent.com/88405970/161436633-8915b20c-0196-424a-a0bb-6a9350e26fa3.PNG)
