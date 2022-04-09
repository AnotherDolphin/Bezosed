# Bezos Budget Challenge

This web app prcossses personal transactions to determines the amount and % of Bezos-related expenditure

## Implementaiton

### Backend: *Node js* (/server)
- **ES6** compliant with imports and top level awaits
- **Express** powered server with CORS and application/JSON enabled
- **Node-fetch** to get and check transaction API data
- **MongoDB** to save transaction history, updates, and user settings

#### Endpoints:
GET `/transactions` to send transactions data to frontend

POST `/reassign` to save user changes to a company's Bezos-related status

### Frontend: *React* (/web-app)
- Lists all transactions and distinguishes Bezos related ones
- Displays amount spent on Bezos and its % of total
![bezos-ui](https://user-images.githubusercontent.com/46499432/162577455-fc2a2743-2054-4803-b647-0a416a2f584c.png)
- Hover on transaction to view switch to change company's Bezos status
![bezos-hover](https://user-images.githubusercontent.com/46499432/162577481-1e0eb966-a9ef-48a6-b56c-953fcc613a2a.png)
- All components react to user changes and server updates

### USAGE

Fork/clone the repository to a local directory

Run `npm install` in both the **/server** and the **/webapp** directories to get all dependencies

Start your [local MongoDB](https://www.mongodb.com/docs/guides/server/install/) server

Run `node .` in the server directory to start the backend server

Lastly, run `npm start` in the webapp directory to open the React webapp
