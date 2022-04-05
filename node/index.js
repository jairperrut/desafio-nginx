const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')

const checkErrorCallback = (error) => {
    if(error) throw error
}

const executeQuery = (sql, callback = checkErrorCallback) => {
    const connection = mysql.createConnection(config)
    console.log('Executando:', sql);
    connection.query(sql, callback)
    connection.end();
};

executeQuery("create table if not exists people(id int not null auto_increment, name varchar(255), primary key(id));")
executeQuery(`INSERT INTO people(name) values('Jair Perrut')`)

app.get('/', (req, res) => {
    executeQuery(`SELECT * FROM people;`, function(error, results, fields){
        checkErrorCallback(error);
        let list = []
        results?.forEach((people) => {
            list = list + `<li>${people.id} - ${people.name}</li>`
        })
        res.send(`<h1>Full Cycle Rocks!</h1>
        <ul>
            ${list}
        </ul>
        `);
    })
})


app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})