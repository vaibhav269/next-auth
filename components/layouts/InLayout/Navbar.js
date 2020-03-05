import {Component} from 'react';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import Router from 'next/router';
import params from '../../../config/params';
import Cookie from 'js-cookie';

export default class Navbar extends Component{

    logout = async ()=>{
        try {
            const token = Cookie.get('token');
            const response = await fetch(`${params.hostname}/api/logout`, {
                method:'POST',
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            });

            if(response.ok){
                Cookie.remove('token');
                Router.push('/');
            }else{
                alert('Some error occured please try again later');
            }
        }catch(err){
            console.log(err);
            alert('Some error occured please try again later');
        }
    }

    render(){
        return(
            <div className="w-100 pb-2 pt-1" >
                <nav className = "container">
                    <div className = "row no-gutters justify-content-between align-items-center">
                        
                        <div className = "col-auto">
                            <div className="m-0 d-inline-block" style={{ outline: "none"}}>
                                <Link href='/' >
                                    <a>
                                        <img src="/billfree_logo.png" style={{ maxWidth: '100%', maxHeight: '7vh' }} alt = "logo"/>
                                    </a>
                                </Link> 
                            </div>
                        </div>

                        <div className="col-auto">
                            <ul className = "list-unstyled">
                                <li className = "d-inline-block">
                                    <Link href='/profile' >
                                        <a className = "btn btn-link">
                                            Profile
                                        </a>
                                    </Link>
                                </li>
                                <li className = "d-inline-block">
                                    <button className="btn ml-3 text-white" style={{ backgroundColor: '#ee5572' }} onClick = {this.logout}>
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}