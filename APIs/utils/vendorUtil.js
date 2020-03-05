var con = require('../../config/db');
var suid = require('rand-token').suid;

class VendorUtil{
    static async isMobileUnique(mobile){   //returns true if mobile is unique(i.e  doesn't exist in database) otherwise false
        let sql = `select count(*) as count from vendors where mobile like '${mobile}' and mobile_verified = 'y'`;        

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

    static async setSession(mobile){
        let token = suid(16);
        let sql = `select id from vendors where mobile = ${mobile} and status = 'a'`;
        try{
            let result = await con.query(sql);
            let vendorId = result[0]['id'];
            sql = `insert into vendor_sessions(vendorId,token) values('${vendorId}','${token}')`;
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
            let sql = `select id from vendor_sessions where token = '${token}'`;
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
            let sql = `delete from vendor_sessions where token = '${token}'`;
            let result = await con.query(sql);
            if(result.length == 0){
                return{
                    success:true
                };
            }else{
                return{
                    success:true
                }
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
            let sql = `select vendors.id as vendor_id,name,gender,mobile,address,precise_address,lat,lng,online from vendors inner join vendor_sessions on vendors.id = vendor_sessions.vendorId where token = '${token}'`;
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

    static async getVendorRating(vendorId){
        let sql = `select AVG(feedback) as rating from orders where vendor_id  = ${vendorId}`;
        let rating = await con.query(sql);
        return rating[0].rating;
    }

    static async getVendors(type,centerLat,centerLng,radiusKm = 3,count=20){
        let sql = '',flag = 0;
        try{
            if(type == 'random'){
                flag=1;
                sql = `Select v.id,name,gender,mobile,lat,lng,address,precise_address,pWork,daily_capacity,workOpenTime,workCloseTime,homePick,clothPickTimeStart,clothPickTimeEnd,cr.secure_url from vendors v left join content_repo cr on cr.content_id = v.content_id where v.online = 'y' ORDER BY RAND() limit ${count}`;
            }
            else if(type == 'all'){
                flag=1;
                sql = `Select v.id,name,gender,mobile,lat,lng,address,precise_address,pWork,daily_capacity,workOpenTime,workCloseTime,homePick,clothPickTimeStart,clothPickTimeEnd,v.date_added,cr.secure_url from vendors v left join content_repo cr on cr.content_id = v.content_id ORDER BY v.date_added desc`;
            }
            else if(type == 'active'){
                flag=1;
                sql = `Select v.id,name,gender,mobile,lat,lng,address,precise_address,pWork,daily_capacity,workOpenTime,workCloseTime,homePick,clothPickTimeStart,clothPickTimeEnd,v.date_added,cr.secure_url from vendors v left join content_repo cr on cr.content_id = v.content_id where v.status = 'a' and v.online = 'y' ORDER BY v.date_added desc`;
            }
            else if(type == 'inactive'){
                flag=1;
                sql = `Select v.id,name,gender,mobile,lat,lng,address,precise_address,pWork,daily_capacity,workOpenTime,workCloseTime,homePick,clothPickTimeStart,clothPickTimeEnd,v.date_added,cr.secure_url from vendors v left join content_repo cr on cr.content_id = v.content_id where v.status = 'i' ORDER BY v.date_added desc`;
            }
            else if(type == 'latlng'){
                if(centerLat && centerLng){
                    flag = 1;
                    sql = `SELECT v.id,name,gender,mobile,lat,lng,address,precise_address,pWork,daily_capacity,workOpenTime,workCloseTime,homePick,clothPickTimeStart,cr.secure_url,clothPickTimeEnd, ( 6371 * acos( cos( radians(${centerLat}) ) * cos( radians( lat ) ) * cos( radians( lng ) - radians(${centerLng}) ) + sin( radians(${centerLat}) ) * sin( radians( lat ) ) ) ) AS distance FROM vendors v left join content_repo cr on v.content_id = cr.content_id HAVING distance < ${radiusKm} ORDER BY distance LIMIT ${count}`;
                }
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

module.exports = VendorUtil;