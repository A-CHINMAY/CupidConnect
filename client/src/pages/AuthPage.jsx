import { useState } from "react";

import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

const AuthPage = () => {
	const [isLogin, setIsLogin] = useState(true);

	return (
		<div
			className='min-h-screen flex items-center justify-center bg-gradient-to-br
		from-indigo-600 to-purple-700 p-4 animate-gradient-x
	'
		>
			<div className='w-full max-w-md transform hover:scale-[1.01] transition-all duration-300'>
				<h2 className='text-center text-3xl font-extrabold text-white mb-8 animate-fade-in'>
					{isLogin ? "Sign in to Swipe" : "Create a Swipe account"}
				</h2>

				<div className='bg-white shadow-2xl rounded-lg p-8 backdrop-blur-sm bg-opacity-95 animate-slide-up'>
					{isLogin ? <LoginForm /> : <SignUpForm />}

					<div className='mt-8 text-center'>
						<p className='text-sm text-gray-600'>
							{isLogin ? "New to Swipe?" : "Already have an account?"}
						</p>

						<button
							onClick={() => setIsLogin((prevIsLogin) => !prevIsLogin)}
							className='mt-2 text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-300 transform hover:scale-105'
						>
							{isLogin ? "Create a new account" : "Sign in to your account"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
export default AuthPage;