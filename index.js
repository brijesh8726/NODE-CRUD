const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Brijesh@123',
    database: 'employeeDB' ,
    multipleStatements: true
});
mysqlConnection.connect((err)=>{
    if(!err)
        console.log("DB connection established")
    else
        console.log("connection fasiled Error:"+JSON.stringify(err, undefined, 2));
});

app.listen(3002,()=>{
    console.log("express server is running at 3002")
});

app.get('/employees',(req,res)=>{
    mysqlConnection.query('SELECT * FROM Employees',(err,rows,fields)=>
    {
        if(!err)
            // console.log(rows)
            res.send(rows)
        else
            console.log(err)
    })
});

app.get('/employees/:id',(req,res)=>{
    mysqlConnection.query('SELECT * FROM Employees WHERE ID = ?',[req.params.id],(err,rows,fields)=>
    {
        if(!err)
            // console.log(rows)
            res.send(rows)
        else
            console.log(err)
    })
});

app.delete('/employees/:id',(req,res)=>{
    mysqlConnection.query('DELETE FROM Employees WHERE ID = ?',[req.params.id],(err,rows,fields)=>
    {
        if(!err)
            // console.log(rows)
            res.send("deleted sucessfully")
        else
            console.log(err)
    })
});

app.post('/employees',(req,res)=>{
    let emp = req.body;
    var sql = `INSERT INTO Employees (ID, Firstname, Lastname, Age) VALUES (${emp.ID}, "${emp.Firstname}","${emp.Lastname}", ${emp.Age})`;
     
       mysqlConnection.query(sql, function(err, rows, fileds) {
        if (err)  console.log(err);
     
      res.send("Data inserted sucessfully wit emloyee id:" + emp.ID)
  
    });
  });

  app.put('/employees/:id',(req,res)=>{
    let emp = req.body;
    // var sql = `UPDATE Employees SET ID =${emp.ID}, Firstname ="${emp.Firstname}",Lastname ="${emp.Lastname}",Age = ${emp.Age}) WHERE ID =? `;
  
       mysqlConnection.query(`UPDATE Employees SET ID =${emp.ID}, Firstname ="${emp.Firstname}",Lastname ="${emp.Lastname}",Age = ${emp.Age} WHERE ID = ?`,[req.params.id], function(err, rows, fileds) {
        if (err) 
         console.log(err);
      res.send("Data updated sucessfully")
    
  
    });
  });
  
   


