import Navbar from './Navbar';
import {Component} from 'react';
import Footer from './Footer';

class Layout extends Component{
    render(){
        return(
            <div style={{minHeight:'100vh',overflowY:'auto'}}>
                <div className = "p-2" style = {{backgroundColor:'#fff',width:'100%',minHeight:'10vh'}}>
                    <Navbar />
                </div>
                <div style = {{minHeight:'65vh'}}>
                    {this.props.children}
                </div>
                    
                <Footer />

            </div>
        )
    }
}

export default Layout;