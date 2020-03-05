var userUtil = require('./utils/userUtil');

module.exports = function(app){
    app.post('/api/logout',async function(req,res,next){
        const token = req.headers['authorization'].replace("Bearer","").trim();
        let result = undefined;
    
        result = await userUtil.deleteSession(token);
    
        if(result.success){
            return res.status(200).send({
                success:true,
                message:'Successfully Logged out'
            })
        }else{
            return res.status(500).send({
                success:false,
                message:'Some error occured'
            });
        }
    })
}