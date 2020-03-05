var con = require('../../config/db');
const Msg91 = require('msg91-promise');
const msg91key = require('../../config/env').msg91.msg91Key;

class SmsUtil {
    static async sendSMS(mobile,message,senderId = 'TWEENG'){
        mobile = mobile.trim();
        // otp = otp.trim();
        senderId = senderId.trim();

        const msg91 = Msg91(msg91key, senderId, 4); //4 is the transactional route code

        if(mobile == '9999999999'){ //dont send sms when the mobile number is this to save sms basically
            return{
                success:true,
                message:'Order SMS Sent'
            }
        }

        if(mobile && mobile.length == 10){
            mobile = "91"+mobile;
        }
        else{
            return {
                success:false,
                message:'Invalid mobile number'
            }
        }

        try{
            let response = await msg91.send(mobile,message);
            // await con.query(`insert into otps(mobile,otp,token,response,date_added,count,type,uvdata) values('${mobile}',${otp},'${token}','${response}',now(),1,'${type}','${uvdata}')`);
            return{
                success:true,
                message:'Order SMS Sent'
            }
        }catch(err){
            console.log(err);
            return{
                success:false,
                message:'Some error occured, Please try again later '
            }
        }
    }
}

module.exports = SmsUtil;