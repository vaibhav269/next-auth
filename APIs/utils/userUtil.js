var con = require('../../config/db');
var suid = require('rand-token').suid;

class UserUtil{
    static async isEmailUnique(email){   //returns true if email is unique(i.e  doesn't exist in database) otherwise false
        let sql = `select count(*) as count from users where email like '${email}'`;

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
        let sql = `select count(*) as count from users where mobile like '${mobile}'`;

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

    static async setSession(user_id){
        let token = suid(16);
        let sql = `select id from users where id = '${user_id}'`;
        console.log(sql);
        try{
            let result = await con.query(sql);
            let user_id = result[0]['id'];
            sql = `insert into user_sessions(user_id,token) values(${user_id},'${token}')`;
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
            let sql = `select id from user_sessions where token = '${token}'`;
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
            let sql = `delete from user_sessions where token = '${token}'`;
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
            let sql = `select users.id,name from users inner join user_sessions on users.id = user_sessions.user_id where token = '${token}'`;
            let result = await con.query(sql);
            return {
                success: true,
                result: result[0]
            }
        } catch (err) {
            console.log(err);
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