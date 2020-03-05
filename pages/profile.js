import fetch from 'isomorphic-unfetch';
import Router from 'next/router';
import nextCookie from "next-cookies";
import params from '../config/params';
import withAuth from '../components/withAuth';
import Layout from '../components/layouts/InLayout/Layout';

class Profile extends React.Component{
    render(){
        return(
            <Layout>
                <div className = "text-center">
                    This is just a profile page that should open only if the user is authenticated.
                </div>
            </Layout>
        )
    }
}

export default withAuth(Profile);