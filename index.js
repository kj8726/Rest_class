const express = require("express");
const app = express();
const port =8080;
const path = require("path");
const { v4: uuidv4 }= require('uuid');


app.use(express.urlencoded({extended : true}));
app.use(express.json()); 
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

let posts =[
    {
        id:uuidv4(),
        username : "kunal",
        content : "engineeer"
    },
    {
        username : "abhay",
        id:uuidv4(),
        content : "doctor"
    },
    {
        username : "ram",
        id:uuidv4(),
        content : "java"
    }
];
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
    console.log("/posts is being accessed");
    
})

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    console.log(id);
    
    let post = posts.find((p) => id === p.id);
if (!post) {
        console.log("Post not found");
        return res.status(404).send("Post not found");
    }
    console.log("post found");
    console.log("/posts/:id is being accessed");
    
        res.render("show.ejs", { post });
});

app.patch("/posts/:id",(req,res)=>{
    let { id } = req.params;
    let newContent = req.body.content
    console.log(newContent);

    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(posts);
    
    res.send("patch request working");
})

app.get("/posts/new", (req, res) => {
    console.log("/posts/new is being accessed");
    try {
        res.render("new.ejs");
    } catch (error) {
        console.error("Error rendering new.ejs:", error);
        res.status(500).send("Error loading the new post form");
    }
});

app.get("/",(req,res)=>{
    console.log("/ is being accessed");
    res.send("server working correct");
});

app.get("/regist",(req,res)=>{
    console.log("/regist is being accessed");
    res.send("you are online");
})
app.post("/posts", (req, res) => {
    console.log(req.body); // Debugging line
    let { username, content } = req.body;
    if (!username || !content) {
        return res.status(400).send("Username and content are required");
    }
    let id = uuidv4();
    let newPost = { id, username, content };
    posts.push(newPost);
    console.log("New post created:", newPost); // Debugging log
    console.log("Updated posts array:", posts); // Debugging log

    // Redirect to the newly created post's page
    res.redirect(`/posts/${id}`);
});

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p)=>id === p.id);
    res.render("edit.ejs",{post});
})

app.listen(port,(req,res)=>{
    console.log("server is online");
    
})