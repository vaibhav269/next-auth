const HOST_ENV = process.env.HOST_ENV;

let obj;
if(HOST_ENV == 'local'){
    obj = {
        hostname: 'http://localhost:5000',
        msg91:{
            msg91Key : '155812AQrj1DHf593cfa79'
        }
    }
}else{
    obj = {
        hostname: 'http://localhost:5000',
        msg91:{
            msg91Key : '155812AQrj1DHf593cfa79'
        }
    }
}

module.exports = obj;