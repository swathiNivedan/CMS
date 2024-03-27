const express=require("express")
const app=express()
const path=require("path")
const hbs=require("hbs")
const templatePath = path.join(__dirname, '../templates');
const collection=require("./mongodb")
const Patient = require ('./patients')
const doc = require('./doclogin')
const docter = require('./doctor')
const router = express.Router()

app.use(express.static('public'));
app.use(express.json())
app.set("view engine","hbs")
app.set("views",templatePath)

app.use(express.urlencoded({extended:false}))



app.get('/', (req, res) => {
    res.render('frontpage'); // 
});


app.get('/aboutus', (req, res) => {
    res.render('aboutus'); // 
});

app.get('/contactus', (req, res) => {
    res.render('contactus'); // 
});

app.get('/service', (req, res) => {
    res.render('service'); // 
});



app.get('/login', (req, res) => {
    res.render('login'); // Assuming 'login.hbs' is in your views directory
});




app.get("/signup",(req,res)=>{
    res.render("signup")
})

app.post("/signup",async (req,res)=>{

const data={
    name:req.body.name,
    password:req.body.password
}

await collection.insertMany([data])

res.render("home")

})

app.post("/signup",async (req,res)=>{

    const data={
        name:req.body.name,
        password:req.body.password
    }
    
    await collection.insertMany([data])
    
    res.render("home")
    
    })



app.post("/login",async (req,res)=>{

    try{
        const check=await collection.findOne({name:req.body.name})
        if(check.password===req.body.password){
            res.render("home")
        }
        else{
            req.send("wrong password")
        }
    }
    catch{
        res.send("wrong details")

    }  
    
})


app.post('/home', async (req, res) => {
    try {
        const { FirstName,LastName, Address,PhoneNo } = req.body;
        const patient = new Patient({FirstName,LastName, Address,PhoneNo });
        await patient.save();
        res.render('successfull'); // Render home page after adding patient
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/home', async (req, res) => {
    try {
        const patients = await Patient.find();
        res.send("home");
    } catch (error) {
        res.status(500).send(error.message);
    }
});


app.get('/doclogin', (req, res) => {
    res.render('doclogin'); // Assuming 'login.hbs' is in your views directory
});


app.get("/docsignup",(req,res)=>{
    res.render("docsignup")
})


app.post("/doclogin",async (req,res)=>{

    try{
        const check=await doc.findOne({name:req.body.name})
        if(check.password===req.body.password){
            res.render("dochome")
        }
        else{
            req.send("wrong password")
        }
    }
    catch{
        res.send("wrong details")

    }  
    
})

app.post("/docsignup",async (req,res)=>{

    const data={
        name:req.body.name,
        password:req.body.password
    }
    
    await doc.insertMany([data])
    
    res.render("dochome")
    
    })

   

app.listen(3000,()=>{
    console.log("posrt connected");
})

