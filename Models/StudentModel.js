const mongoose = require("mongoose")
const { Schema } = mongoose ;


const studentSchema=new Schema({
    studentcode:{type: String},
    student_name:{type: String },
    dateofjoining:{type: String},
},
    {
        suppressReservedKeysWarning: true // Suppress the warning
    }
)



module.exports = mongoose.model("student_master",studentSchema);