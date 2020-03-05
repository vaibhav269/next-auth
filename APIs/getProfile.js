var userUtil = require('./utils/userUtil');
const auth = require('./middlewares/auth');

module.exports=function(app){
    app.post('/api/get-profile',auth,async function(req,res){
        const {token} = req.cookies;
        result = await userUtil.getProfile(token);

        if(result.success){
            res.status(200).send({
                success:true,
                data:result.result
            });
        }else{
            return res.status(500).send({
                success:false,
                message:'Some error occured'
            });
        }
        
    });
}