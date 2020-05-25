const con = require('../config/db');
var md5 = require('md5');

module.exports = function(app){
    app.post('/api/verifyOtp',async (req,res)=>{
        const token = req.body.token.trim();
        const otp = req.body.otp;
        const task = req.body.task.trim();

        if(!token){
            return res.send({
                success:false,
                message:'Something went wrong try again later'
            });
        }
        else if(!otp){
            return res.send({
                success:false,
                message:"OTP cannot be blank"
            });
        }
        else if(isNaN(otp)){
            return res.send({
                success:false,
                message:"Invalid OTP"
            });
        }else if(!task){
            return res.send({
                success:false,
                message:'Wrong Task'
            });
        }

        switch(task){
            case 'signup':
                try{
                    const otps = await con.query(`Select * from otp where token = '${token}' and otp = '${otp}' and date_added >= NOW() - INTERVAL 5 MINUTE and is_verified = 'n'`);
                    if (otps.length > 0) {        //checking if otp already exists
                        let data = JSON.parse(otps[0].data);

                        let sql = `insert into users(name,email,username,password,mobile,status) 
                                    values('${data.name}','${data.email}','${data.mobile}','${data.password}','${data.mobile}','a')`;

                        await con.query(sql);

                        sql = `update otp set is_verified = 'y' where id = ${otps[0].id}`;
                        await con.query(sql);
                        return res.status(200).send({
                            success: true,
                            message: 'OTP verified'
                        })

                    } else {
                        return res.status(402).send({
                            success:false,
                            message:'Invalid OTP'
                        });
                    }
                }
                catch(err){
                    console.log(err);
                    return res.status(500).send({
                        success:false,
                        message:'Some Error Occured,Please try again later'
                    });
                }

            case 'forgot-password':
                const password = req.body.password;
                if(!password){
                    res.status(400).send({
                        success:false,
                        message:'Password cannot be blank'
                    });
                }
                const pass = md5(password);
                try{
                    const otps = await con.query(`Select * from otp where token = '${token}' and otp = ${otp} and date_added >= NOW() - INTERVAL 5 MINUTE and is_verified = 'n'`);
                    if (otps.length > 0) {        //checking if otp already exists
                        let mobile = otps[0].mobile.substring(2);
                        let sql = `update users set password = '${pass}' where mobile = '${mobile}'`;

                        await con.query(sql);

                        sql = `update otp set is_verified = 'y' where id = ${otps[0].id}`;
                        await con.query(sql);

                        return res.status(200).send({
                            success: true,
                            message: 'OTP verified'
                        })

                    } else {
                        return res.status(402).send({
                            success:false,
                            message:'Invalid OTP'
                        });
                    }
                }
                catch(err){
                    console.log(err);
                    return res.status(500).send({
                        success:false,
                        message:'Some Error Occured,Please try again later'
                    });
                }
        }
    });
}