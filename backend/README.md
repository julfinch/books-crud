# books-crud back-end
  
## Table of contents

- [My Process](#process)
- [Author](#author)


## My Process
1.  **Create the server folder and install the packages**

    ```shell
    mkdir books-crud
    cd books-crud
    mkdir client
    mkdir backend
    cd backend
	npm init -y
	npm i express mysql nodemon	
    ```

1.  **Under package.json, add "type": "module" so that we can use import instead of require. Also add "start": "nodemon index.js" so that we don't need to restart the connection to express over and over again, nodemon will automatically do the changes for us.**
    ```shell
        "description": "",
        "main": "index.js",
        "type": "module",
        "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1",
            "start": "nodemon index.js"
        },
    ```

1.  **Under backend folder, create index.js**
    ```shell
        import express from 'express'

        const app = express()

        app.listen(8800, () => {
            console.log("Connected to backend!")
        })
    ```

    1. Run index.js using "node index.js". But since we already have nodemon, instead use this time the code "npm start". 

1. **Update the index.js and connect the mysql database and enable get and post methods**
    ```shell
        import express from 'express'
        import mysql from 'mysql2'

        const app = express()

        // This is to connect our database from Mysql
        const db = mysql.createConnection({
            host:"localhost",
            user:"root",
            password:"BuchokoyMysql.1990",
            database:"books"
        })

        // If there is an auth problem, just run the code below. Alternative solution is to uninstall mysql package and 
        // install mysql2 instead. Make sure to change the import code above to 'mysql2' instead of 'mysql'.
        // ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'BuchokoyMysql.1990';

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
            const q = "INSERT INTO books (`title`, `desc`, `cover`) VALUES (?)"
            const values = ["title from backend","desc from backend","cover from backend"]

            db.query(q, [values], (err, data) => {
                if(err) return res.json(err)
                return res.json("Book has been created successfully!")
            })
        })

        // {"code":"ER_NOT_SUPPORTED_AUTH_MODE","errno":1251,"sqlMessage":"Client does not support authentication protocol requested by server; consider upgrading MySQL client","sqlState":"08004","fatal":true}

        app.listen(8800, () => {
            console.log("Connected to backend!")
        })
    ```

    1. **ERROR: {"code":"ER_NOT_SUPPORTED_AUTH_MODE","errno":1251,"sqlMessage":"Client does not support authentication protocol requested by server; consider upgrading MySQL client","sqlState":"08004","fatal":true}**
        SOLUTION 1: Run the code below
        ```shell
            ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'BuchokoyMysql.1990';
        ```
        SOLUTION 2: Uninstall **mysql** and install **mysql2** instead to avoid the auth error.

1. ****


---
 
## Author
- Twitter - [@julfinch](https://www.twitter.com/julfinch)
