const express = require('express');

const hostname = '127.0.0.1';
const port = 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static(__dirname + '/wwwroot'));

let films = [];

app.get('/films', (req, res) =>{
    res.json(films);
});

app.post('/films', (req, res) =>{
    if(!req.body || !+req.body.id || !req.body.director || !req.body.title 
        || !req.body.genre || !+req.body.year || !req.body.time){
        res.sendStatus(400);
        return;
    }
    if(+req.body.id == -1){
        films.push({
            id: (films.length > 0 ? films[films.length - 1].id + 1 : 1),
            title: req.body.title,
            director: req.body.director,
            genre: req.body.genre,
            year: req.body.year,
            time: req.body.time
        });
        res.json(films[films.length - 1]);
    }
    else{
        let temp = films.find(i => i.id == req.body.id);
        if(!temp){
            res.sendStatus(400);
            return;
        }
        temp.title = req.body.title;
        temp.director = req.body.director;
        temp.genre = req.body.genre;
        temp.year = +req.body.year;
        temp.time = req.body.time;
        res.json(temp);
    }
});

app.delete('/films', (req, res) =>{
    if(!req.body || !+req.body.id){
        res.sendStatus(400);
        return;
    }
    let temp = films.findIndex(i => i.id == +req.body.id);
    if(temp == -1){
        res.sendStatus(400);
        return;
    }
    films.splice(temp, 1);
    res.sendStatus(200);
});

app.listen(port, hostname);
console.log(`http://${hostname}:${port}`);