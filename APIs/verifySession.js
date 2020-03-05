const auth = require('./middlewares/auth');

module.exports=function(app){
    app.post('/api/verify-session',auth,async function(req,res){
        //auth middleware will send the response in case of invalid token
        return res.status(200).send({
            success:true,
            message:'valid'
        });
    });
}