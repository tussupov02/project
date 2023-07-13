const { ok } = require("assert");
const { error } = require("console");
const e = require("express");
const express = require(`express`)
const router = express.Router()

const fs = require(`fs/promises`)

// router.get(`/auth`, async(req,res)=>{
//     console.log(`parsing....`);
//     const data = await fs.readFile(`./db/users.json`, `utf8`)
//     res.json(JSON.parse(data))
// })

router.get(`/drowpost`, async(req,res)=>{
    console.log(`parsing....`);
    const data = await fs.readFile(`./db/drowPost.json`, `utf8`)
    res.json(JSON.parse(data))
})
router.post(`/save`, async(req,res)=>{
    console.log(`save...`, req.body);
    const data = await fs.readFile(`./db/users.json`, `utf8`)
    let dataTake = JSON.parse(data)
    let result = true
    for(let user of dataTake){
        if(user.name== req.body.name && user.pas==req.body.pas){
            result = false
        }
    }
    if(result){
        let identifier = new Date().getTime()
        dataTake.push({id:identifier, ...req.body})
        await fs.writeFile(`./db/users.json`, JSON.stringify(dataTake))
        return res.json(identifier)
    }
    else{
        console.log("error")
        return res.json(0)
    }
})

router.post(`/auth`, async(req,res)=>{
    console.log(`parsing....`);
    const data = await fs.readFile(`./db/users.json`, `utf8`);
    let users = JSON.parse(data)
    for(let user of users){
        if(user.name=== req.body.name && user.pas===req.body.pas){
            console.log(user.name, req.body.name)
            return res.json(JSON.stringify(user.id))
        }
    }
    
    return res.json(0)
    
    
})

router.post(`/post`, async(req,res)=>{
    console.log(`save...`, req.body);
    const data = await fs.readFile(`./db/post.json`, `utf8`)
    let dataTake = JSON.parse(data)
    let identifier = new Date().getTime()
    dataTake.push({del:identifier, ...req.body})
    await fs.writeFile(`./db/post.json`, JSON.stringify(dataTake))
    let userPost = []
    for(let post of dataTake){
        if(post.id==req.body.id){
            userPost.push(post);
            await fs.writeFile(`./db/drowPost.json`, JSON.stringify(userPost))
        }
    }
    
    res.json(JSON.stringify(userPost))
})

router.delete(`/delete/:postId`, async(req,res)=>{
    console.log(`deleting...`, req.params);
    const data = JSON.parse(await fs.readFile(`./db/post.json`, `utf8`));
    const drow = JSON.parse(await fs.readFile(`./db/drowPost.json`, `utf8`))
    let el = 0
    let del = 0
    for(let i of data){
        if(i.del == req.params.postId){
            data.splice(el, 1)
        }else{
            el++
        }
    }
    for(let i of drow){
        if(i.del == req.params.postId){
            data.splice(del, 1)
        }else{
            del++
        }
    }
    await fs.writeFile(`./db/post.json`, JSON.stringify(data))
    await fs.writeFile(`./db/drowPost.json`, JSON.stringify(data))
    res.sendStatus(200)
})
router.put(`/create/:postId`, async(req,res)=>{
    console.log(`create...`, req.params);
    
})

module.exports = router