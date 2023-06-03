import userModel from '../models/userModel.js';
import JWT from 'jsonwebtoken'
// const JWT = require('jsonwebtoken')


//prtected routes token base
export const requireSignIn = async (req, res, next) => {
    try {
        // const token = req.body.token;
        const decode = JWT.verify(
            req.headers.authorization,
            process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            success: false,
            error,
            message: "Error in require signIn",
        })
    }
    // const header = req.body.header;
    // await JWT.verify(req.header.authorization, process.env.JWT_SECRET).then(user => {
    //     console.log('user' + user)
    //     req.USER = user
    //     next()
    // }).catch( err => {
    //     res.status(401).json({ Error: 'Usuario no registrado' })
    // })
};

// admin access
export const isAdmin = async (req, res, next) => {
    try {
      const user = await userModel.findById(req.user._id);
      if (user.role !== 1) {
        return res.status(401).send({
          success: false,
          message: "UnAuthorized Access",
        });
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
      res.status(401).send({
        success: false,
        error,
        message: "Error in admin middelware",
      });
    }
  };