let films = [];

document.querySelector('#div-form').addEventListener('click', (event) => {
    if(event.target != event.currentTarget)
        return;
    event.currentTarget.style.display = 'none';
    document.styleSheets[0].cssRules[5].style.display = 'flex';
    document.styleSheets[0].cssRules[6].style.display = 'none';
    document.forms[0].dataset.id = '-1';
    document.forms[0].reset();
});

document.querySelector('#add').addEventListener('click', () => {
    document.querySelector('#div-form').style.display = '';
    document.styleSheets[0].cssRules[5].style.display = 'none';
    document.styleSheets[0].cssRules[6].style.display = '';
});

document.querySelector('#edit').addEventListener('click', () => {
    document.styleSheets[0].cssRules[5].style.display = 'none';
    document.styleSheets[0].cssRules[6].style.display = '';
});

document.querySelector('#cancel').addEventListener('click', () => {
    if(+document.forms[0].dataset.id != -1){
        document.styleSheets[0].cssRules[5].style.display = 'flex';
        document.styleSheets[0].cssRules[6].style.display = 'none';
    }
    else{
        document.querySelector('#div-form').style.display = 'none';
        document.styleSheets[0].cssRules[5].style.display = 'flex';
        document.styleSheets[0].cssRules[6].style.display = 'none';
        document.forms[0].dataset.id = '-1';
    }
});

document.querySelector('#delete').onclick = () =>{
    if(confirm('Вы действительно желаете удалить выбранный фильм из списка?')){
        fetch('/films',{
            method: 'DELETE', 
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({id: +document.forms[0].dataset.id})
        })
        .then(r => {
            if(r.ok)
                location.href = location.origin;
        })
    }
};

document.forms[0].onsubmit = () =>{
    fetch('/films', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({id: +document.forms[0].dataset.id, 
            title: document.querySelector('#edit-title').value,
            director: document.querySelector('#edit-director').value,
            genre: document.querySelector('#edit-genre').value,
            year: +document.querySelector('#edit-year').value,
            time: document.querySelector('#edit-time').value
        })
    })
    .then(r =>{
        if(r.ok)
            location.href = location.origin;
    })
    return false;
};

function EditFilm(e){
    let temp = films.find(i => i.id == e);

    document.querySelector('#title').innerHTML = temp.title;
    document.querySelector('#edit-title').value = temp.title;
    document.querySelector('#director').innerHTML = temp.director;
    document.querySelector('#edit-director').value = temp.director;
    document.querySelector('#genre').innerHTML = temp.genre;
    document.querySelector('#edit-genre').value = temp.genre;
    document.querySelector('#year').innerHTML = temp.year;
    document.querySelector('#edit-year').value = temp.year;
    document.querySelector('#time').innerHTML = temp.time;
    document.querySelector('#edit-time').value = temp.time;

    document.querySelector('#div-form').style.display = '';
    document.styleSheets[0].cssRules[5].style.display = 'flex';
    document.styleSheets[0].cssRules[6].style.display = 'onne';
    document.forms[0].dataset.id = e;
}

fetch('/films')
.then(r => r.json())
.then(res => {
    res.forEach(e => {
        let row = document.createElement('tr');
        row.innerHTML = `<td>${e.title}</td>` +
        `<td>${e.director}</td><td>${e.genre}</td>` +
        `<td>${e.year}</td><td>${e.time}</td>`;
        row.dataset.id = e.id;
        row.onclick = () => EditFilm(row.dataset.id);
        document.querySelector('tbody').append(row);
        films.push(e);
    });
});