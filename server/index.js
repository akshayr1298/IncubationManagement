
const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const User = require('./models/user-models')
const Admin =  require('./models/admin-models')
const Slote = require('./models/slot-models')
const jwt =require('jsonwebtoken')
const bcrypt = require('bcrypt')


app.use(cors())
app.use(express.json())


mongoose.connect('mongodb://localhost:27017/incubation')


app.post('/api/signup',async(req,res)=>{
    console.log('sig',req.body);
    try{
        const hashPswrd = await bcrypt.hash(req.body.password,10)
         await User.create({
            name:req.body.name,
            email:req.body.email,
            password:hashPswrd
        })
        res.json({status:'ok'})
    } catch(err){
        res.json({status:'error',error:'Duplicate email '})
    }
})

app.post('/api/login',async(req,res)=>{
    console.log('log',req.body);
    const user = await User.findOne({
        email:req.body.email,
    })
    if(!user) {
        return  {status:'error',error:'Invalid'}}

    const hashPswrd = await bcrypt.compare(req.body.password,user.password)
    if(hashPswrd){
        const token = jwt.sign({
            name:user.name,
            email:user.email

        },'call1119')
        return res.json({status:'ok',user:token})
    }else{
        return res.json({status:'error',user:false}) 
    }
})

app.post('/api/submitForm', async (req, res) => {
    console.log('req received');
    try {
        console.log('res',req.body);
        console.log('token',req.body.token);

        const decoded = jwt.verify(req.body.token, 'call1119');

        let email = decoded.email;
        let user = await User.findOne({ email: email });
        if (user.Formsubmited) {
          return res.json({
            status: 'error',
            error: 'duplicate form not allowed',
          });
        }
       
        let formData = req.body.form
        console.log('df',formData);
         await User.updateOne(
          { email: email, Formsubmited: false },
          {
            $set: { form: { ...formData }, Formsubmited: true, status:'New' },
          }
        );
        res.json({ status: 'ok' });
    } catch (err) {
      console.log(err);
      res.json({ status: 'error', error: 'some error occure' });
    }
  });
 
  // admin

  app.post('/api/adminlogin',async(req,res)=>{
    const admin =  await Admin.findOne({
        email:req.body.email,
    })
    if(!admin){
        return res.json({ status: 'error', admin: false, error: 'invalid email' });
    }
    let passwordCheck = await bcrypt.compare(req.body.password,admin.password)
    console.log('check',passwordCheck);

    if(passwordCheck){
        const adtoken = jwt.sign({
        email:admin.email,
        },'secretkey123')
        return res.json({status:'ok',admin:adtoken})
    }else{
        return res.json({status:'error',admin:false})
    }
})

app.get('/api/applicationlist',async(req,res)=>{
    console.log('application');
    try{
        let userData = await User.find({}) 
        const newApp = userData.filter((data)=>{
            return data.status === 'New'
        })
        const all = userData.filter((data)=>{
            return data.status === 'pending' || data.status === 'approved' || data.status === 'decline'
        })
        console.log('new',newApp)
        console.log('all',all)
        console.log(userData); 
        return res.json({ new:newApp,all:all })
    } catch(err){
        console.log('err',err);
        return res.json({status:'error',error:'no data found'})
    }
})


app.put('/api/pendinglist',async(req,res)=>{
    console.log('pending');
    try{
        console.log(req.body)
       let update =  await User.updateOne(
        
            {_id:req.body.userId._id},{$set:{status:'pending'}}
        )
        console.log('up',update);
        return res.json({status:'ok',update})
    } catch(err){
        console.log('err',err);
        return res.json({status:'something went to wrong!!!'})
    }
})

app.put('/api/decline',async(req,res)=>{
    console.log("decline")
    try{
        console.log(req.body)
        await User.updateOne({_id:req.body.userId._id},{$set:{status:'decline'}}).then((response)=>{
            console.log(response)
            return res.json({response})
        })
        
    } catch(err){
        console.log('err',err)
    }

})

app.put('/api/approved',async(req,res)=>{
    console.log("approved")
    try{
        console.log(req.body)
        await User.updateOne({_id:req.body.userId._id},{$set:{status:'approved'}}).then((response)=>{
            console.log(response)
            return res.json({response})
        })
        
    } catch(err){
        console.log('err',err)
    }

})

app.get('/api/progress',async(req,res)=>{
    console.log('progress')
    try{
        await User.find().then((response)=>{
            console.log(response);
            return res.json({response})
            
        })

    } catch(err){
        console.log('error',err);
    }
})

app.get('/api/applicant',async(req,res)=>{
    console.log('progress')
    try{
        await User.find({status:"approved"}).then((response)=>{
            console.log(response);
            return res.json({response})
            
        })

    } catch(err){
        console.log('error',err);
    }
})

app.get('/api/slots',async(req,res)=>{
    console.log('sloteeee')
    try{
        await Slote.find().then((response)=>{
            console.log('solt',response)

            const A = response.filter((item) => {
                return (item.section === 'A')
            })
            


            const B = response.filter((item) => {
                return (item.section === 'B')
            })
            


            const C = response.filter((item) => {
                return (item.section === 'C')
            })
            


            const D = response.filter((item) => {
                return (item.section === 'D')
            })
            

            const E = response.filter((item) => {
                return (item.section === 'E')
            })
            


            return res.json({A,B,C,D,E})
        })

    } catch(err){
        console.log('error',err)
    }
})

app.get('/api/update',async(req,res)=>{
    console.log('update')
    try{
        let slot = req.query.slotId
        let userId = req.query.applicantId
        let section = req.query.slotSection
        Slote.updateOne({slot:slot,section:section},{
            $set:{userId:userId,isBooked:true}
        }).then(()=>{
            User.updateOne({_id:userId}, {$set:{isBooked:true}}).then(()=>{
                res.json({status:'ok'})
            })
        })
    } catch (err){
        console.log('error',err)
    }
})















app.listen(1300,()=>{
    console.log('server at port 1300');
})