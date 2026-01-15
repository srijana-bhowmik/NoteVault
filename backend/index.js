const express=require("express");
const notesroute=require("./route/notes");
const pool = require("./db");
const path=require("path");
const cors=require("cors");
const app=express();

app.use(cors());                    
app.use(express.json());
app.use(express.static(path.join(__dirname,'frontend')));

app.use("/notes",notesroute);

const PORT=3000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});
 
// module.exports=app;