const UserModel = require('../model/CustomerModel');
const TokenModel = require('../model/TokenModel');
const sentMail = require('../middleware/SentMail');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
exports.UserRegister = async (req, res) => {
    //console.log(req.body)
    try {
        let newUser = new UserModel({ ...req.body,verified: false });
        newUser = await newUser.save();
        if (!newUser) {
            console.log("faile to create user")
            return res.status(400).json({
                err: "failed to create user "
            });
        }
        //console.log(newUser);
        let token = new TokenModel({
            token: crypto.randomBytes(16).toString('hex'),
            userId: newUser._id
        })
        token = await token.save();
        if (!token) {
            return res.status(400).json({
                err: "failed to store token "
            });
        }
        sentMail({
            from: 'edssoftinc.@gmail.com',
            to: newUser.email,
            subject: "email verification link",
            html: `
            <p>Hello,${newUser.name}</p>
            <p>Please verify your account by clicking the link below:</p>
            <p><a href="${process.env.BASEURLC}verifyEmail/${token.token}">Register</a></p>
            `
        })
        res.status(200).json({
            message: 'registered succesfully, wait for verification'
        })
    }
    catch (err) {
        res.status(400).json(err)
    }

}
exports.verifyEmail = async (req, res) => {
   // console.log(req.params.token)
    try {
        let token = await TokenModel.findOne({
            token: req.params.token
        });
        if (!token) {
            return res.status(400).json({
                message: "token not found"
            })
        }
        let user = await UserModel.findOne({
            _id: token.userId
        })
        if (!user) {
            return res.status(400).json({
                message: "user not found"
            })
        }
        user.verified = true;
        user.save();
        if (!user) {
            return res.status(400).json({
                message: "failed to registered user"
            })
        }
        if (user.verified) {
            return res.status(400).json({
                message: "user is already registered "
            })
        }
        res.status(200).json({
            message: "your email has been verified, continue to login"
        })
    }
    catch (err) {
        console.log(err)
    }
}
exports.UserLogin = async (req, res) => {
 console.log(req.body);
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            //console.log("User not found");
            return res.status(403).json({
                error: "Sorry, email or password provided is incorrect"
            });
        }
        if (!user.verified) {
            // console.log("Not verified");
            return res.status(400).json({
                error: "Sorry, email is not verified"
            });
        }
        //console.log("user", user);
        const isMatch = await user.matchPassword(req.body.password);
        if (!isMatch) {
            return res.status(403).json({
                error: "Email or password provided is incorrect"
            });
        }

        let token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN);
        res.cookie('mycookie', token, { expire: Date.now() + 99999 });
        const { _id, name, email } = user;
        return res.json({
            token: token,
            user: {
                _id,
                name,
                email,
            },
        });

    } catch (err) {
        res.status(400).json(err);
    }
}
exports.forgotPassword = async (req, res) => {
      //console.log(req.body.email);
    try {
        let user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            console.log("user not found")
        }
        //console.log(user)
        let token = new TokenModel({
            token: crypto.randomBytes(16).toString('hex'),
            userId: user._id
        })
        token = await token.save()
        if (!token) {
            return res.status(400).json({
                err: "failed to store token "
            })
        }
        sentMail({
            from: 'edssoftinc.@gmail.com',
            to: req.body.email,
            subject: "forgot password link",
            html: `
            <p>Hello,${user.name}</p>
            <p>Please change your passwords by clicking the link below:</p>
            <p><a href="${process.env.BASEURLC}resetPassword/${token.token}/${user._id}">Reset Password</a></p>
    `
        })
        return res.status(200).json({
            token: token,
            message: 'check email to reset your password'
        })
    }
    catch (err) {
        return res.status(400).json({
            message: "email didn't match"
        })
    }
}
exports.resetPassword = async (req, res) => {
   // console.log(req.body)
    try {
        const { token, _id, password } = req.body;
        let resetToken = await TokenModel.findOne({ token });
        if (!resetToken) {
            console.log("token not found")
            return res.status(400).json({
                error: "Invalid or expired token"
            });
        }
        let user = await UserModel.findById(_id);
        if (!user) {
            console.log("user not found")
            return res.status(400).json({
                error: "Invalid user"
            });
        }
        user.password = password;
        user = await user.save();
        await resetToken.deleteOne();
        return res.status(200).json({
            message: "Password reset successfully"
        });
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}
exports.getUser = async (req, res) => {
    try {
        const user = await UserModel.find();
        res.send(user)
    }
    catch (err) {
        res.status(400).json(err)
    }
}
