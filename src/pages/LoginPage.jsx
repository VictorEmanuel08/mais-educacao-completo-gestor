import React, { useState, useContext } from "react";
import { AuthContext } from "../context/auth";
import logoImg from "../assets/logo2x.png";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";

const LoginPage = () => {
  const { login } = useContext(AuthContext);

  const [mat, setMat] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    login(mat, password); //interação com o contexto/api
  };

  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });
  
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  const handlePasswordChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <main className=" h-screen flex justify-center items-center bg-dark-purple">
      <div className="flex justify-center items-center  flex-col">
        <img className="h-46% w-80%" src={logoImg} alt="Logo +Educação" />

        <form
          className="flex justify-center items-center  flex-col"
          onSubmit={handleSubmit}
          
        >
          <input
            className="h-12 w-80 rounded-lg bg-[#ffffff] p-3 border-0 my-4 outline-none"
            type="text"
            name="mat"
            placeholder="MATRÍCULA"
            value={mat}
            onChange={(e) => setMat(e.target.value)}
          />
          
          <Input
            className="h-12 w-80 rounded-lg bg-[#ffffff] p-2.5 border-0 my-4 outline-none "
            type={values.showPassword ? "text" : "password"}
            name="password"
            placeholder="********"
            value={password}
            onChange={(e) => (setPassword(e.target.value), handlePasswordChange("password"))}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          
          <div className="flex items-center justify-center text-white mb-3.5 text-[12px] no-underline"></div>
          <button
            className="flex items-center justify-center cursor-pointer bg-[#18c4b3] w-48 h-10 text-white text-base p-4	border-0 rounded-lg"
            type="submit"
          >
            ENTRAR
          </button>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;
