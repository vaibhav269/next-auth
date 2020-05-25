var con = require('../../config/db');
const Msg91 = require('msg91-promise');
const msg91key = require('../../config/params').msg91.msg91Key;
var suid = require('rand-token').suid;

class OtpUtil {
    static async generateOtp(mobile){
        let otp = undefined;
        mobile = mobile.trim();
        let otps = await con.query(`Select otp from otp where mobile = ${mobile} and date_added >= NOW() - INTERVAL 5 MINUTE`);
        if(otps.length>0){
            otp = otps[0].otp;
        }else{
            otp = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000); //generating a 6 digit otp
        }
        return otp;
    }

    static async sendOtp(mobile,otp,otp_type,purpose,data=null,senderId = 'BILLFR'){
        mobile = mobile.trim();
        // otp = otp.trim();
        senderId = senderId.trim();
        let message = '';

        const msg91 = Msg91(msg91key, senderId, 4); //4 is the transactional route code

        if(mobile && mobile.length == 10){
            mobile = "91"+mobile;
        }
        else{
            return {
                success:false,
                message:'Invalid mobile number'
            }
        }

        let otps = await con.query(`Select * from otp where mobile = ${mobile} and data like '${data}' and date_added >= NOW() - INTERVAL 5 MINUTE`);

        if(otps.length > 0){        //checking if otp already exists
            if(otps[0].attempt_count >= 5 ){    //checking for the count of otp requests within 5 minutes
                return {
                    success:false,
                    message:'Sorry you can signup only for five times in 5 minutes. Try again later'
                };
            }else{
                message = `OTP is ${otp}`;
                try{
                    let response = '';
                    if(mobile != '9999999999'){
                        response = await msg91.send(mobile,message);
                    }
                    await con.query(`update otp set attempt_count = ${otps[0].attempt_count+1} where id = ${otps[0].id}`);  //sending previous otp and increasing count
                    return {
                        success:true,
                        token:otps[0].token
                    };
                }
                catch(err){
                    console.log(err);
                    return {
                        success:false,
                        message:'Some error occured,Please try again later'
                    }
                }
            }
        }else{
            //message details
            const token = suid(8);
            message = `OTP is ${otp}`;
            try{
                let response = '';
                if(mobile != '9999999999'){
                    response = await msg91.send(mobile,message);
                }
                await con.query(`insert into otp(mobile,otp,token,purpose,data,otp_type,is_verified,attempt_count,date_added,date_updated,status) 
                                values('${mobile}','${otp}','${token}','${purpose}','${data}','${otp_type}','n  ',0,now(),now(),'a')`);
                return{
                    success:true,
                    token:token
                }
            }
            catch(err){
                console.log(err);
                return{
                    success:false,
                    message:'Some error Occured,Please try again later'
                }
            }
        }
    }
}

module.exports = OtpUtil;