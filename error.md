1. Backend file export/require
   Use the common JS (USe module.exports = ..). Don't use import/export (available in the newer version)

2. Async/Await
   Make sure you add async in the relevant function including the callback

3. Error when nodemon restart
   When the server file is not the last file to be saved nodemon will crash.

4. Promise not handled
   When try & catch is not used for async/await

5. In the new react:

- In index.js : Import {BrowserRoute} from react-router-dom & wrap <App />
- In App.js : Use Routes & Route

6. Object not iterable: In reducer
   Cause: the transactions array was undefined after first dispatch
   Solution: Make sure I return the previous state to have transactions as an array
   Tips: Use console.log to debug logical error

7. Objects are not valid as a React child : see the cause
   My cause was the date format

8. e.preventDefault() behavior: it works when you insert the method in the form tag, not in the button

9. I fixed the cors message with npm i cors

10. React-helmet seems deprecated. SO use React-helmet-async (At the end of project)