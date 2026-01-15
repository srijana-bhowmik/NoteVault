const express = require('express');
const pool = require('../db');
const router=express.Router();

router.get("/",async(req,res)=>{                        
    try{
        const [rows]=await pool.query("SELECT * FROM notes");
        res.json(rows);
    }catch(err){
        console.error(err);
        res.status(500).json({error:"Internal Server Error"});
    }
});

router.get("/:id",async(req,res)=>{                       
    try{
        const {id}=req.params;
        const [rows]=await pool.query("SELECT * FROM notes where id=?",[id]);
        if(rows.length===0){
            return res.status(404).json({error:"notes not found"});
        }
        res.json(rows[0]);
    }catch(err){
        console.error(err);
        res.status(500).json({error:"Internal Server Error"});
    }
});

router.post("/",async(req,res)=>{
    
    const {title,content}=req.body;

    if(!title){
        return res.status(400).json({error:"Title is required"});             
    }
    try{
        const [result]=await pool.query("Insert into notes (title,content) values (?,?)",[title,content]);
        res.status(201).json({id:result.insertId,title,content});         
    }
    catch(err){
        console.error(err);
        res.status(500).json({error:"Internal Server Error"});
    }

})

router.put("/:id",async(req,res)=>{
    const {id}=req.params;
    const {title,content}=req.body;

    if(!title){
        return res.status(400).json({error:"Title is required"});              
    }
    try{
        const [result]=await pool.query("update notes set title=?, content=? where id=?",[title,content,id]);
        if(result.affectedRows===0){
            return res.status(404).json("notes not found");    
        }
        else{
            res.status(200).json("notes updated successfully");              
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"});           
    }
})

router.delete("/:id",async(req,res)=>{
    const {id}=req.params;

    try{
        const [result]=await pool.query("Delete from notes where id=?",[id]);

        if(result.affectedRows===0){
            return res.status(404).json({error:"notes not found"});       
        }
        else{
            res.json("Note deleted successfully");
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"});           
    }
})

module.exports=router;