
import React, { useState, useEffect } from 'react'
import { useGlobalState } from '../context/GlobalState';
import { useRouter } from 'next/navigation';
import authService from '../services/auth.service';
import { jwtDecode } from "jwt-decode";
import styles from '../styles/home.module.css';
import Link from 'next/link';

export default function Home() {

  const { state, dispatch } = useGlobalState();

  useEffect(() => {
    const getUserFromLocalStorage = () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = jwtDecode(userData);
        console.log('User data:', user);
        dispatch({
          type: 'SET_USER',
          payload: user
        });
      }
    };
    getUserFromLocalStorage();
  }, []);

  const handleLogout = () => {
    authService.logout();
    dispatch({ type: 'LOGOUT_USER' });
    router.push('/');
  };

  return (
    <>
      <main className={`${styles.main}`}>
        <div className="container">
            <div className="row">
                <div className="col-6">
                    <h1>Tiny Trackers</h1>
                    <p>Need help keeping track of medications and logging symptoms for your children? Look no further than TinyTrackers!</p>
                </div>
                <div className='col-6'>
                  {/* log in container */}
                  <div className='container d-flex justify-content-center align-items-center min-vh-100'> 
                    <div className='row border rounded-5 p-3 bg-white shadow box-area'>
                      <div className='col-md-6 rounded-4 justify-content-center align-items-center flex-column left-box'>

                      </div>
                      <div className='col-md-6 right-box'>
                        <div className='row align-items-center'>
                          <div className='header-text mb-4'>
                            <p>Hello!</p>
                            <p>Welcome to TinyTrackers!</p>
                          </div>
                          <div className='input-group mb-3'>
                            <input type="text" className='form-control form control-lg bg-light fs-6' placeholder='Email Address'></input>
                          </div>
                          <div className='input-group mb-1'>
                            <input type="password" className='form-control form control-lg bg-light fs-6' placeholder='Password'></input>
                          </div>
                          <div className='input-group mb-3 d-flex justify-content-between'>
                            <div className='forgot mt-2 fs-6'>
                              <a href='#'>Forgot Password?</a>
                            </div>
                            <div className='login-button'>
                              <button className='btn btn-lg btn-primary w-30 fs-6'>Log In</button>
                            </div>
                          </div>
                          <div className='row mb-3'>
                            <small>Don't have account? <a href='#'>Sign up</a></small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        </div>
        <div className={styles.grid}>
          {state.user ? (
              <li className="nav-item">
                <Link href="/" className={styles.logout} onClick={handleLogout}>Logout</Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link href="/login">Login</Link>
              </li>
            )}
        </div>
      </main>
    </>
  )
}
