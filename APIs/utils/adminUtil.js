var con = require('../../config/db');
var suid = require('rand-token').suid;

class AdminUtil{
    static async isEmailUnique(email){   //returns true if email is unique(i.e  doesn't exist in database) otherwise false
        let sql = `select count(*) as count from admins where email like '${email}'`;        

        try{
            let result = await con.query(sql);
            
            if(result[0].count === 0){
                return {success:true,result:true}
            }else{
                return {success:true,result:false}
            }

        }catch(err){
            return {success:false,err:err}
        }
    }

    static async isMobileUnique(mobile){   //returns true if mobile is unique(i.e  doesn't exist in database) otherwise false
        let sql = `select count(*) as count from admins where mobile like '${mobile}'`;        

        try{
            let result = await con.query(sql);
            
            if(result[0].count === 0){
                return {success:true,result:true}
            }else{
                return {success:true,result:false}
            }

        }catch(err){
            return {success:false,err:err}
        }
    }

    static async setSession(email){
        let token = suid(16);
        let sql = `select id from admins where email = ${email}`;
        try{
            let result = await con.query(sql);
            let adminId = result[0]['id'];
            sql = `insert into admin_sessions(adminId,token) values('${adminId}','${token}')`;
            let result1 = await con.query(sql);
            return {
                success:true,
                token:token,
                message:"session established"
            }
        }
        catch(err){
            console.log(err);
            return {
                success:false,
                message:"can't establish session"
            }
        }
    }

    static async verifySession(token){
        try{
            let sql = `select id from admin_sessions where token = '${token}'`;
            let result = await con.query(sql);
            if(result.length == 0){
                return {
                    success:true,
                    result:false
                };
            }else{
                return{
                    success:true,
                    result:true
                }
            }
        }catch(err){
            return{
                success:false,
                err:err
            }
        }
    }

    static async deleteSession(token){
        try{
            let sql = `delete from admin_sessions where token = '${token}'`;
            let result = await con.query(sql);
            return{
                success:true
            }
        }catch(err){
            return{
                success:false,
                err:err
            }
        }
    }

    static async getProfile(token){
        try{
            let sql = `select admins.id as admin_id,name,mobile,email from admins inner join admin_sessions on admins.id = admin_sessions.adminId where token = '${token}'`;
            let result = await con.query(sql);
            return {
                success: true,
                result: result[0]
            }
        } catch (err) {
            return {
                success: false,
                err: err
            }
        }
    }
}

module.exports = AdminUtil;