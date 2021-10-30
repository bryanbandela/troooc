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
