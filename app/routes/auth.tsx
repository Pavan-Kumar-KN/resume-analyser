import react, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router';
import { usePuterStore } from '~/lib/puter';

export const meta = () => ([
   {title: 'DevResuming | Auth'},
   {name: 'description', content: 'Auth route description'}
]);

const Auth = () =>{
  const { isLoading , auth } = usePuterStore();
  // capturing the route when the user tries to access the private route
  const location = useLocation();
  const next = location.search.split('next=')[1];
  const navigate = useNavigate();
  
  useEffect(() =>{
    if(auth.isAuthenticated){
      navigate(next || '/')
    }
  } , [auth.isAuthenticated , next])
  
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen flex items-center justify-center">
      <div className='gradient-border shadow-lg'>
        <div className='flex flex-col items-center gap-2 text-center'>
          <h1>Welcome to DevResuming</h1>
          <h2>Log in to continue your job journey</h2>
        </div>
        <section className='flex flex-col gap-8 bg-white rounded-2xl p-10'>
    
          <div className='flex flex-col'>
            {
              isLoading ? ( 
                <button className='auth-button animate-pulse' disabled>
                  <p>Sigining you in...</p>
                </button>
              ) : (
                <>
                  { auth.isAuthenticated ? (
                    <button className='auth-button' onClick={() => auth.signOut()}>
                      <p>Logout</p>
                    </button>
                  ) : (
                    <button className='auth-button' onClick={() => auth.signIn()}>
                      <p>Login</p>
                    </button>
                  )}
                </>
              )
            }
          </div>
        </section>
      </div>
    </main>
  )
}

export default Auth;