I. App endpoint & features & Actions

1. Login: /

2. Register: /register

3. Home: /home + /home/:id
   3.1. Features

- List transactions
- Show balance

  3.2. Actions

- CRUD operations on transaction

4. Resources: /resources (Optional)
   To list advices from community, wel-known authors,etc

5. Plan: /plan
   To add & list monthly goals

6. Profile: /profile

II. DB: MongoDB

1. Setup Atlas

2. Schemas
   2.1. User
   username: string
   email: string
   password: string

2.2. Transaction
Type: string (eg: Deposit/Withdrawal)
Categories: String (eg. Food)
Amount: Number
Date: default current date

2.3. Goals
Expenses: Number (For each categories)
Gains: Number

III. Folder setup: Backend & Frontend

- npm init
- git init
- npx create-react-app frontend
- Delete gitignore in frontend: rm -rf .git & delete manually
- Push to github
- npm i express mongoose dotenv
- npm i --save-dev concurrently nodemon
- mkdir backend

IV. Workflow logic

IV.1. BACKEND

- Config folder for DB
- Server
- Models for user & transactions : You may add pre & post & static method on schema + npm i validator => for email
- Either store the jwt in the cookie (npm i cookie-parser) or json send the jwt to frontend & use auth for request
- utils folder to generate token: npm i jsonwebtoken
- Middleware folder: for authentication & error handling
- bcrypt to hash password in controllers
- Routes (express.Router())
- Controllers (CRUD)

IV.2. FRONTEND

Have a design so you can follow

- In backend: npm i concurrently --save-dev & in package.json add the scripts to run backend & frontend concurrently
- In frontend: Add proxy "proxy": "http://127.0.0.1:5000" in package.json
- npm i axios
- npm i react-router-dom : for routes between pages
- npm i react-helmet : for dynamic meta (eg: title, meta) +> to be used in screen
- npm i react-icons :
- Add folders: components & screens
