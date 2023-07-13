const express = require(`express`)
const router = express.Router()

const fs = require(`fs/promises`)

router.get(`/parse`, async(req,res)=>{
    console.log(`parsing....`);
    const data = await fs.readFile(`./db/user.json`, `utf8`)
    res.json(JSON.parse(data))
})

router.post(`/create`, async(req,res)=>{
    console.log(`save...`, req.body);
    const data = await fs.readFile(`./db/user.json`, `utf8`)
    let dataTake = JSON.parse(data)
    let identifier = new Date().getTime()
    dataTake.push({id:identifier, ...req.body})
    await fs.writeFile(`./db/user.json`, JSON.stringify(dataTake))
    res.json(dataTake)
})

router.delete(`/delete/:postId`, async(req,res)=>{
    console.log(`deleting...`, req.params);
    const data = JSON.parse(await fs.readFile(`./db/user.json`, `utf8`))
    let el = 0
    for(let i of data){
        if(i.id == req.params.postId){
            data.splice(el, 1)
        }else{
            el++
        }
    }
    await fs.writeFile(`./db/user.json`, JSON.stringify(data))
    res.sendStatus(200)
})


module.exports = router