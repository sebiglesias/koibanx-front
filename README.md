# Koibanx Front Challenge


https://user-images.githubusercontent.com/13668861/158085189-ca562b44-5eda-4fd8-93c4-76ebd18c89e1.mov


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

- **Generic Table**: I tried making the table quite "generic". Even if the object of the data changes, the developer can
easily add a string to an array in the App.tsx file. Same occurs with filters and "orderable" columns. I laid the ground for
 including different types of filters for different data types in the search box as well.
- **Table search approach**: I thought of making the AWS table approach, where some filters affect the local data shown in
 the table without making a new request. In the end, I went with sending a request with anything that affects the query 
parameter, EXCEPT when typing on the search box, as I found it a bit annoying to type 1 character and send a request.
- **Not taking security precautions**: I just copied and pasted the input from several filters, but the input in the 
search box can be used to send "SQL-injection-ish" requests, I decided those checkups go beyond the scope of this challenge, 
 but it could be implemented somewhere around the method that generates the query parameter or even at the component level, 
restricting available input.
- **Table CSS**: I used some CSS from and icons from the [MUI](https://mui.com/) library, but did not use any of their components
 for the table.
- **Column ordering**: I did the column order in a bit of a rush, I misread the assignment and skipped that. I only realized when I gave the challenge a final check-up, and its CSS is not my best work but the video shows its functionality. Just in case it is not understandable, columns start as unordered, click once and they are ordered ASC, click once more and they are ordered DESC, (now the arrow is red) click a final time and the ordering should be canceled.
- **Output**: I'm showing a notification whenever a request should be sent, and also showing the result in the console.
