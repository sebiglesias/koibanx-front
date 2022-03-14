# Koibanx Front Challenge

Used [create-react-app](https://create-react-app.dev/) with [Typescript](https://www.typescriptlang.org/), [Redux](https://redux.js.org/) and [Material UI](https://mui.com/) for some components (Not the table).

## Run

Using node version `v16.13.2` run the following commands

```bash
# installs dependencies
npm i 
# starts the application in development mode
npm start
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Assumptions and Caveats 

- *Generic Table*: I tried making the table quite "generic". Even if the object of the data changes, the developer can
easily add a string to an array in the App.tsx file. Same occurs with filters and "orderable" columns. I laid ground for
 including different types of filters for different data types in the searchbox as well.
- *Table search approach*: I thought of making the AWS table approach, where some filters affect the local data shown in
 the table without making a new request. At the end I went with sending a request with anything that affects the query 
parameter, EXCEPT when typing on the search box, as I found it a bit annoying to type 1 character and send a request.
- *Not taking security precautions*: I just copied and pasted the input from several filters, but the input in the 
searchbox can be used to send "sql-injection-ish" requests, I decided those checkups go beyond the scope of this challenge, 
 but it could be implemented somewhere around the method that generates the queryParameter or even at the component level, 
restricting available input.