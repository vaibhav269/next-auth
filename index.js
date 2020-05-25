const next = require('next');
const express = require('express');
const dev = process.env.NODE_ENV !== 'production';
const port = process.env.port || 3000;
const http = require("http");
const cookieParser = require('cookie-parser');
const uid = require('rand-token').uid;
const con = require('./config/db');

const app = next({dev});
const handle = app.getRequestHandler();

app.prepare().then(()=>{
    let expApp = express();
    expApp.use(express.json());

    expApp.use(cookieParser());    

    require('./APIs/signup')(expApp);
    require('./APIs/signin')(expApp);
    require('./APIs/verifyOtp')(expApp);
    require('./APIs/forgotPassword')(expApp);
    require('./APIs/verifySession')(expApp);
    require('./APIs/logout')(expApp);
    require('./APIs/getProfile')(expApp);


    expApp.get('*',(req,res)=>{
        return handle(req,res);
    });

    const server = http.createServer(expApp);
    
    server.listen(port, () => console.log(`Listening on port ${port}`));
})
