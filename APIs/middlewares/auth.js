var userUtil = require('../utils/userUtil');

module.exports = async function(req,res,next){
    const token = req.headers['authorization'].replace("Bearer","").trim();
    let result = undefined;

    result = await userUtil.verifySession(token);

    if(result.success){
        if(result.result){
            next();
        }else{
            return res.status(401).send({
                success:true,
                message:'invalid'
            });
        }
    }else{
        return res.status(500).send({
            success:false,
            message:'Some error occured'
        });
    }
}