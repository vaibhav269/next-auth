/*
props:-
1.showSignupOrLogin : string('signup'/'login') - to provide which form should be visible initially (signup/login)

Required Components:-
1.Signup component
2.Login component
*/


import React,{Component} from 'react';
import Heading from '../components/Heading'; {/*This is optional heading remove from below if not required(used to provide company heading generally)*/}
import Signup from '../components/Signup';{/* This is the signup component which must be provided*/}
import Login from '../components/Login';{/* This is the Login component which must be provided*/}
import RedirIfAuth from '../components/RedirIfAuth';

const selectedClass = {
    backgroundColor:'#83b040',
    color:'#fff',
    opacity:'0.8',
    cursor:'pointer'
}

const notSeletedClass = {
    opacity:'0.8',
    cursor:'pointer'
}

class Auth extends Component{
    
    static getInitialProps({query}){
        if (query.c) {
            if(query.c == 's'){
                return {
                    showSignupOrLogin: 'signup'
                }
            }else{
                return {
                    showSignupOrLogin: 'login'
                }
            }
        } else {
            return {
                showSignupOrLogin: 'login'
            }
        }
    }

    // componentDidMount(){
    //     this.setState({
    //         showSignupOrLogin:this.props.showSignupOrLogin
    //     });
    // }

    constructor(props){
        super(props);
        this.state = {
            showSignupOrLogin: props.showSignupOrLogin
        }
        this.showSignuporLogin = this.showSignupOrLogin.bind(this);
    }

    showSignupOrLogin(visible){
        this.setState({
            showSignupOrLogin:visible
        })
    }

    render(){
        let {showSignupOrLogin} = this.state;
        return(
            <div className = "container-fluid" style = {{fontFamily:'OpenSans,Arial,Helvetica,sans-serif',fontSize:'120%',opacity:'1.0',padding:'0'}}>
                <div className = "row no-gutters justify-content-center align-items-center">
                <div className = "col-lg-4 col-12">
                <div className = "container-fluid p-0">
                <div className = "row no-gutters mb-5">
                    <div className = "col-12 text-center">
                        <Heading />
                    </div>
                </div>


                <div 
                    className = "row no-gutters border" 
                    style = {{
                                fontFamily:'monospace',
                                fontSize:'130%',
                                backgroundColor:'#fff',
                                boxShadow: '0 6px 16px 0 rgba(115,143,147,.4)'
                            }}
                >

                    <div className = "col text-center p-2"  
                         style = {(showSignupOrLogin == 'login') ? selectedClass:notSeletedClass}
                         onClick = {()=>this.showSignupOrLogin('login')}
                        >
                        <b>Log In</b>
                    </div>

                    <div className = "col text-center border-right p-2" 
                         style = {(showSignupOrLogin == 'signup') ? selectedClass:notSeletedClass}
                         onClick = {()=>this.showSignupOrLogin('signup')}
                        >
                        <b>Sign Up</b>
                    </div>
                </div>
                
                <div className = "row no-gutters border border-top-0 p-4 pb-4" 
                    style = {{
                                backgroundColor:'#fff',
                                boxShadow: '0 6px 16px 0 rgba(115,143,147,.4)'
                            }}
                
                >
                    {
                        (showSignupOrLogin == 'signup')?

                               <div className = "col-12" style = {{maxHeight:'60vh',overflow:"auto"}}>
                                    <Signup />
                                </div>
                                :
                                <div className = "col-12">
                                    <Login />
                                </div>
                    }
                    </div>
                </div>
                </div>
                </div>
            </div>
        )
    }
}

export default RedirIfAuth(Auth,'/profile');