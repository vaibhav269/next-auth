var otpUtil  = require('./utils/otpUtil');
var UtilUsers  = require('./utils/userUtil');
var bcrypt   = require('bcrypt-nodejs');
var md5 = require('md5');

module.exports = function(app){
    app.post('/api/signup',async function(req,res){
        let {mobile,password,name,email} = req.body;

        mobile = mobile.trim();
        name = name.trim();
        email = email.trim();

        if (!name) {
            return res.status(400).send({
                success: false,
                message: 'Error: name cannot be blank.'
            });
        }
        else if (!mobile) {
            return res.status(400).send({
                success: false,
                message: 'Error: mobile cannot be blank.'
            });
        }
        else if (!email) {
            return res.status(400).send({
                success: false,
                message: 'Error: Email cannot be blank.'
            });
        }

        else if(!password){
            return res.status(400).send({
                success: false,
                message: 'Error: password cannot be blank.'
            });
        }

        let resultMob = await UtilUsers.isMobileUnique(mobile);
        let resultEmail = await UtilUsers.isEmailUnique(email);

        if(!resultMob.success){
            console.log(resultMob.err);
            return res.status(400).send({
                success:false,
                message:'some error occured while checking Mobile number'
            });
        }
        
        else if(!resultMob.result){
            return res.status(400).send({
                success:false,
                message:'Mobile already exists'
            });
        }

        if(!resultEmail.success){
            console.log(resultEmail.err);
            return res.status(400).send({
                success:false,
                message:'some error occured while checking Email'
            });
        }
        
        else if(!resultEmail.result){
            return res.status(400).send({
                success:false,
                message:'Email already exists'
            });
        }
        
        const pass = md5(req.body.password);
        req.body.password = pass;
        let data = JSON.stringify(req.body); //user data
        let otp = await otpUtil.generateOtp(mobile);
        let result = undefined;

        result = await otpUtil.sendOtp(mobile,otp,'phone','signup',data);

        if(result.success){
            res.status(200).send({
                success: true,
                token: result.token
            })
        }
        else{
            res.status(200).send({
                success:false,
                message:result.message
            })
        }
    });
}