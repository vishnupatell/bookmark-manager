const express = require("express");
const app = express();
const zod = require("zod");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const JWT_TOKEN =  process.env.JWT_SECRET;

const { signUpZod, loginZod } = require("./zod");
const { User, Details } = require("./db");

app.use(express.json());
app.use(cors({
    origin: 'https://bookmark-manager-frontendappl-git-207ace-vishnupatells-projects.vercel.app/',  
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  
}));
app.use(express.urlencoded({ extended: true })); 


export default (req, res) => {
    res.status(200).json({ message: 'Hello from /api/whats' });
  };
  
app.post("/signup",async(req, res) => {
    try{
        
        const body = req.body;
        const validatedBody = signUpZod.safeParse(body);
        if(!validatedBody.success){
            return res.status({
                message:"Invalid request body",
            })
        }
        const {userName, password} = validatedBody.data;
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds );
        const findUser = await User.findOne({
            userName: userName
        })
        if(findUser){
            return res.status(400).json({
                message: "User already registered"
            })
        }
        const user = await User.create({
            userName: userName,
            password: hashedPassword
        })
        if(!user){
            return res.status(500).json({
                message:"Couldn't create the account"
            })
        }
        const user_id = user._id;
        const token = jwt.sign({ id: user_id }, JWT_TOKEN);
        res.json({
            message: "Account created succesfully",
            token: token
        })

    }catch(error){
        return res.status(500).json({
            message:" Something went wrong with the server",
            error:error
        })
     }
})

app.post("/login", async(req, res) => {
    try{
        const body = req.body;
        const validatedBody = loginZod.safeParse(body);
        console.log(validatedBody);
        if(!validatedBody.success){
            return res.status(404).json({
                message: "User inputs are incorrect"
            })
        }
        
        const {userName, password} = validatedBody.data;
        const find = await User.findOne({
            userName: userName
        })
        if(find){
            const storedPassword = find.password;
            const isMatch = await bcrypt.compare(password, storedPassword);
            const user_id = find._id
            const token = jwt.sign({id:user_id},JWT_TOKEN);
            if(isMatch){
                return res.json({
                    message: "Logged in  successfully",
                    token:token
                })
            }
        }
        return res.status(404).json({
            message: "Couldn't Log In"
        })

    }catch(error){
        return res.status(404).json({
            message:"Error while logging in "
        })
    }
})

app.post("/details", async(req, res) =>{
    try{
        const body = req.body;
        const tokenHeader = req.headers.token;
        const {urlName, url, type} = body;
        const token = jwt.verify(tokenHeader, JWT_TOKEN);
        const userId = token.id;
        const create = await Details.create({
            userId: userId,
            urlName: urlName,
            url: url,
            type: type
        })

    
        if(create){
            return res.json({
                message: "The bookmark is created successfully"
            })
        }
    }catch(error){
        return res.json({
            message: "There is an error in creating the bookmark"
        })
    }
})

app.get("/getDetails", async(req, res) => {
    try{
        const tokenHeader = req.headers.token;
        const token = jwt.verify(tokenHeader, JWT_TOKEN);
        const userId = token.id;
    
        const find = await Details.find({
            userId: userId
        })
        if(find){
            return res.json({
                urls: find 
            })
        }
    }catch(error){
        return res.status(400).json({
            message: "couldn't fetch your bookmarks",
        })
    }
})

app.listen(3000, () => {
    console.log("The app is listening on the port 3000");
})