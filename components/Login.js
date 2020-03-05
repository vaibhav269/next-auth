{/*
Required Dependency : -
1.@fortawesome/react-fontawesome
2.@fortawesome/free-solid-svg-icons
Container Component
1.Can be used inside SignupLogin component and also individually
*/
}


import React,{Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser,faKey} from '@fortawesome/free-solid-svg-icons';
import fetch from 'isomorphic-unfetch';
import params from '../config/params';
import Router from 'next/router';

class Login extends Component{
    constructor(){
        super();
        this.state = {      
            signinError:'',
            use_case:'login',
            otp_token:undefined
        }
        this.localLogin = this.localLogin.bind(this);
        this.forgotPass = this.forgotPass.bind(this);
        this.setUseCase = this.setUseCase.bind(this);
    }

    localLogin(event){
        event.preventDefault();
        const formData = new FormData(event.target);
        let jsonObject = {};

        for (const [key, value]  of formData.entries()) {
            jsonObject[key] = value;
        }

        var data = new Blob([JSON.stringify(jsonObject,null,2)],{type:'application/json'});
        const options = {
            method : 'POST',
            body : data,
            mode : 'cors',
            cache : 'default'
        }

        fetch(`${params.hostname}/api/signin`,options)
            .then(res=>res.json())
            .then(json=>{
                if(json.success === false){
                    alert(json.message);
                    this.setState({signinError:json.message});
                }
                else if(json.success === true){
                    Router.push('/profile');
                }
            })
            .catch(err=>alert("some error occured"))
    }

    setUseCase(use_case){
        this.setState({
            use_case
        });
    }

    forgotPass(event,task){
        event.preventDefault();
        const formData = new FormData(event.target);
        let jsonObject = {};
        let url = '';
        switch (task) {
            case 'send-otp':
                const mob = formData.get('mobile').trim();
                jsonObject['mobile'] = mob;
                jsonObject['task'] = 'send-otp';
                url = `${params.hostname}/api/forgotPassword`;
                break;
            case 'verify-otp':
                const otp = formData.get('otp').trim();
                jsonObject['otp'] = otp;
                jsonObject['password'] = formData.get('pass');
                jsonObject['token'] = this.state.otp_token;
                jsonObject['task'] = 'forgot-password';
                url = `${params.hostname}/api/verifyOtp`;
        }

        var data = new Blob([JSON.stringify(jsonObject,null,2)],{type:'application/json'});
        const options = {
            method : 'POST',
            body : data,
            mode : 'cors',
            cache : 'default'
        }

        fetch(url,options)
            .then(res=>res.json())
            .then(json=>{
                if(json.success){

                    switch (task) {
                        case 'send-otp':
                            this.setState({
                                otp_token:json.token
                            });
                            document.getElementById('step-1').style.display = "none";
                            document.getElementById('step-2').style.display = "block";
                        break;
                        case 'verify-otp':
                            document.getElementById('step-2').style.display = "none";
                            document.getElementById('step-3').style.display = "block";
                    }

                }else{
                    alert(json.message);
                }
            })
            .catch(err=>alert("some error occured"))
    }

    render(){
        let user_case = this.state.use_case;
        if(user_case == 'login'){
            return(
                <form onSubmit = {this.localLogin}>
                    <div className = "form-group">
                        <div className = "border rounded" style = {{backgroundColor:'#f3f7f7'}}>
                            <div className = "d-inline-block text-center" style = {{width:'10%'}} >
                                <FontAwesomeIcon 
                                        icon = {faUser} 
                                        size = "sm"
                                    />
                            </div>
                            <input 
                                type = "text" 
                                name = "username" 
                                className = "d-inline-block border-0" 
                                style = {{
                                    padding:'5px',
                                    width:'90%',
                                    fontFamily:'sans-serif',
                                    outline:'none',
                                    backgroundColor:'#f3f7f7',
                                    color:'#2C0703',
                                    lineHeight:'1.5',
                                    fontSize:'100%'
                                }}
                                placeholder = "Enter Username"
                            />
                        </div>                        
                    </div>
    
                    <div className = "form-group">
                        <div className = "border rounded" style = {{backgroundColor:'#f3f7f7'}}>
                            <div className = "d-inline-block text-center" style = {{width:'10%'}} >
                                <FontAwesomeIcon 
                                    icon = {faKey}
                                    size = "sm"
                                />
                            </div>
                            <input 
                                type = "password" 
                                name = "password" 
                                className = "d-inline-block border-0" 
                                style = {{
                                    padding:'5px',
                                    width:'90%',
                                    fontFamily:'sans-serif',
                                    outline:'none',
                                    backgroundColor:'#f3f7f7',
                                    color:'#2C0703',
                                    lineHeight:'1.5',
                                    fontSize:'100%'
                                }}
                                placeholder = "Password"
                            />
                        </div>                        
                    </div>
    
                    <div className = "mt-4">
                        <div className = "text-left d-inline-block w-50 btn-link" onClick = {()=>this.setUseCase('forgetPass')} style = {{cursor:'pointer',fontSize:'70%'}}>
                            Forgotten Password?
                        </div>
    
                        <div className = "d-inline-block text-right w-50">
                            <button type = "submit" className = "btn p-2 rounded-0" 
                                style = {{
                                    fontSize:'80%',
                                    boxShadow: '0 6px 16px 0 rgba(115,143,147,.4)',
                                    color:'white',
                                    opacity:'0.8',
                                    backgroundColor:'#83b040'
                                    }}>
                                <b>Login</b>
                            </button>
                        </div>
                    </div>
                </form>
            )
        }
        else{
            return(
                <div>
                    <form id = "step-1" onSubmit = {(event)=>this.forgotPass(event,'send-otp')}>
                        <div className="form-group">
                            <div className = "border rounded" style = {{backgroundColor:'#f3f7f7'}}>
                                <div className = "d-inline-block text-center" style = {{width:'10%'}} >
                                    <FontAwesomeIcon 
                                            icon = {faUser} 
                                            size = "sm"
                                        />
                                </div>
                                <input 
                                    type = "text" 
                                    name = "mobile" 
                                    className = "d-inline-block border-0" 
                                    style = {{
                                        padding:'5px',
                                        width:'90%',
                                        fontFamily:'sans-serif',
                                        outline:'none',
                                        backgroundColor:'#f3f7f7',
                                        color:'#2C0703',
                                        lineHeight:'1.5',
                                        fontSize:'100%'
                                    }}
                                    placeholder = "Enter mobile number"
                                />
                            </div>
                        </div>
                        

                        <div className = "mt-4">
                            <div className = "text-left d-inline-block w-50 btn-link" onClick = {()=>this.setUseCase('login')} style = {{cursor:'pointer',fontSize:'70%'}}>
                                Login
                            </div>
        
                            <div className = "d-inline-block text-right w-50">
                                <button type = "submit" className = "btn p-2 rounded-0" 
                                    style = {{
                                        fontSize:'80%',
                                        boxShadow: '0 6px 16px 0 rgba(115,143,147,.4)',
                                        color:'white',
                                        opacity:'0.8',
                                        backgroundColor:'#83b040'
                                        }}>
                                    <b>Send OTP</b>
                                </button>
                            </div>
                        </div>
                    </form>
                    <form id = "step-2" style = {{display:"none"}} onSubmit = {(event)=>this.forgotPass(event,'verify-otp')}>
                        <div className="form-group">
                            <div className = "border rounded" style = {{backgroundColor:'#f3f7f7'}}>
                                <div className = "d-inline-block text-center" style = {{width:'10%'}} >
                                    <FontAwesomeIcon 
                                            icon = {faKey} 
                                            size = "sm"
                                        />
                                </div>
                                <input 
                                    type = "text" 
                                    name = "otp" 
                                    className = "d-inline-block border-0" 
                                    style = {{
                                        padding:'5px',
                                        width:'90%',
                                        fontFamily:'sans-serif',
                                        outline:'none',
                                        backgroundColor:'#f3f7f7',
                                        color:'#2C0703',
                                        lineHeight:'1.5',
                                        fontSize:'100%'
                                    }}
                                    placeholder = "Enter OTP"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className = "border rounded" style = {{backgroundColor:'#f3f7f7'}}>
                                <div className = "d-inline-block text-center" style = {{width:'10%'}} >
                                    <FontAwesomeIcon 
                                            icon = {faKey} 
                                            size = "sm"
                                        />
                                </div>
                                <input 
                                    type = "password" 
                                    name = "pass" 
                                    className = "d-inline-block border-0" 
                                    style = {{
                                        padding:'5px',
                                        width:'90%',
                                        fontFamily:'sans-serif',
                                        outline:'none',
                                        backgroundColor:'#f3f7f7',
                                        color:'#2C0703',
                                        lineHeight:'1.5',
                                        fontSize:'100%'
                                    }}
                                    placeholder = "Enter New Password"
                                />
                            </div>
                        </div>
                        
                        <div className = "mt-4">
                            <div className = "text-left d-inline-block w-50 btn-link" onClick = {()=>this.setUseCase('login')} style = {{cursor:'pointer',fontSize:'70%'}}>
                                Login
                            </div>
        
                            <div className = "d-inline-block text-right w-50">
                                <button type = "submit" className = "btn p-2 rounded-0" 
                                    style = {{
                                        fontSize:'80%',
                                        boxShadow: '0 6px 16px 0 rgba(115,143,147,.4)',
                                        color:'white',
                                        opacity:'0.8',
                                        backgroundColor:'#83b040'
                                        }}>
                                    <b>Verify OTP</b>
                                </button>
                            </div>
                        </div>
                    </form>
                    <div id = "step-3" className="text-center" style = {{display:'none'}}>
                        <p>Password Sccessfully Changed Click Below to Login</p>
                        <button className = "btn btn-link" onClick = {()=>this.setUseCase('login')} style = {{cursor:'pointer',fontSize:'70%'}}>
                            Login
                        </button>
                    </div>
                </div>
            )
        }
    }
}

export default Login;