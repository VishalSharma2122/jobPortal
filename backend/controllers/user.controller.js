import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, password, role } = req.body;
        if (!fullName || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "somthing is missing",
                success: false
            })
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'User already exists with this email',
                success: false
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            fullName,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
        })
        return res.status(201).json({
            message: "account registered successfully",
            success: true

        })

    } catch (error) {
        console.log("error during user registration",error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });

    }
}

// login controller

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "somthing is missing",
                success: false
            })
        }
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: 'incorrect creditionals (email) ',
                success: false
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {

            return res.status(400).json({
                message: 'incorrect creditionals (password) ',
                success: false
            })
        }

        // cheak role

        if (role != user.role) {
            return res.status(400).json({
                message: 'incorrect creditionals (role) ',
                success: false
            })
        };

        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `welcome back ${user.fullName}`,
            success: true
        })
    } catch (error) {
        console.log(error);


    }

}

// logout 
export const logout = (req, res) => {
    try {
        // Clear the authentication token from the cookies (or localStorage, depending on your setup)
        res.clearCookie('token');{ // Clear the cookie where the token is stored
        return res.status(200).json({
            message: 'Logged out successfully',
            success: true
        });
    }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};


//update profile

export const updateProfile = async (req, res) => {
    try {
        const { fullName, email, phoneNumber,role, bio, skills } = req.body;
        const file = req.file;

        // Assuming Cloudinary logic will go here...
    
        const userId = req.userId;  // Use user info from the request after authentication
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: 'User not found',
                success: false
            });
        }

        // Update user data
        if(fullName) user.fullName = fullName;
        if(email) user.email = email;
        if(phoneNumber) user.phoneNumber = phoneNumber;
        if(role) user.role = role;
        if(bio) user.bio = bio;
        if(skills)  user.profile.skills = skillsArray;

        if(skills){
            let skillsArray = skills.split(",");
            }
        
       

        // Assuming resume upload will go here...

        await user.save();

        user = {
            userId: user.userId,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200).json({
            message: "Profile updated successfully",
            user,
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};