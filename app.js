// const apiKey = "b85fc5c9d3eb76ac5f3d3fd4f6932d1c-us13";
const https = require("https");
const express = require("express");
const bodyParser = require("body-parser");
const requests = require("request");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req,res) => {
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;
    const data = {
        members: [
            {
                email_address:email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us13.api.mailchimp.com/3.0/lists/f6a63398d2";
    const options = {
        method: "POST",
        auth:"Tawai1:3048f6f95b3bd4b1b8e80edfabd2d488-us13"
    };
    const request = https.request(url, options, (response) => {
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", (data)=> {
            console.log(JSON.parse(data));
        });
    });
    request.write(jsonData);
    request.end();

    
});

app.post("/failure", (req,res)=> {
    res.redirect("/");
});

app.listen(process.env.PORT||3000, () => {
    console.log("Listening on port 3000");
});

// audience id
// f6a63398d2
