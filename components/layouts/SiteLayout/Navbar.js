import {Component} from 'react';
import Link from 'next/link';

export default class Navbar extends Component{
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
                                    {/* Sending c='l' as param to route auth to select what to show signup/login */}
                                    <Link href = {{ pathname: '/auth', query: { c: 'l' } }} as='/auth' >
                                        <a className="btn ml-3 btn-success ">
                                            Login
                                        </a>
                                    </Link>
                                </li>
                                <li className = "d-inline-block">
                                    {/* Sending c='s' as param to route auth to select what to show signup/login */}
                                    <Link href = {{ pathname: '/auth', query: { c: 's' } }} as='/auth' >
                                        <a className="btn ml-3 btn-link ">
                                            Signup
                                        </a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}