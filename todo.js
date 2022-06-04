const express = require('express')
const path = require('path')
const parser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const todo = require('./Frontend/Models/todoSchema')
const res = require('express/lib/response')
//console.log('todo require =>', todo)
//console.log('todo from mongoose =>', mongoose.model('mongoModel'))
mongoose.connect('mongodb://localhost:27017/mongoDB')

app.use('/' , express.static(path.join(__dirname , "Frontend")))
app.use(parser.json())

app.get('/' , (req ,res)=>{
    res.sendFile(path.join(__dirname, 'Frontend' , 'mongoHTML.html'))
})

app.post('/api/delete' , async(req , res)=>{
    const records = await todo.deleteOne({record: 'heyyy'})
    console.log(records)
})

app.post('/api/modify' , async(req , res)=>{
    const{old: oldTitle , new: newTitle} = req.body
    const response = await todo.updateOne(
        {
            record: oldTitle
        }, 
        {
            $set: {
                record: newTitle
            }
        })
    res.json({status: 'ok'})
})

app.get('/api/get' , async(req , res)=>{
    const records = await todo.find({record:'slmsl;ls'})
    console.log('response =>', records)
    res.json(records)
})

app.post('/api/create' , async(req , res)=>{
    const record = req.body
    console.log(record)
    console.log('Data retrieved')
    res.json({status: 'ok'})

    const response = await todo.create(record)
    console.log(response)
})

app.listen('7000' , ()=>{
    console.log('Server listening on port 7000...')
})

