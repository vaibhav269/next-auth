import Layout from '../components/layouts/SiteLayout/Layout';
import RedirIfAuth from '../components/RedirIfAuth';

class Index extends React.Component{
    render(){
        return(
            <Layout>
                <div className = "container-fluid">
                    <div className = "row no-gutters align-items-center justify-content-center">
                        <div className = "col-5">
                            This is homepage nothing else....!
                        </div>
                    </div>
                </div>
                <style jsx>{`
                    
                `}
                </style>
            </Layout>
        )
    }
}

export default RedirIfAuth(Index,'/profile');