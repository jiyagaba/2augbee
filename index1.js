const express=require("express");
//importing data.json file
const  data=require("./data.json");
//importing file
const fs=require("fs");
//Stire express value in app
let app=express();
//1Create
//2 Read
//3Update
app.put("/update/:id",(req,res)=>
{
    let userId=req.params.id;
    let database=data;//array of user
    //comparison between element id found and user requested id
    let indexOfUser=database.findIndex((elm)=>elm.id==userId);
    //we have to check if id present find index >0 and -1 <0then not present 
    if(indexOfUser>=0)
    {
        let user=database[indexOfUser];//User Data
        //data destructure
        let {name,email,password}= req.body;
        //we have to modify every detail lefting id as user will be lost
        //So we find the id of user
        let id=user.id;
        //Now we will cjhange the data of user,we keep object of user(push)at this index value database array
        //database object modify
        database[indexOfUser]={
            //Here we will pass id ,email,password that we reqquested
            id:id,
            name:name,
            email:email,
            password:password
        }
        //JSON IS CALSS AND STRINGIFY IS METHOD
        let stringified=JSON.stringify(database);
        //NOw we havto save this in filesystem
        fs.writeFile("dataa.json",stringified,(err)=>
        {
            if(err)
            {
                console.log("Errror");
            }
            else
            {
                //response of modified value of user 
                res.send(database[indexOfUser]);
            }
        })
        


    }else
    {
        //If user id not found
        res.send(`404:Not found! ${userId}: ID NOT FOUND`);
    }

});
//4Update1
app.patch("/update-one",(req,res)=>
{
    res.send("Patch request received");
});
//5 . Delete
app.delete("/delete",(req,res)=>
{
    res.send("Delete request recevied");

});
//port number
const port=4000;
app.listen(port,(err)=>
{

    if(err)
    {
        console.log("Error");
    }
    else
    {
        console.log(`Server is running on port:${port}`);
    }
})

