import express from 'express'
import {getdata,updatedata,Hresult,update_insert,houseinfo_insertFeature,getid,inserthouseinfo,createrow,result,getval,insertfeatureval,Bresult,user,getBuilding_userdata,getbuidlingfeature,userdata,E_result,signup_User} from './database.js'
const app = express();
const port = 3000;
import cors from 'cors';

app.use(cors());
// const cors = require('cors');
// app.use(cors());
app.use(express.json());
//api for  insert info

app.post('/house_info_create', async (req, res) => {
    try {
        // Extracting data from the request body
        const { building_name, house_num, family_size, user } = req.body;

        // Insert data into the database
        const result = await inserthouseinfo(building_name, house_num, family_size, user);

        console.log('Insert Successful:', result);
        res.status(201).send({ success: true, message: 'Data inserted successfully', result });
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).send({ success: false, message: 'Failed to insert data', error });
    }
});
//updtae

    app.patch('/update', async (req, res) => {
        try {
            // Extracting data from the request body
            const { value, building_name, feature_name } = req.body;
    
            // Validate the required fields
            if (!value || !building_name || !feature_name) {
                return res.status(400).send({
                    success: false,
                    message: 'Missing required fields (value, building_name, feature_name)',
                });
            }
    
            // Call the updatedata function to perform the update
            const result = await updatedata(value, building_name, feature_name);
    
            // Return success response
            return res.status(200).send({
                success: true,
                message: 'Building feature updated successfully',
                result,
            });
        } catch (error) {
            console.error('Error updating data:', error);
            return res.status(500).send({
                success: false,
                message: 'Failed to update data',
                error: error.message,
            });
        }
    });



//add house features
app.post('/add_feature', async (req, res) => {
    try {
        // Extracting data from the request body
        const { building_name, house_num, feature_name, feature_value } = req.body;

        // Validate the input (optional, but recommended)
        if (!feature_name || feature_value === undefined) {
            return res.status(400).send({ success: false, message: "feature_name and feature_value are required." });
        }

        // Call the function to insert the data
        const result = await houseinfo_insertFeature(building_name, house_num, feature_name, feature_value);

        console.log('Feature added successfully:', result);
        res.status(201).send({ success: true, message: 'Feature added successfully', result });
    } catch (error) {
        console.error('Error adding feature:', error);
        res.status(500).send({ success: false, message: 'Failed to add feature', error });
    }
});
//calculate house result
app.get('/resultH/:Bname/:HouseNum',async(req,res)=>{
    const Bname=req.params.Bname;
    const HouseNum=req.params.HouseNum;
    console.log("connected");
    const value=await Hresult(Bname,HouseNum);
    res.send(value)
})
//API for building_features
app.get('/getdata',async(req,res)=>{
    const result= await getdata()
    res.send(result);
})
app.get('/getid/:id',async(req,res)=>{
    const id=req.params.id;
    const result= await getid(id)
    res.send(result);
})
//for user values check in database
app.post('/user',async(req,res)=>{
    const result=await user(req.body.user_name,req.body.passcode)
    res.send(result);
})
app.post('/user_create',async(req,res)=>{
    const result=await signup_User(req.body.username,req.body.password,req.body.email)
    console.log(result);
    res.send(result);
})
//update the BFeature  values
app.get('/updationInsert/:user/:Bname',async(req,res)=>{
    
    const username=req.params.user;
    const Bname=req.params.Bname;
    const result=await update_insert(username,Bname);
    // if (result.length > 0) {
    //     const response = {};
    //     result.forEach((row, index) => {
    //       response[`feature_value${index + 1}`] = row.feature_value;
    //     });
    
    //     res.json(response);
    //   } else {
    //     res.status(404).json({ error: "Data not found" });
    //   }
    res.send(result);
})
//userdata
app.get('/userdata/:username',async(req,res)=>{
    const username=req.params.username;
    const result=await getBuilding_userdata(username)
    res.send(result);
})
//get user data
app.get('/get_userdata/:username',async(req,res)=>{
    const username=req.params.username;
    const result=await userdata(username)
    res.send(result);
})
// For building_info insertion values
app.post('/createrow',async(req,res)=>{
    const result=await createrow(req.body.building_name,req.body.size_sqft,req.body.location,req.body.user)
    res.send(result);
})
//to insert into building_features
app.post('/insertfeature',async(req,res)=>{
    const result=insertfeatureval(req.body.name,req.body.feature,req.body.val)
    res.send(result);
})
//to extract  building_features
app.get('/getfeature/:Bname',async(req,res)=>{
    console.log('connected');
    const Bname=req.params.Bname;
    const value=await getbuidlingfeature(Bname);
    res.send(value)
})
// API for result insertion into emission result
app.post('/result',async(req,res)=>{
    const value=await E_result(req.body.Bname,req.body.emission_result);
    res.send(value);
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





// import express from 'express'
// import {getdata,getid,createrow,result,getval,insertfeatureval,Bresult,user,getBuilding_userdata,getbuidlingfeature,userdata,E_result,signup_User} from './database.js'
// const app = express();
// const port = 3000;
// import cors from 'cors';

// app.use(cors());
// // const cors = require('cors');
// // app.use(cors());
// app.use(express.json());

// //API for building_features
// app.get('/getdata',async(req,res)=>{
//     const result= await getdata()
//     res.send(result);
// })
// app.get('/getid/:id',async(req,res)=>{
//     const id=req.params.id;
//     const result= await getid(id)
//     res.send(result);
// })
// //for user values check in database
// app.post('/user',async(req,res)=>{
//     const result=await user(req.body.user_name,req.body.passcode)
//     res.send(result);
// })
// app.post('/user_create',async(req,res)=>{
//     const result=await signup_User(req.body.username,req.body.password,req.body.email)
//     console.log(result);
//     res.send(result);
// })
// //userdata
// app.get('/userdata/:username',async(req,res)=>{
//     const username=req.params.username;
//     const result=await getBuilding_userdata(username)
//     res.send(result);
// })
// //get user data
// app.get('/get_userdata/:username',async(req,res)=>{
//     const username=req.params.username;
//     const result=await userdata(username)
//     res.send(result);
// })
// // For building_info insertion values
// app.post('/createrow',async(req,res)=>{
//     const result=await createrow(req.body.building_name,req.body.size_sqft,req.body.location,req.body.user)
//     res.send(result);
// })
// //to insert into building_features
// app.post('/insertfeature',async(req,res)=>{
//     const result=insertfeatureval(req.body.name,req.body.feature,req.body.val)
//     res.send(result);
// })
// //to extract  building_features
// app.get('/getfeature/:Bname',async(req,res)=>{
//     console.log('connected');
//     const Bname=req.params.Bname;
//     const value=await getbuidlingfeature(Bname);
//     res.send(value)
// })
// // API for result insertion into emission result
// app.post('/result',async(req,res)=>{
//     const value=await E_result(req.body.Bname,req.body.emission_result);
//     res.send(value);
// })
// app.get('/result',async(req,res)=>{
//     console.log("connected");
//     const value=await result();
//     res.send(value)
// })
// app.get('/result/:Bname',async(req,res)=>{
//     const Bname=req.params.Bname;
//     console.log("connected");
//     const value=await Bresult(Bname);
//     res.send(value)
// })
// app.get('/getval',async(req,res)=>{
//     const bname = req.body.name;
//     const value=await getval(bname);
//     res.send(value)
// })




// app.listen(3000,()=>{
//     console.log("server started");
// })



// //method not considered

// //insert values:
// // app.post('/insertf1',async(req,res)=>{
// //     const result=insertfeatureval(req.body.name,'Cement',req.body.val)
// //     res.send(result);
// // })
// // app.post('/insertf2',async(req,res)=>{
// //     const result=insertfeatureval(req.body.name,'Concrete',req.body.val)
// //     res.send(result);
// // })
// // app.post('/insertf3',async(req,res)=>{
// //     const result=insertfeatureval(req.body.name,'Steel',req.body.val)
// //     res.send(result);
// // })
// // app.post('/insertf4',async(req,res)=>{
// //     const result=insertfeatureval(req.body.name,'Wood',req.body.val)
// //     res.send(result);
// // })
// // app.post('/insertf5',async(req,res)=>{
// //     const result=insertfeatureval(req.body.name,'Brick',req.body.val)
// //     res.send(result);
// // })
// // app.post('/insertf6',async(req,res)=>{
// //     const result=insertfeatureval(req.body.name,'Glass',req.body.val)
// //     res.send(result);
// // })
// // app.post('/insertf7',async(req,res)=>{
// //     const result=insertfeatureval(req.body.name,'Aluminium',req.body.val)
// //     res.send(result);
// // })
// // app.post('/insertf8',async(req,res)=>{
// //     const result = insertfeatureval(req.body.name, 'Fiberglass Insulation', req.body.val);

// //     res.send(result);
// // })
// // app.post('/insertf9',async(req,res)=>{
// //     const result=insertfeatureval(req.body.name,'Polyurethane Insulation',req.body.val)
// //     res.send(result);
// // })
// // app.post('/insertf10',async(req,res)=>{
// //     const result=insertfeatureval(req.body.name,'Plaster',req.body.val)
// //     res.send(result);
// // })
// // //end insertion