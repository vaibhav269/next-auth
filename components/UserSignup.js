import React,{Component} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser,faMobile,faKey} from '@fortawesome/free-solid-svg-icons';

class UserSignup extends Component{

    constructor(props){
        super(props);
    }
    
    render(){
        let {handleVal} = this.props;
        return(
            <div>

                <div className="form-group">
                    <div className="border rounded" style={{ backgroundColor: '#f3f7f7' }}>
                        <div className="d-inline-block text-center" style={{ width: '10%' }} >
                            <FontAwesomeIcon
                                icon={faUser}
                                size="sm"
                            />
                        </div>
                        <input
                            type="text"
                            name="name"
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
                            placeholder="Name"
                            onChange={(e) => handleVal('name',e.target.value)}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <div className="border rounded" style={{ backgroundColor: '#f3f7f7' }}>
                        <div className="d-inline-block text-center" style={{ width: '10%' }} >
                            <FontAwesomeIcon
                                icon={faMobile}
                                size="sm"
                            />
                        </div>
                        <input
                            type="mobile"
                            name="mobile"
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
                            placeholder="Mobile"
                            onChange={(e) => handleVal('mobile',e.target.value)}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <div className="border rounded" style={{ backgroundColor: '#f3f7f7' }}>
                        <div className="d-inline-block text-center" style={{ width: '10%' }} >
                            <FontAwesomeIcon
                                icon={faMobile}
                                size="sm"
                            />
                        </div>
                        <input
                            type="email"
                            name="email"
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
                            placeholder="Email"
                            onChange={(e) => handleVal('email',e.target.value)}
                        />
                    </div>
                </div>
    
                <div className="form-group">
                    <div className="border rounded" style={{ backgroundColor: '#f3f7f7' }}>
                        <div className="d-inline-block text-center" style={{ width: '10%' }} >
                            <FontAwesomeIcon
                                icon={faKey}
                                size="sm"
                            />
                        </div>
                        <input
                            type="password"
                            name="password"
                            className="d-inline-block border-0"
                            style={{
                                padding: '5px',
                                width: '90%',
                                fontFamily: 'sans-serif',
                                outline: 'none',
                                backgroundColor: '#f3f7f7',
                                color: '#2C0703',
                                lineHeight: '1.5',
                                fontSize: '100%'
                            }}
                            placeholder="Password"
                            onChange={(e) => handleVal('password',e.target.value)}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default UserSignup;