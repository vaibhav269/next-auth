import Link from 'next/link';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHandPointRight} from '@fortawesome/free-solid-svg-icons';

class Footer extends React.Component{
    render(){
        return(
            <div className = "text-center p-5" style = {{minHeight:'20vh',backgroundColor:'#000',color:'#ccc'}}>
                <div className = "container-fluid">
                    <div className = "row no-gutters justify-content-center mt-3">
                        
                        <div className = "col-12 col-md-6">
                            <h4 className = "text-center">Reach Us</h4>
                            <div>
                                <a href="https://www.facebook.com/gobillfree"> 
                                    <img src = "/facebook-logo.png" height = "50px"/>
                                </a>
                                <a href="https://twitter.com/gobillfree"> 
                                    <img src = "/twitter-logo.png" height = "50px"/>
                                </a>
                                <a href="https://www.youtube.com/channel/UCdKO6mtPgyJhE5_gp8YEycA/videos"> 
                                    <img src = "/youtube-logo.png" height = "50px"/>
                                </a>
                                <a href="https://instagram.com/gobillfree"> 
                                    <img src = "/insta-logo.png" height = "50px"/>
                                </a>
                                <a href="https://www.linkedin.com/company/billfree"> 
                                    <img src = "/linkedin-logo.png" height = "50px"/>
                                </a>
                            </div>
                        </div>

                        <div className = "col-12 col-md-6">
                            <h4 className = "text-center">Quick Links</h4>
                            <div>
                                <ul className="list-unstyled">
                                    <li>
                                        <FontAwesomeIcon icon = {faHandPointRight}/>
                                        <a href="/BL_Privacy_Policy.pdf" className="text-white" target="_blank">Privacy Policy</a>
                                    </li>

                                    <li>
                                        <FontAwesomeIcon icon = {faHandPointRight}/>
                                        <a href="/BL_TnC.pdf" className="text-white" target="_blank">Terms & Conditions</a>
                                    </li>

                                    <li>
                                        <FontAwesomeIcon icon = {faHandPointRight}/>
                                        <a href="/BL_Refund_Policy.pdf" className="text-white" target="_blank">Refund & Cancellation Policy</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                        <hr style = {{backgroundColor:'white',width:'25%'}} />

                    <div className = "row no-gutters justify-content-center">
                        <div className = "col-12 text-center text-white" >
                                © 2020 BillFree Labs. All Rights Reserved
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;