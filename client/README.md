# books-crud front-end
  
## Table of contents

- [My Process](#process)
- [Author](#author)


## My Process
1.  **Install CRA to client folder. Use "." so it will install inside it**

    ```shell
    npx create-react-app .
    ```

1.  **Install react-router-dom and axios**
    ```shell
        npm i react-router-dom axios
    ```

1.  **Create a folder under src named pages and under it, create the pages: Add.jsx, Books.jsx, Updated.jsx**
1.  **Under App.js, set up the Routes**
    ```shell
        import { BrowserRouter, Routes, Route } from "react-router-dom"
        import Add from "./pages/Add";
        import Books from "./pages/Books";
        import Update from "./pages/Update";

        function App() {
        return (
            <div className="App">
            <BrowserRouter>
                <Routes>
                <Route path="/" element={<Books/>}/>
                <Route path="/add" element={<Add/>}/>
                <Route path="/update" element={<Update/>}/>
                </Routes>
            </BrowserRouter>
            </div>
        );
        }
        export default App;
    ```

1. **Open Books.jsx and fetch the data fom database using axios**
    ```shell
        import React,{ useState, useEffect } from 'react'
        import axios from 'axios';

        const Books = () => {
            const [books, setBooks] = useState([])

            useEffect(() => {
            const fetchAllBooks = async () => {
                try{
                    const res = await axios.get("http://localhost:8800/books")
                    console.log(res)
                }catch(err){
                    console.log(err)
                }
            }
            fetchAllBooks();
            }, [])
            

        return (
            <div>Books</div>
        )
        }

        export default Books
    ```

1. **We should be getting an error from here about CORS policy by looking at the Console.**
1. **Go back to the backend folder and install cors and then run it again**
    ```shell
        npm i cors
        npm start
    ```
1. **Write the middleware for CORS inside index.js of the backend**
    ```shell
        import cors from 'cors'

        app.use(cors())
    ```
1. **You should be getting the data now from the database**



---
 
## Author
- Twitter - [@julfinch](https://www.twitter.com/julfinch)
