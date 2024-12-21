import express from 'express'
import {getdata,getid,createrow,result,getval,insertfeatureval,Bresult} from './database.js'
const app = express();
const port = 3000;
import cors from 'cors';

app.use(cors());
// const cors = require('cors');
// app.use(cors());
app.use(express.json());

app.get('/getdata',async(req,res)=>{
    const result= await getdata()
    res.send(result);
})
app.get('/getid/:id',async(req,res)=>{
    const id=req.params.id;
    const result= await getid(id)
    res.send(result);
})
app.post('/createrow',async(req,res)=>{
    const result=await createrow(req.body.building_type,req.body.size_sqft,req.body.location)
    res.send(result);
})
//to insert into building_features
app.post('/insertfeature',async(req,res)=>{
    const result=insertfeatureval(req.body.name,req.body.feature,req.body.val)
    res.send(result);
})

app.get('/result',async(req,res)=>{
    console.log("connected");
    const value=await result();
    res.send(value)
})
app.get('/result/:Bname',async(req,res)=>{
    const Bname=req.params.Bname;
    console.log("connected");
    const value=await Bresult(Bname);
    res.send(value)
})

app.get('/getval',async(req,res)=>{
    const bname = req.body.name;
    const value=await getval(bname);
    res.send(value)
})
app.listen(3000,()=>{
    console.log("server started");
})



//method not considered

//insert values:
// app.post('/insertf1',async(req,res)=>{
//     const result=insertfeatureval(req.body.name,'Cement',req.body.val)
//     res.send(result);
// })
// app.post('/insertf2',async(req,res)=>{
//     const result=insertfeatureval(req.body.name,'Concrete',req.body.val)
//     res.send(result);
// })
// app.post('/insertf3',async(req,res)=>{
//     const result=insertfeatureval(req.body.name,'Steel',req.body.val)
//     res.send(result);
// })
// app.post('/insertf4',async(req,res)=>{
//     const result=insertfeatureval(req.body.name,'Wood',req.body.val)
//     res.send(result);
// })
// app.post('/insertf5',async(req,res)=>{
//     const result=insertfeatureval(req.body.name,'Brick',req.body.val)
//     res.send(result);
// })
// app.post('/insertf6',async(req,res)=>{
//     const result=insertfeatureval(req.body.name,'Glass',req.body.val)
//     res.send(result);
// })
// app.post('/insertf7',async(req,res)=>{
//     const result=insertfeatureval(req.body.name,'Aluminium',req.body.val)
//     res.send(result);
// })
// app.post('/insertf8',async(req,res)=>{
//     const result = insertfeatureval(req.body.name, 'Fiberglass Insulation', req.body.val);

//     res.send(result);
// })
// app.post('/insertf9',async(req,res)=>{
//     const result=insertfeatureval(req.body.name,'Polyurethane Insulation',req.body.val)
//     res.send(result);
// })
// app.post('/insertf10',async(req,res)=>{
//     const result=insertfeatureval(req.body.name,'Plaster',req.body.val)
//     res.send(result);
// })
// //end insertion