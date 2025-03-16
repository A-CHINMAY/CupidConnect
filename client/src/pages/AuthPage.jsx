import { useState } from "react";

import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

const AuthPage = () => {
	const [isLogin, setIsLogin] = useState(true);

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 p-4">
			<div className="w-full max-w-5xl overflow-hidden rounded-2xl shadow-2xl flex bg-white">
				{/* Left side - decorative area */}
				<div className="hidden md:block md:w-1/2 bg-gradient-to-br from-indigo-600 to-purple-700 p-12 relative overflow-hidden">
					<div className="absolute top-8 left-8">
						<div className="flex items-center">
							<div className="h-10 w-10 rounded-full border-4 border-white opacity-90 -mr-4"></div>
							<div className="h-10 w-10 rounded-full border-4 border-white opacity-90"></div>
							<span className="text-white text-xl font-bold ml-3">SWIPE</span>
						</div>
					</div>

					<div className="mt-24 mb-6 relative z-10">
						<h1 className="text-4xl font-bold text-white mb-4">Welcome Page</h1>
						<p className="text-white/80 text-lg">
							Sign in to continue access
						</p>
					</div>

					<div className="mt-8 text-white/90 relative z-10">
						<p className="text-xl font-light leading-relaxed">
							Find your perfect match with just a swipe.
						</p>
						<p className="mt-4 text-lg font-light leading-relaxed">
							Join thousands of singles looking for meaningful connections, exciting dates, and the chance to find someone special.
						</p>
						<div className="mt-8 flex items-center">
							<div className="flex -space-x-2 mr-4">
								<div className="h-8 w-8 rounded-full bg-pink-300"></div>
								<div className="h-8 w-8 rounded-full bg-indigo-300"></div>
								<div className="h-8 w-8 rounded-full bg-purple-300"></div>
							</div>
							<span className="text-sm text-white/70">10k+ matches daily</span>
						</div>
					</div>

					<div className="absolute bottom-12 left-12 text-white/70">
						www.swipeapp.com
					</div>

					{/* Decorative circles */}
					<div className="absolute top-1/3 right-12 h-20 w-20 rounded-full bg-pink-400/30"></div>
					<div className="absolute bottom-1/4 left-20 h-32 w-32 rounded-full bg-indigo-400/20"></div>
					<div className="absolute top-3/4 right-16 h-16 w-16 rounded-full bg-purple-300/40"></div>
					<div className="absolute bottom-1/2 left-4 h-12 w-12 rounded-full bg-blue-400/30"></div>
				</div>

				{/* Right side - form area */}
				<div className={`w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center`}>
					<div className="mb-8">
						<h2 className="text-center text-3xl font-bold text-gray-800">
							{isLogin ? "Sign In" : "Create Account"}
						</h2>
					</div>

					<div className="max-w-md mx-auto w-full">
						{isLogin ? <LoginForm /> : <SignUpForm />}

						<div className="mt-8 text-center">
							<p className="text-sm text-gray-500">
								{isLogin ? "New to Swipe?" : "Already have an account?"}
							</p>

							<button
								onClick={() => setIsLogin((prevIsLogin) => !prevIsLogin)}
								className="mt-2 text-purple-600 hover:text-purple-800 font-medium transition-colors duration-300"
							>
								{isLogin ? "Create a new account" : "Sign in to your account"}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AuthPage;