const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const userModel = require("../Db/dbModels/userSchema");

const registerUser = async (req, res) => {
  try {
    const { userName, email, password, role } = req.body;

    
      if (!userName || !email || !password) { 
         return  res.status(400).json({
            message: "Missing credentials" 
        }); 
      }
    /* check if user already exist */
    const existingUser = await userModel.findOne({
      $or: [{ userName }, { email}],
    });

    if (existingUser) {
      return res.status(400).json({
        status: false,
        message: "User email  or username already exist",
      });
    }
      /* salt and hash user password */
      /* created salt */

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt)

 
 
      const createdUser = await userModel.create({
          userName, email, password: hashedPassword, role: role || "user"
      });
    if (createdUser) {
      return res.status(201).json({
        message: "User created successfully",
        data: createdUser,
      });
    } 
  } catch (error) {
      res.status(500).json({
          message: "failed to created user:" + error.message
      });
  }
};

const loginUser = async (req, res) => {

try {
    
    const { email, password } = req.body



    if ( !email || !password) { 
        return  res.status(500).json({
           message: "Missing credentials" 
       }); 
    }
    
    /* check if email exist */

    const existingUser = await userModel.findOne({ email })
    
    if (!existingUser) {
        return res.status(404).json({
            message: "Invalid login credentials",
            status: false
        })
    }
    
    /* check if password match hashed password */
    const doesPasswordMatch = await bcrypt.compare(password, existingUser.password)
    if (!doesPasswordMatch) {
        return res.status(404).json({
            message: "Invalid login credentials",
            status: false
        })
    }
    
/*  create a jwt Token */
    const token = jwt.sign({
        email,
        role: existingUser.role,
        _id: existingUser._id
    }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })


    res.status(201).json({
        status: true,
        message: "logged in successfully",
        token
    })

} catch (error) {
    res.status(500).json({
        message: "Server error:" + error.message
    });
}

};



const welcomeUser = async (req, res) => { 
   try {
     res.status(200).json({
       status: true,
       message: "Welcome to home page"
     })
   } catch (error) {
      console.log(error)
   }
}


const getUsers = async (req, res) => { 
  try {

    /* get current page */

    const page = req.query.page || 1;

    /* get amount of users per page  or use 5 as default*/

    const limit = req.query.limit || 5

    /* get number of users to skip based on the selected page */
    const skip = Math.ceil((page - 1) * limit);


    /* set how to sort elements */
    const sortBy = req.query.sortBy || "createdAt";

    /* set how the users will be ordered */
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;

    /* total users */
    const totalUsers = await userModel.countDocuments()
    

    /* total pages */
const totalPages = Math.ceil(totalUsers / limit)


    
    const sortObj = {};

    sortObj[sortBy] = sortOrder 
    const users = await userModel.find().sort(sortObj).skip(skip).limit(limit);
    res.status(200).json({
      message: "users fetched successfully",
      status: false,
      data: users,
      currentPage: page,
      totalPages: totalPages,
      totalUsers: totalUsers
    })
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch users",
      status: false
    })
  }
}


module.exports = {
    registerUser,
  loginUser,
  welcomeUser,
  getUsers

}