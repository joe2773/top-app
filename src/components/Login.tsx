import * as React from 'react'
import FacebookLogin from 'react-facebook-login'

interface ILoginState  {
    isLoggedIn: any,
    facebookId: any
}
interface IProps {
    loginCallBack: (response:any)=>void
}
class Login extends React.Component<IProps,ILoginState>{
    public constructor(props:any){
        super(props)
        this.state = {
            isLoggedIn: false,
            facebookId: ''
        }
        this.responseFacebook = this.responseFacebook.bind(this)
    }
    public responseFacebook(response:any){

        this.props.loginCallBack(response)
    }

    public render(){
        return(
            <FacebookLogin
                appId="401995023755455"
                autoLoad={true}
                fields="name,email,picture"

                callback={this.responseFacebook} />
        )
    }
}
export default Login
