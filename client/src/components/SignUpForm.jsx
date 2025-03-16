import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

const SignUpForm = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [gender, setGender] = useState("");
	const [age, setAge] = useState("");
	const [genderPreference, setGenderPreference] = useState("");

	const { signup, loading } = useAuthStore();

	return (
		<form
			className="space-y-5"
			onSubmit={(e) => {
				e.preventDefault();
				signup({ name, email, password, gender, age, genderPreference });
			}}
		>
			{/* NAME */}
			<div>
				<label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
					Name
				</label>
				<input
					id="name"
					name="name"
					type="text"
					required
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="w-full px-4 py-3 border-0 border-b-2 border-purple-200 focus:border-purple-500 bg-gray-50 rounded-lg focus:outline-none transition-all duration-300"
					placeholder="Enter your name"
				/>
			</div>

			{/* EMAIL */}
			<div>
				<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
					Email address
				</label>
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

			{/* PASSWORD */}
			<div>
				<label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
					Password
				</label>
				<input
					id="password"
					name="password"
					type="password"
					autoComplete="new-password"
					required
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="w-full px-4 py-3 border-0 border-b-2 border-purple-200 focus:border-purple-500 bg-gray-50 rounded-lg focus:outline-none transition-all duration-300"
					placeholder="Create a password"
				/>
			</div>

			{/* AGE */}
			<div>
				<label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
					Age
				</label>
				<input
					id="age"
					name="age"
					type="number"
					required
					value={age}
					onChange={(e) => setAge(e.target.value)}
					min="18"
					max="120"
					className="w-full px-4 py-3 border-0 border-b-2 border-purple-200 focus:border-purple-500 bg-gray-50 rounded-lg focus:outline-none transition-all duration-300"
					placeholder="Your age"
				/>
			</div>

			{/* GENDER */}
			<div>
				<label className="block text-sm font-medium text-gray-700 mb-2">Your Gender</label>
				<div className="flex gap-4">
					<div className="flex-1">
						<input
							id="male"
							name="gender"
							type="checkbox"
							checked={gender === "male"}
							onChange={() => setGender("male")}
							className="hidden peer"
						/>
						<label
							htmlFor="male"
							className="flex items-center justify-center p-3 w-full text-gray-700 bg-gray-50 border-2 border-purple-200 rounded-lg cursor-pointer peer-checked:border-purple-500 peer-checked:bg-purple-50 peer-checked:text-purple-700 hover:bg-gray-100 transition-all duration-300"
						>
							Male
						</label>
					</div>

					<div className="flex-1">
						<input
							id="female"
							name="gender"
							type="checkbox"
							checked={gender === "female"}
							onChange={() => setGender("female")}
							className="hidden peer"
						/>
						<label
							htmlFor="female"
							className="flex items-center justify-center p-3 w-full text-gray-700 bg-gray-50 border-2 border-purple-200 rounded-lg cursor-pointer peer-checked:border-purple-500 peer-checked:bg-purple-50 peer-checked:text-purple-700 hover:bg-gray-100 transition-all duration-300"
						>
							Female
						</label>
					</div>
				</div>
			</div>

			{/* GENDER PREFERENCE */}
			<div>
				<label className="block text-sm font-medium text-gray-700 mb-2">Prefer Me</label>
				<div className="grid grid-cols-3 gap-3">
					<div>
						<input
							id="prefer-male"
							name="gender-preference"
							type="radio"
							value="male"
							checked={genderPreference === "male"}
							onChange={(e) => setGenderPreference(e.target.value)}
							className="hidden peer"
						/>
						<label
							htmlFor="prefer-male"
							className="flex items-center justify-center p-3 w-full text-gray-700 bg-gray-50 border-2 border-purple-200 rounded-lg cursor-pointer peer-checked:border-purple-500 peer-checked:bg-purple-50 peer-checked:text-purple-700 hover:bg-gray-100 transition-all duration-300"
						>
							Male
						</label>
					</div>

					<div>
						<input
							id="prefer-female"
							name="gender-preference"
							type="radio"
							value="female"
							checked={genderPreference === "female"}
							onChange={(e) => setGenderPreference(e.target.value)}
							className="hidden peer"
						/>
						<label
							htmlFor="prefer-female"
							className="flex items-center justify-center p-3 w-full text-gray-700 bg-gray-50 border-2 border-purple-200 rounded-lg cursor-pointer peer-checked:border-purple-500 peer-checked:bg-purple-50 peer-checked:text-purple-700 hover:bg-gray-100 transition-all duration-300"
						>
							Female
						</label>
					</div>

					<div>
						<input
							id="prefer-both"
							name="gender-preference"
							type="radio"
							value="both"
							checked={genderPreference === "both"}
							onChange={(e) => setGenderPreference(e.target.value)}
							className="hidden peer"
						/>
						<label
							htmlFor="prefer-both"
							className="flex items-center justify-center p-3 w-full text-gray-700 bg-gray-50 border-2 border-purple-200 rounded-lg cursor-pointer peer-checked:border-purple-500 peer-checked:bg-purple-50 peer-checked:text-purple-700 hover:bg-gray-100 transition-all duration-300"
						>
							Both
						</label>
					</div>
				</div>
			</div>

			<div className="pt-2">
				<button
					type="submit"
					className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-base font-medium text-white transform transition-all duration-300 ${loading
							? "bg-purple-400 cursor-not-allowed"
							: "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 hover:scale-105 active:scale-95"
						}`}
					disabled={loading}
				>
					{loading ? "Signing up..." : "Create Account"}
				</button>
			</div>
		</form>
	);
};

export default SignUpForm;