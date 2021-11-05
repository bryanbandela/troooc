1. Backend file export/require
   Use the common JS (USe module.exports = ..). Don't use import/export (available in the newer version)

2. Async/Await 
   Make sure you add async in the relevant function including the callback

3. Error when nodemon restart
   When the server file is not the last file to be saved nodemon will crash.