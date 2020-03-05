import fetch from 'isomorphic-unfetch';
import Router from 'next/router';
import nextCookie from "next-cookies";
import params from '../config/params';

const withAuth = (WrappedComponent)=>{
    
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

                    const componentProps = WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx));
                    if(componentProps){
                        return componentProps;
                    }else{
                        return {}
                    }
                    // return WrappedComponent.getInitialProps(ctx);
                } else {
                    if(ctx.req){
                        ctx.res.writeHead(302, { Location: "/auth" });
                        return ctx.res.end();
                    }else{
                        return Router.push("/auth")
                    }
                }
            } catch (error) {
                console.log(error);
                // Implementation or Network error
                if(ctx.req){
                    ctx.res.writeHead(302, { Location: "/auth" });
                    return ctx.res.end();
                }else{
                    return Router.push("/auth")
                }
            }
        }

        render(){
            return(
                <WrappedComponent {...this.props} />
            )
        }
    }
}

export default withAuth;