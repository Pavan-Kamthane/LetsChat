const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchma = mongoose.Schema(
    {
        name: { type: "String", required: true },
        email: { type: "String", unique: true, required: true,unique:true },
        password: { type: "String", required: true },
        pic: {
            type: "String",
            default:
                "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        },
    },{
        timestamps: true
    }
)

// before going to db its gon encrypt the pass
// .pre means :
// .pre is a middleware function that runs before the save method is called on the model
userSchma.pre('save',async function (next){
    if(!this.isModified){
        return next()
    }
    const salt = await bcrypt.genSalt(10) 
    // what is the meaning of this line: 
    // this is the line where we hash the password
    this.password = await bcrypt.hash(this.password, salt)
})


//   this is the function
userSchma.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

const User = mongoose.model("user" ,  userSchma)

module.exports = User
