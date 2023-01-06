const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended: true}));



let items = {};

fs.readFile('file.json', 'utf-8', function(err, data){
    if(err){
        console.error(err);
        return;
    }
    items = JSON.parse(data);
})

app.get("/", function(request, response){

    let date = new Date();

    let dateOptions = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    
    let today = date.toLocaleDateString("en-US", dateOptions);

    response.render("list", {day: today, listItems: items});
});

app.post("/", function(request, response){
    let item = request.body.newItem;
    let jsonItem = {description: item, accomplish: false};
    items.tasks.push(jsonItem);
    jsonContent = JSON.stringify(items);

    fs.writeFile('file.json', jsonContent , 'utf-8', function(err){
        if(err) throw err;
    })

    response.redirect("/");
});

app.listen(3000, function(){
    console.log("Server running on 3000");
});