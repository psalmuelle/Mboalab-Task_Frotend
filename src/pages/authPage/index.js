import React, { useEffect } from "react";
import "./authStyles.css";
import { useNavigate } from "react-router-dom";
import allServices from "../../services/allServices";
import { useForm } from "react-hook-form";

import { useSelector, useDispatch } from "react-redux";
import { checkAuthentication } from "../../redux/userSlice";

function Signup() {
  const navigate = useNavigate();
  const loggedIn = useSelector((state) => state.user.authenticated);
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    allServices.register(data).then(() => {
      navigate("/");
    });
  };

  useEffect(() => {
    document.title = "Mboalab";

    allServices.getUser().then((res) => {
      if (Object.keys(res.data).length >= 1) {
        dispatch(checkAuthentication());
      } else {
        localStorage.clear();
      }
    });
  }, []);

  useEffect(() => {
    if (loggedIn) {
      return navigate("/");
    }
  }, [loggedIn]);
  return (
    <div className='user-auth'>
      <main className='auth__container'>
        <figure>
          <p>Kindly Register To Have Access To Form!</p>
        </figure>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type='text'
            placeholder='Your Name'
            autoComplete='off'
            required
            {...register("username", { required: true })}
          />
          <input
            type='email'
            name='email'
            id='email'
            placeholder='Email Address'
            required
            {...register("email", { required: true })}
          />
          <input
            type='password'
            name='password'
            id='password'
            placeholder='Password'
            required
            {...register("password", { required: true })}
          />
          <button type='submit'>submit</button>
          <hr className='page__break' />
          <p class='TandC'>
            Already, Have an Account?{" "}
            <span onClick={() => navigate("/login")}>Sign-in</span>
          </p>
        </form>
      </main>
    </div>
  );
}

function Signin() {
  const navigate = useNavigate();
  const loggedIn = useSelector((state) => state.user.authenticated);
  const dispatch = useDispatch();


  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    allServices.login(data).then((res) => {
      navigate("/");
      console.log(res)
    });
  };

  useEffect(() => {
    document.title = "Mboalab";

    allServices.getUser().then((res) => {
      if (Object.keys(res.data).length >= 1) {
        dispatch(checkAuthentication());
      } else {
        localStorage.clear();
      }
    });
  }, []);

  useEffect(() => {
    if (loggedIn) {
      return navigate("/");
    }
  }, [loggedIn]);

  return (
    <div className='user-auth'>
      <main className='auth__container'>
        <figure>
          <p>Kindly Login To Have Access To Form!</p>
        </figure>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type='text'
            placeholder='Your Name'
            required
            {...register("username", { required: true })}
          />
          <input
            type='password'
            name='password'
            id='password'
            placeholder='Password'
            required
            {...register("password", { required: true })}
          />
          <button type='submit'>submit</button>
          <hr className='page__break' />
          <p class='TandC'>
            Already, Have an Account?{" "}
            <span onClick={() => navigate("/register")}>Sign-up</span>
          </p>
        </form>
      </main>
    </div>
  );
}

export { Signin, Signup };
