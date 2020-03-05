const UtilUsers  = require('./utils/userUtil');
const otpUtil = require('./utils/otpUtil');

module.exports = function(app){
    app.post('/api/forgotPassword',async function(req,res){
        let mobile = req.body.mobile.trim();
        let task = req.body.task.trim();

        if(!mobile){
            return res.status(400).send({
                success:false,
                message:'Error:mobile cannot be blank'
            });
        }
        
        if(!task){
            return res.status(400).send({
                success:false,
                message:'Error:task cannot be blank'
            });
        }

        let resultMob;

        resultMob = await UtilUsers.isMobileUnique(mobile);    //checking  if mobile number exists in the database

        if(!resultMob.success){
            console.log(resultMob.err);
            return res.send({
                success:false,
                message:'Some error occured'
            });
        }

        else if(resultMob.result){ //MOBILE is unique i.e. it doesn't exists
            return res.send({
                success:false,
                message:"Mobile number doesn't exist"
            });
        }
        else{
            switch(task){
                case 'send-otp':
                    const otp = await otpUtil.generateOtp(mobile);
                    const resp = await otpUtil.sendOtp(mobile,otp,'phone','user');
                    return res.send(resp);
            }
        }
    });    
}