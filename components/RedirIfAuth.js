import fetch from 'isomorphic-unfetch';
import Router from 'next/router';
import nextCookie from "next-cookies";
import params from '../config/params';

const RedirIfAuth = (WrappedComponent,redirectTo)=>{
    
    return class Abc extends React.Component{
        
        static getInitialProps = async (ctx)=>{
            const { token } = nextCookie(ctx);
            try {
                const response = await fetch(`${params.hostname}/api/verify-session`, {
                    method:'POST',
                    headers:{
                        'Authorization':`Bearer ${token}`
                    }
                });
    
                if (response.ok) {
                    const js = await response.json();
                    
                    if(ctx.req){
                        ctx.res.writeHead(302, { Location: redirectTo });
                        return ctx.res.end();
                    }else{
                        return Router.push(redirectTo)
                    }
                    // return WrappedComponent.getInitialProps(ctx);
                } else {
                    const componentProps = WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx));
                    if(componentProps){
                        return componentProps;
                    }else{
                        return {};
                    }
                }
            } catch (error) {
                console.log(error);
                // don't do anything just load the page as usual
                return {}
            }
        }

        render(){
            return(
                <WrappedComponent {...this.props} />
            )
        }
    }
}

export default RedirIfAuth;