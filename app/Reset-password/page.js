import React from 'react'
import Input from '../Components/Elements/Input'

export default function page() {
    return (
    <div className="ResetPassword login-area ">
      <div className='forgot-password'>
      {/* <Link href="/" class="flex mx-auto"> <Image src={logo} width={100} height={100} alt="logo" /> </Link> */}
        <h4>Type Your New Password</h4><br/>   
        <form>
            <span>
                <label htmlFor="password">New Password</label><br/>
                <Input type={"number"} placeholder={'New Password'} id={'passsowrd'}/><br/><br/>
                <label htmlFor="cpass">Confirm Password</label><br/>
                <Input type={"password"} placeholder={'Confirm Password'} id={'cpass'}/><br/>
            </span>
            <span>
                 <Input type={"Submit"} value={"Submit"} />
            </span>
        </form>
      </div>
    </div>
  )
}
