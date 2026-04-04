const express = require('express');
const app = express();
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");

let port = 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'));


app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
});

let arr = [];

app.get("/", (req, res) => {
    res.redirect("/tasks");
});

app.get("/tasks", (req, res) => {
    res.render("index.ejs", { arr });
});

app.get("/tasks/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/tasks", (req, res) => {
    let id = uuidv4();
    let task = req.body.task;
    arr.push({ id, task, done: false });
    res.redirect("/tasks");
});

app.get("/tasks/:id/edit", (req, res) => {
    let { id } = req.params;
    let work = arr.find((a) => id === a.id);
    
    res.render("edit.ejs", { work : work });
});

app.patch("/tasks/:id", (req, res) => {
    let { id } = req.params;
    let task = req.body.task;
    let work = arr.find((a) => id === a.id);
    work.task = task;
    res.redirect("/tasks");
});

app.delete("/tasks/:id", (req, res) => {
    let { id } = req.params;
    let work = arr.find((a) => id === a.id);
    let idx = arr.indexOf(work);
    arr.splice(idx, 1);
    res.redirect("/tasks");
});

app.patch("/tasks/:id/toggle", (req, res) => {
    let { id } = req.params;

    let work = arr.find((a) => id === a.id);
    work.done = !work.done;

    res.redirect("/tasks");
});