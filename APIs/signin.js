var con = require('../config/db');
var UtilUsers  = require('./utils/userUtil');
var md5 = require('md5');

module.exports = function(app){
    app.post('/api/signin',async function(req,res){
        const password = req.body.password;
        let username = req.body.username.trim();
        let type = undefined;
        let {dev_info='',dev_token='',os=''} = req.body;
        if(!username){
            return res.status(400).send({
                success:false,
                message:'Error:username cannot be blank'
            });
        }

        if(!password){
            return res.status(400).send({
                success:false,
                message:'Error:Password cannot be blank'
            });
        }

        let resultMob = await UtilUsers.isMobileUnique(username);    //checking if mobile number exists in the database

        if(!resultMob.success){
            console.log(resultMob.err);
            return res.status(500).send({
                success:false,
                message:'Some error occured'
            });
        }

        else if(resultMob.result){
            let resultUsername = await UtilUsers.isUsernameUnique(username);   //checking if username exists in the database
            if(!resultUsername.success){
                console.log(resultUsername.err);
                return res.status(500).send({
                    success:false,
                    message:'Some error occured'
                });
            }else if(!resultUsername.result){
                type  = 'username';
            }
        }else{
            type = 'mobile';
        }

        if(!type){
            return res.status(402).send({
                success:false,
                message:'Invalid Credentials'
            })
        }

        if(type == 'mobile'){
            sql = `SELECT id,password from users where mobile = '${username}'`;
        }else if(type == 'username'){
            sql = `SELECT id,password from users where username = '${username}'`;
        }

        try{
            const result = await con.query(sql);
            const success = (md5(password) == result[0]['password'])?true:false;

            if(success){
                let sessionResp = undefined;

                //fix session table
                sessionResp = await UtilUsers.setSession(result[0]['id'],dev_token,dev_info,os,'user');

                if(sessionResp.success){
                    res.cookie('token',sessionResp.token,{maxAge: 2147483647});
                    res.status(200).send({
                        success:true,
                        message:'Successfully logged In'
                    });
                }else{
                    console.log(sessionResp.message);
                    res.status(402).send({
                        success:false,
                        message:"Error: Account doesn't exist"
                    });
                }
            }
            else{
                res.status(402).send({
                   success:false,
                   message:'Invalid Credentials' 
                });
            }
        }
        catch(err){
            console.log(err);
            res.status(500).send({
                success:false,
                message:'Some error occured'
            });
        }
    });
}