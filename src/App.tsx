import Authlayout from './_auth/Authlayout';
import SignInForm from './_auth/forms/SigninForm';
import SignUpForm from './_auth/forms/SignUpForm';
import { Home } from './_root/pages';
import RootLayout from './_root/RootLayout';

import './globals.css';
import { Route , Routes } from 'react-router-dom';
const App = () => {
  return (
    <main className="flex h-screen ">
        <Routes>
            {/* Public */}
            <Route element = { <Authlayout />}>
                <Route path= "/sign-in" element = {<SignInForm />}/>
                <Route path= "/sign-up" element = {<SignUpForm />}/>
            </Route>
            {/* Private */}
            <Route element = { <RootLayout />}>
                <Route index element = {<Home />} />
            </Route>

        </Routes>
    </main>
  )
}

export default App
