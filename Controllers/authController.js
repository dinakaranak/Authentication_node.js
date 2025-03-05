const { promisify } = require('util');
const AdminModel = require('../Models/AdminModel');
const jwt = require('jsonwebtoken');

const signToken = id =>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN});
}

module.exports.createadmin = async (req, res, next)=> {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.json({
                error: true,
                errorMessage: "Invalid credentials"
            })
        }      
        const admin = { username, password  }
        const adminExists = (await AdminModel.findOne({username , password})) != null;
        if (adminExists) {
            return res.json({
                error: true,
                errorMessage: "AdminCode already exists"
            })
        }
        await AdminModel.create(admin);
        const newAdmin = await AdminModel.findOne({username});
        return res.status(201).json({
            admin: newAdmin,
        })

    } catch (err) {
        console.log(err);
        return res.json({
            error: true,
            errorMessage: "An error has occurred.",
            message:err.message
        })
    }
}

module.exports.loginadmin = async (req, res,next)=>{
    try{
        const { username, password } = req.body;

        // 1) Check if username and password exist
        if (!username || !password) {
            return res.status(400).json({message:"Please provide email and password"})
        }

        // 2) Check if user exists && password is correct
        const user = await AdminModel.findOne({username}) 
        if(!user || !(await user.correctPassword(password,user.password))) {
            return res.status(401).json({message:"Incorrect email and password"})
        }
        console.log(user );

        // 3) If everything ok, send token to client
        const token=signToken(user._id);
        res.status(200).json({
            status:'success',
            token
        })}
        catch (err) {
            console.log(err);
            return res.json({
                error: true,
                errorMessage: "An error has occurred.",
                message : err.message
            })}}

module.exports.protect = async(req,res,next)=>{
    try{
    // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) 
  {
    token = req.headers.authorization.split(' ')[1];
  } 
  console.log(req.headers.authorization);
  if (!token) {
    return res.status(401).json({message:"You are not logged in!!! Please log in to get access"})
  }
    // 2) Verification token
 const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
 console.log(decoded);

  const currentUser = await AdminModel.findById(decoded.id);

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();

}
catch (err) {
    console.log(err);
    return res.json({
        error: true,
        errorMessage: "An error has occurred.",
        message: err.message
        
})}}