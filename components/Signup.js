{/*
    Required Dependency : -
    1.@fortawesome/react-fontawesome
    2.@fortawesome/free-solid-svg-icons
    Container Component
    1.Can be used inside SignupLogin component and also individually
*/
}

import React,{Component} from 'react';
import UserSignup from './UserSignup';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMobile} from '@fortawesome/free-solid-svg-icons';
import fetch from 'isomorphic-unfetch';
import params from '../config/params';

class Signup extends Component{
    constructor(props){
        super(props);
        this.state = {
            step: 2,
            name:'',
            mobile: '',
            email: '',
            password: '',
            signupError: '',
            signupSuccess: false,
            otp:undefined,
            token:undefined
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleVal = this.handleVal.bind(this);
        this.verifyOtp = this.verifyOtp.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        var jsonObject = {
            mobile:this.state.mobile,
            email:this.state.email,
            password:this.state.password,
            name: this.state.name,
        }
        var data = new Blob([JSON.stringify(jsonObject,null,2)],{type:'application/json'});
        const options = {
            method : 'POST',
            body : data,
            mode : 'cors',
            cache : 'default'
        }


        fetch(`${params.hostname}/api/signup`,options)
        .then( (res) => {
             return res.json();
        })
        .then((text)=>{
            this.setState({isLoading:false});
            if(text.success === false){
                alert(text.message);
                this.setState({
                        signupError:text.message,
                        signupSuccess:false
                    });
            }
            else if(text.success === true){
                this.setState({
                    token:text.token,
                    signupError:'',
                    signupSuccess:true
                });
                document.getElementById('step-2').style = "display:none";
                document.getElementById('step-3').style = "display:block";
            }
        });
    }

    verifyOtp(e){
        e.preventDefault();
        let jsonObject = {
            token:this.state.token,
            otp:this.state.otp,
            task:'signup'
        }
        var data = new Blob([JSON.stringify(jsonObject,null,2)],{type:'application/json'});
        const options = {
            method : 'POST',
            body : data,
            mode : 'cors',
            cache : 'default'
        }

        fetch(`${params.hostname}/api/verifyOtp`,options)
        .then( (res) => {
            return res.json();
        })
        .then((text)=>{
            if(text.success){
                document.getElementById('step-3').style = "display:none";
                document.getElementById('step-4').style = "display:block";
            }else{
                alert(text.message);
            }
        });
    }

    handleVal(type,val){
        let newState = {...this.state};
        newState[type] = val;
        this.setState(newState);
    }

    render(){
        let {mobile} = this.state;
        return(
            <div>
                <div id = "step-2" >
                    <form onSubmit={this.handleSubmit}>
                            
                        <UserSignup handleVal = {this.handleVal} />

                        <div className="text-right mt-4">
                            <button type="submit" className="btn p-2 rounded-0"
                                style={{
                                    padding: '5px',
                                    fontSize: '80%',
                                    fontFamily: 'sans-serif',
                                    boxShadow: '0 6px 16px 0 rgba(115,143,147,.4)',
                                    color: 'white',
                                    opacity: '0.8',
                                    backgroundColor: '#83b040'
                                }}>
                                <b>Create Account</b>
                            </button>
                        </div>
                    </form>
                </div>

                <div id = "step-3" style = {{display:'none'}}>
                    <form onSubmit = {this.verifyOtp}>
                        <div className="form-group">
                            <label className = "text-muted" style = {{fontSize:'70%'}}>Enter the Otp sent to your mobile number {mobile}</label>
                            <div className="border rounded" style={{ backgroundColor: '#f3f7f7' }}>
                                <div className="d-inline-block text-center" style={{ width: '10%' }} >
                                    <FontAwesomeIcon
                                        icon={faMobile}
                                        size="sm"
                                    />
                                </div>
                                <input
                                    type="number"
                                    name="otp"
                                    placeholder = "OTP"
                                    className="d-inline-block border-0"
                                    style={{
                                        padding: '5px',
                                        width: '90%',
                                        fontFamily: 'sans-serif',
                                        outline: 'none',
                                        backgroundColor: '#f3f7f7',
                                        lineHeight: '1.5',
                                        color: '#2C0703',
                                        fontSize: '100%'
                                    }}
                                    onChange={(e) => {this.handleVal('otp',e.target.value)}}
                                />
                            </div>
                        </div>
                        <div className="text-right mt-4">
                            <button type="submit" className="btn p-2 rounded-0"
                                style={{
                                    padding: '5px',
                                    fontSize: '80%',
                                    fontFamily: 'sans-serif',
                                    boxShadow: '0 6px 16px 0 rgba(115,143,147,.4)',
                                    color: 'white',
                                    opacity: '0.8',
                                    backgroundColor: '#83b040'
                                }}>
                                <b>Verify Otp</b>
                            </button>
                        </div>
                    </form>
                </div>
                <div id = "step-4" style = {{display:'none'}}>
                    <span>Signup successfull! Login to Enjoy the Services </span>
                </div>
            </div>
        )
    }
}

export default Signup;