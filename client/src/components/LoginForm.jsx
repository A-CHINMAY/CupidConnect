import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

const LoginForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { login, loading } = useAuthStore();

	return (
		<form
			className="space-y-6"
			onSubmit={(e) => {
				e.preventDefault();
				login({ email, password });
			}}
		>
			<div className="space-y-2">
				<label htmlFor="email" className="block text-sm font-medium text-gray-700">
					Email Address
				</label>
				<div className="relative">
					<input
						id="email"
						name="email"
						type="email"
						autoComplete="email"
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="w-full px-4 py-3 border-0 border-b-2 border-purple-200 focus:border-purple-500 bg-gray-50 rounded-lg focus:outline-none transition-all duration-300"
						placeholder="Enter your email"
					/>
				</div>
			</div>

			<div className="space-y-2">
				<label htmlFor="password" className="block text-sm font-medium text-gray-700">
					Password
				</label>
				<div className="relative">
					<input
						id="password"
						name="password"
						type="password"
						autoComplete="current-password"
						required
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="w-full px-4 py-3 border-0 border-b-2 border-purple-200 focus:border-purple-500 bg-gray-50 rounded-lg focus:outline-none transition-all duration-300"
						placeholder="Enter your password"
					/>
				</div>
			</div>

			<div className="pt-4">
				<button
					type="submit"
					className={`w-full flex justify-center items-center py-3 px-4 border border-transparent 
						rounded-lg text-base font-medium text-white transition-all duration-300 relative group ${loading
							? "bg-purple-400 cursor-not-allowed"
							: "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg"
						}`}
					disabled={loading}
				>
					{loading ? "Signing in..." : "Continue"}
					{!loading && (
						<span className="absolute right-4 transform group-hover:translate-x-1 transition-transform duration-300">
							→
						</span>
					)}
				</button>
			</div>

			<div className="pt-6 text-center">
				<p className="text-sm text-gray-400">
					Swipe right on love, one match at a time
				</p>
			</div>
		</form>
	);
};

export default LoginForm;