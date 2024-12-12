const express = require('express');
const cors = require('cors');
const pool = require('./dbconnect'); 

const app = express();
const port = 4500;

app.use(express.json());
app.use(cors());

// ------------------GET-----------------//
app.get('/get', (req, res) => {
    const sql = 'SELECT * FROM notes';
    pool.query(sql, (error, result) => {
        if (error) {
            console.log('Error get', error);
            res.send(error)
      } else {
         res.send(result)
         console.log("successfully get",result)
        }
    });
});
//---------------------POST----------------------//

app.post('/add', (req, res) => {
    const { description } = req.body; 
    const sql = 'INSERT INTO notes (description) VALUES (?)';
    pool.query(sql, [description], (error, result) => {
       if(error){
        res.send(error)
        console.log("error add",error)
       }
       else{
        res.send(result)
        console.log("successfully add",result)
       }
    });
});
//-------------------DELETE--------------------------//
app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM notes WHERE id = ?';
    pool.query(sql, [id], (error, result) => {
        if(error){
            res.send(error)
            console.log("error delete")
        }
        else{
            res.send(result)
            console.log("successfully delete")
        }
    })
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
