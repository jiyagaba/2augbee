//used to import express.js framework into node.js application
const express = require("express");
//import data from a JSON 
const data = require("./data.json");
// import the File System (FS) module in Node.js.
const fs = require("fs");
//create a new Express.js application instance, which is stored in the app variable
let app = express();
//used to parse JSON data sent in the request body
app.use(express.urlencoded({ extended: false }));

// Update
app.put("/update/:id",(req,res) => {
    // gets the user ID from the URL parameter :id.
    let userID = req.params.id;
    // server receives the request and stores the request body in the req.body object. 
    //The destructuring assignment would then extract the name, email, and password properties
    // from the req.body object
    // and assign them to variables:
    let {name, email , password} = req.body;

    let database = data; //array of user data
    //finds the index of a user in the database array based on the userID.
    let indexOfUser = database.findIndex((elm) => elm.id == userID);
    //we have to check if id present find index >0 and -1 <0then not present 
    if(indexOfUser>=0){
        let user = database[indexOfUser];  // array of user data

        let id = user.id; //getting the id so it doesnt get lost while modifying
        //updates the user data in the database array at the index specified by indexOfUser.
        database[indexOfUser]={
            id : id ,
            name : name,
            email : email,
            password : password
        };

        let stringified = JSON.stringify(database);

        fs.writeFile("data.json",stringified,(err) => {
            if(err) console.log(err);
            //This line sends the updated user data 
            else{
                res.send(database[indexOfUser]);
            }
        });
    }
    else{
        res.send(`${userID} not present in the database`);
    }
});

// Patch
app.patch("/update-one/:userid",(req,res) => {
    // gets the user ID from the URL parameter :id.
    let userid=req.params.userid;
    //extracts the value of the name parameter from the query string of the incoming HTTP request.
    let name=req.query.name;
    let database=data;
    let indexOfUser=database.findIndex((elm)=>elm.id==userid)
    if(indexOfUser>=0)
    {
        //name change
        database[indexOfUser].name=name;
        //stringify database
        let stringified=JSON.stringify(database);
        fs.writeFile("data.json",stringified,(err)=>
        {
            if(err)
            {
                console.log(err);
            }
            else
            {
                //object send so user can see
                res.send(database[indexOfUser]);
            }
        });

    }
    else
    {
        res.send(` 404:Not Found!  ${userid} not found  `)
    }
});

app.delete("/delete/:userID",(req,res) => {
    let userId=req.params.userID;
    let database=data;
    let indexOfUser=database.findIndex((elm)=>elm.id==userId);
    // if the index of the matching element is greater than or equal to 0. 
    //If it is, 
    //it means that the element was found in the database array.
    if(indexOfUser>=0){
          //filter true show in array if false exclude
          //if not equal remove it
          //match not then remove
          let filter=database.filter((elm)=>elm.id!=userId);
          let stringified=JSON.stringify(filter);
          fs.writeFile("data.json",stringified,(err)=>
        {
            if(err)
            {
                console.log("Error");
            }
            else
            {
                res.send(`${userId} you requested is removed from database`);
            }

        })

    }
    else
    {
        res.send(`Requested ${userId} not found`)
    }
    
  

  
});
//port number
const port = 5000;
app.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server is running on port :${port}`);
    }
});