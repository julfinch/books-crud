import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'

const app = express()

// This is to connect our database from Mysql
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"BuchokoyMysql.1990",
    database:"books"
})

// {"code":"ER_NOT_SUPPORTED_AUTH_MODE","errno":1251,"sqlMessage":"Client does not support authentication protocol requested by server; consider upgrading MySQL client","sqlState":"08004","fatal":true}
// If there is an auth problem, just run the code below. Alternative solution is to uninstall mysql package and 
// install mysql2 instead. Make sure to change the import code above to 'mysql2' instead of 'mysql'.
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'BuchokoyMysql.1990';

// Express Server Middleware to let us do POST method to the database using the client side 
app.use(express.json())
app.use(cors())

// This is to connect to the backend. Whenever we are at the homepage, 
// client side will send a request to the backend and then backend will send 
// a response. For this, we will send a response message for now.
app.get("/", (req, res) => {
    res.json("Backend connection successful!")
})

// This is to access the database with the endpoint at the books table.
// Using the db we created above, we can query all the books inside that database.
// It will return us either and error or, if successfull, the data.
app.get("/books", (req, res) => {
    const q = "SELECT * FROM books"
    db.query(q,(err,data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

//POST method to submit books to the database. We use question mark in the VALUES for security purposes/
app.post("/books", (req,res) => {
    const q = "INSERT INTO books (`title`, `desc`, `price`, `cover`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ]

    db.query(q, [values], (err, data) => {
        if(err) return res.json(err)
        return res.json("Book has been created successfully!")
    })
})

//DELETE method
app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = ?"

    db.query(q, [bookId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Book has been deleted successfully.");
    })
})

//UPDATE method
app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?";

    const values=[
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ]

    db.query(q, [...values,bookId], (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.listen(8800, () => {
    console.log("Connected to backend!")
})