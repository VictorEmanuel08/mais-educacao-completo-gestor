import React, { ChangeEvent, useContext, useState } from 'react'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { Link, useNavigate } from 'react-router-dom'
const logoImg = require('../assets/logo2x.png')
// import { logoImg } from '../assets/images/logo.png'

// import { Button } from '../components/Button'
// import '../styles/login.scss'

function Login() {
  const [values, setValues] = React.useState({
    password: '',
    showPassword: false
  })

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event: { preventDefault: () => void }) => {
    event.preventDefault()
  }

  const handlePasswordChange =
    (prop: string) => (event: { target: { value: any } }) => {
      setValues({ ...values, [prop]: event.target.value })
    }

  const navigate = useNavigate()

  async function loginEducacao() {
    navigate('/home')
  }

  return (
    <main className=" h-screen flex justify-center items-center bg-dark-purple">
      <div className="flex justify-center items-center  flex-col">
        <img className="h-46% w-80%" src={logoImg} alt="Logo +Educação" />

        <form className="flex justify-center items-center  flex-col">
          <input
            className="h-12 w-80 rounded-lg bg-[#ffffff] p-3 border-0 my-4 outline-none"
            type="text"
            placeholder="MATRÍCULA"
          />

          {/* <input  className="h-12 w-44 rounded-lg bg-[#ffffff] p-2.5 border-0 my-4 outline-none"
          type="password" 
          placeholder="**********"
          /> */}

          <Input
            className="h-12 w-80 rounded-lg bg-[#ffffff] p-2.5 border-0 my-4 outline-none "
            type={values.showPassword ? 'text' : 'password'}
            placeholder="********"
            onChange={handlePasswordChange('password')}
            value={values.password}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  className="w-px"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />

          <div className="flex items-center justify-center text-white mb-3.5 text-[12px] no-underline">
            <Link to="/">ESQUECEU SUA SENHA?</Link>
          </div>
          <button
            className="flex items-center justify-center cursor-pointer bg-[#18c4b3] w-48 h-10 text-white text-base p-4	border-0 rounded-lg"
            type="submit"
            onClick={loginEducacao}
          >
            ENTRAR
          </button>
        </form>
      </div>
    </main>
  )
}

export default Login
