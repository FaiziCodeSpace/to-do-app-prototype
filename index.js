import express from 'express';
import path from 'path';
import url from 'url';
import dotenv from 'dotenv';
const app = express();
const __fileName = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName); 
app.set('view engine', 'ejs');
app.set('views', 'public');
dotenv.config();
const PORT = process.env.PORT || 3000;
let tasks = [];

// body middlware 
app.use(express.urlencoded());

app.get('/tasks', (req, res)=>{
    res.render('to-do', {tasks, error: null});
});

app.post('/add', (req, res)=>{
    const { task } = req.body;
    const alreadyExists = tasks.some(t => t.toLowerCase() === task.toLowerCase());
    if(alreadyExists){
        return res.render('to-do', {tasks, error: 'Task already Exists!'});
    }
    tasks.push(task);
    res.redirect('/tasks');
})

app.post('/delete', (req, res)=>{
    const index = parseInt(req.body.index);
    if(!isNaN(index)){
        tasks.splice(index, 1);
    }
    res.redirect('/tasks');

})

app.listen(PORT, ()=>{
    console.log(`http://localhost:${PORT}/tasks`);
})