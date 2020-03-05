import React,{Component} from 'react';
import Link from 'next/link';

class Heading extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className = "pt-5">
                <Link href = '/'>
                    <a>
                        <img src = "/billfreelogo.png" style = {{maxWidth:'100%',maxHeight:'15vh' }}/>
                    </a>
                </Link>
            </div>
        )
    }
}

export default Heading;