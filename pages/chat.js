import fetch from 'isomorphic-unfetch';
import params from '../config/params';
import socketIOClient from "socket.io-client";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCommentDots} from '@fortawesome/free-solid-svg-icons';
import withAuth from '../components/withAuth';
import Cookie from 'js-cookie';
import Layout from '../components/layouts/InLayout/Layout';

class Chat extends React.Component{

    state={
        message:'',
        socket:undefined,
        step:'1'
    }

    static getInitialProps = async ({query})=>{
        const response = await fetch(`${params.hostname}/api/get-messages`);
        if(response.ok){
            const data = await response.json();
            return {
                messages: data.messages
            }
        }else{
            return{
                messages: []
            }
        }
    }
    
    setMessage = (e) =>{
        this.setState({
            message:e.target.value
        })
    }

    sendMessage = (evt)=>{
        evt.preventDefault();
        let {socket,messages} = this.state;
        let newMsg = {
            msg:this.state.message,
            from:'me'
        }
        
        messages.push(newMsg);

        this.setState({
            messages:messages
        });

        socket.emit('sendMsg',newMsg);

        this.setState({
            message:''
        });
    }

    componentDidMount(){
        let {messages} = this.props;    //copying the props to state just to make sure that component updates when new state arrives
        let socket = socketIOClient(params.hostname);
        
        socket.on('newMsg',(msg)=>{
            messages.push(msg);
            this.setState({
                messages:messages
            });
        });
        
        this.setState({
            messages,
            socket
        });
    }

    startChat = async ()=>{
        const token = Cookie.get('token');
        const response = await fetch(`${params.hostname}/api/start-chat`,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        });
        
        if(response.ok){
            const data = await response.json();
            if(data.success){
                this.setState({
                    step:'2'
                });   
            }else{
                alert(data.message)
            }
        }else{
            alert('Some error occured please try again later')
        }
    }

    render(){
        let {messages} = this.props;
        let {message,step} = this.state;
        
        switch(step){
            case '1':
                    return(
                        <Layout>
                            <div className = "container-fluid">
                                <div className = "row no-gutters align-items-center justify-content-center">
                                    <div className = "col-12 col-md-5 text-center p-1" 
                                        style = {{height:'80vh',boxShadow:'0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'}}
                                    >
                                        <div className = "mt-5">
                                            Click the button below to randomly connect with someone and start chatting! 
                                        </div>
                                        <div className = "btn btn-lg mt-3 text-white" onClick = {this.startChat} style = {{backgroundColor:'#ee5572'}}>
                                            <FontAwesomeIcon 
                                                icon = {faCommentDots} 
                                                size = "lg"
                                            />
                                            &nbsp;
                                            <span className = "d-inline-block p-0 m-0"> Start Messaging </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Layout>
                    )

            case '2':
                    return(
                        <Layout>
                            <div className = "container-fluid">
                                <div className = "row no-gutters align-items-center justify-content-center">
                                    <div className = "col-12 col-md-5 text-center p-1" 
                                        style = {{height:'80vh',boxShadow:'0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'}}
                                    >
                                        <div style = {{height:'60vh'}}>
                                            {
                                                messages.map(msg => {
                                                        return(
                                                            <div className = {msg.from}>
                                                                {msg.msg}
                                                            </div>
                                                        )
                                                })
                                            }
                                        </div>
            
                                        <form className = "mt-3 text-center" onSubmit = {this.sendMessage}>
                                            <input type = "text" className = "d-block form-control"  value = {message} onChange = {this.setMessage}/>
                                            <button className = "btn btn-primary mt-3" > Send </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <style jsx>{`
                                .me{
                                    margin-right: 5px;
                                    text-align:right;
                                }
                                .other{
                                    margin-left: 5px;
                                    text-align:left;
                                }
                            `}
                            </style>
                        </Layout>
                    )
        }
    }
}

export default withAuth(Chat);