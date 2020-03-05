import {Component} from 'react';
import Link from 'next/link';

export default class Navbar extends Component{
    render(){
        return(
            <div style = {{width:'80%',margin:'auto'}}>
                
                <div className="text-center mt-3">
                    {/* <Link href={'/'}> */}
                        {/* <img src="/logo_200x200.png" style={{ maxHeight: '14vh', cursor: 'pointer' }} alt = "logo"/> */}
                    {/* </Link> */}
                </div>

                {/* <div className="d-md-none text-center mt-3">
                    <Link href={'/'}>
                        <img src="/logo.png" style={{ maxHeight: '14vh', cursor: 'pointer' }} />
                    </Link>
                </div> */}

                {/* <div className="d-none d-md-block">
                    <Link href={'/'}>
                        <img src="/logo.png" style={{ maxHeight: '14vh', cursor: 'pointer' }} />
                    </Link>
                </div> */}
            </div>
        )
    }
}