const StudentModel = require('../Models/StudentModel')

module.exports.createstudent = async (req, res)=> {
    try {
        const { studentcode, student_name , dateofjoining } = req.body;
        if (!studentcode || !student_name) {
            return res.json({
                error: true,
                errorMessage: "Invalid credentials",
            })
        }
        const user = {
            
            studentcode,
            student_name,
            dateofjoining
        }
        const userExists = (await StudentModel.findOne({studentcode , student_name})) != null;
        if (userExists) {
            return res.json({
                error: true,
                errorMessage: "StudentCode already exists",
            })
        }
        await StudentModel.create(user);
        const newUser = await StudentModel.findOne({studentcode , student_name , dateofjoining});
        return res.json({
            user: newUser,
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

module.exports.getstudents  = async (req, res) => {
    
    try
    {
        const Doc = await StudentModel.find({})
        if(!Doc){
            return res.status(400).json({message:"No Document found"})
        }
        return res.status(200).json({message:Doc})
    }
    catch(err){
        return res.status(400).json({message:err.message});
    }
}
