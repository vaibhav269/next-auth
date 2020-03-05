import Link from 'next/link';

class Footer extends React.Component{
    render(){
        return(
            <div className = "text-center bg-dark text-white mt-5 pt-5" style = {{minHeight:'20vh'}}>
                <div className = "container-fluid">
                    <div className = "row no-gutters justify-content-center">
                        <div className = "col-12 text-center">
                            <span>&copy; tweeng.in 2020</span>
                        </div>
                    </div>

                    <div className = "row no-gutters justify-content-center mt-3">
                        
                        <div className = "col-md-6">
                            <h4 className = "text-center"><u>Contact</u></h4>
                            <p className = "text-center">Mail us at: care@tweeng.in</p>
                        </div>

                        <div className = "col-md-6">
                            <h4 className = "text-center"><u>Support</u></h4>
                            <p className = "text-center">Mail us at: support@tweeng.in</p>
                        </div>
                    </div>
                    <div className = "row no-gutters justify-content-center">
                        <div className = "col-12 text-center" >
                            <Link href = "/privacy-policy">
                                <a className = "btn btn-link"> Privacy policy </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;