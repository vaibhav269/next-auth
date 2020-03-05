var con = require('../../config/db');
var suid = require('rand-token').suid;

class UserUtil{
    static async isEmailUnique(email){   //returns true if email is unique(i.e  doesn't exist in database) otherwise false
        let sql = `select count(*) as count from bf_users where user_email like '${email}'`;

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
        let sql = `select count(*) as count from bf_users where user_phone like '${mobile}'`;

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

    static async isUsernameUnique(username){   //returns true if username is unique(i.e  doesn't exist in database) otherwise false
        let sql = `select count(*) as count from bf_users where username like '${username}'`;

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

    static async setSession(userId,dev_token='',dev_info='',os='',user_type = 'user'){
        let token = suid(16);
        try{
            sql = `insert into bf_tokens(user_id,dev_token,dev_info,auth_token,os,user_type,date_added,date_updated,status) values(${userId},'${dev_token}','${dev_info}','${token}','${os}','${user_type}',now(),now(),'a')`;
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
            let sql = `select id from bf_tokens where auth_token = '${token}'`;
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
            let sql = `update bf_tokens set status = 'i' where auth_token = '${token}'`;
            let result = await con.query(sql);
            return{
                success:true
            }
        }catch(err){
            console.log(err);
            return{
                success:false,
                err:err
            }
        }
    }

    static async getProfile(token){
        try{
            let sql = `select users.id as user_id,name,gender,mobile,connected,online,conn_lock from users inner join user_sessions on users.id = user_sessions.userId where token = '${token}'`;
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

    static async getUserById(id){
        try{
            let sql = `select users.id as user_id,name,gender,mobile,connected,online,conn_lock from users where id = ${id}`;
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

    static async getUsers(type,count=20){
        let sql = '',flag = 0;
        try{
            if(type == 'random'){
                flag=1;
                sql = `Select id,name,gender,mobile,lat,lng,address,precise_address,date_added from users ORDER BY RAND() limit ${count}`;
            }
            else if(type == 'all'){
                flag=1;
                sql = `Select id,name,gender,mobile,lat,lng,address,precise_address,date_added from users ORDER BY date_added desc`;
            }

            if(flag){
                let result = await con.query(sql);
                return{
                    success:true,
                    result:result
                }
            }
            else{
                return{
                    success:false,
                    err:'Invalid Parameters'
                }
            }
        }catch(err){
            return{
                success:false,
                err:err
            }
        }
    }

}

module.exports = UserUtil;