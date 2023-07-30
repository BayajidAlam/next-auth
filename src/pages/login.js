import { GoogleOutlined, GithubOutlined } from "@ant-design/icons";
import Head from "next/head";
import styles from "@/styles/Login.module.css";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { auth } from "@/firebase/firebase.auth";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';

const LoginPage = () => {

  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);
  console.log(user);
  const {
    register,
    handleSubmit,
  } = useForm();

  const handleLogIn = (data) => {
    createUserWithEmailAndPassword(data.email,data.password)
  }
  
  return (
    <div>
      <Head>
        <title>Next Login</title>
      </Head>
      <div className={styles.form}>
        <h3>LOGIN</h3>
        <div className={styles.social_icons}>
          <GoogleOutlined
          onClick={()=>signIn('google',{
            callbackUrl: "http://localhost:3000"
          })}
          />
          <GithubOutlined 
          onClick={()=>signIn('github',{
            callbackUrl: 'http://localhost:3000'
          })}/>
        </div>
        <hr />
        <form onSubmit={handleSubmit(handleLogIn)}>
          <label htmlFor="">Your Email</label>
          <input 
          {...register('email')}
          type="email" />
          <label htmlFor="">Your Password</label>
          <input 
           {...register('password')}
          type="password" />
          
          <button>Login</button>
        </form>
      </div>
     
    </div>
  );
};

export default LoginPage;
