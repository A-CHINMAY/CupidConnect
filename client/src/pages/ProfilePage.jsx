import { useRef, useState } from "react";
import { Header } from "../components/Header";
import { useAuthStore } from "../store/useAuthStore";
import { useUserStore } from "../store/useUserStore";
import toast from "react-hot-toast";

const ProfilePage = () => {
	const { authUser } = useAuthStore();
	const [name, setName] = useState(authUser.name || "");
	const [bio, setBio] = useState(authUser.bio || "");
	const [age, setAge] = useState(authUser.age || "");
	const [gender, setGender] = useState(authUser.gender || "");
	const [genderPreference, setGenderPreference] = useState(authUser.genderPreference || []);
	const [image, setImage] = useState(authUser.image || null);

	const fileInputRef = useRef(null);

	const { loading, updateProfile } = useUserStore();

	const handleSubmit = (e) => {
		e.preventDefault();
		updateProfile({ name, bio, age, gender, genderPreference, image });
	};

	// Function to compress image before upload
	const compressImage = (dataUrl) => {
		return new Promise((resolve, reject) => {
			const img = new Image();
			img.onload = () => {
				try {
					const canvas = document.createElement('canvas');

					// Target dimensions (don't make it too small)
					const MAX_WIDTH = 800;
					const MAX_HEIGHT = 800;

					let width = img.width;
					let height = img.height;

					// Maintain aspect ratio
					if (width > height) {
						if (width > MAX_WIDTH) {
							height = Math.round(height * MAX_WIDTH / width);
							width = MAX_WIDTH;
						}
					} else {
						if (height > MAX_HEIGHT) {
							width = Math.round(width * MAX_HEIGHT / height);
							height = MAX_HEIGHT;
						}
					}

					canvas.width = width;
					canvas.height = height;

					const ctx = canvas.getContext('2d');
					ctx.drawImage(img, 0, 0, width, height);

					// Lower quality for JPEG format
					const compressedImage = canvas.toDataURL('image/jpeg', 0.6);

					// Ensure the compression actually made it smaller
					if (compressedImage.length < dataUrl.length) {
						resolve(compressedImage);
					} else {
						// If compression didn't help, return original
						resolve(dataUrl);
					}
				} catch (err) {
					reject(err);
				}
			};
			img.onerror = reject;
			img.src = dataUrl;
		});
	};

	// Then modify your handleImageChange function
	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			// File size validation
			if (file.size > 5 * 1024 * 1024) { // 5MB limit
				toast.error("Image is too large. Please select an image smaller than 5MB.");
				return;
			}

			// File type validation
			if (!file.type.match('image/jpeg') && !file.type.match('image/png') && !file.type.match('image/webp')) {
				toast.error("Please select a JPEG, PNG, or WebP image only.");
				return;
			}

			// Create a new FileReader
			const reader = new FileReader();
			reader.onloadend = async () => {
				// If image is large, compress it client-side
				if (file.size > 1 * 1024 * 1024) { // Over 1MB
					try {
						toast.loading("Optimizing image...");
						const optimizedImage = await compressImage(reader.result);
						setImage(optimizedImage);
						toast.dismiss();
					} catch (err) {
						toast.dismiss();
						toast.error("Failed to optimize image. Using original.");
						setImage(reader.result);
					}
				} else {
					// Small image, use as is
					setImage(reader.result);
				}
			};
			reader.readAsDataURL(file);
		}
	};


	console.log(image);

	return (
		<div className='min-h-screen bg-gradient-to-br from-violet-600 via-purple-500 to-fuchsia-400 flex flex-col animate-pulse-slow'>
			<Header />

			<div className='flex-grow flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8'>
				<div className='sm:mx-auto sm:w-full sm:max-w-md'>
					<h2 className='mt-6 text-center text-3xl font-extrabold text-white drop-shadow-lg animate-float'>Your Profile</h2>
				</div>

				<div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
					<div className='backdrop-blur-md bg-white/80 py-8 px-4 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] sm:rounded-lg sm:px-10 border border-violet-100 animate-fade-in-up hover:shadow-[0_20px_50px_rgba(124,_58,_237,_0.7)] transition-all duration-500 ease-in-out'>
						<form onSubmit={handleSubmit} className='space-y-6'>
							{/* NAME */}
							<div>
								<label htmlFor='name' className='block text-sm font-medium text-gray-700'>
									Name
								</label>
								<div className='mt-1'>
									<input
										id='name'
										name='name'
										type='text'
										required
										value={name}
										onChange={(e) => setName(e.target.value)}
										className='appearance-none block w-full px-3 py-2 border border-purple-300
										 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-violet-500 focus:border-violet-500 
										sm:text-sm transition-all duration-300 hover:border-purple-400'
									/>
								</div>
							</div>

							{/* AGE */}
							<div>
								<label htmlFor='age' className='block text-sm font-medium text-gray-700'>
									Age
								</label>
								<div className='mt-1'>
									<input
										id='age'
										name='age'
										type='number'
										required
										value={age}
										onChange={(e) => setAge(e.target.value)}
										className='appearance-none block w-full px-3 py-2 border border-purple-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm transition-all duration-300 hover:border-purple-400'
									/>
								</div>
							</div>

							{/* GENDER */}
							<div>
								<span className='block text-sm font-medium text-gray-700 mb-2'>Gender</span>
								<div className='flex space-x-4'>
									{["Male", "Female"].map((option) => (
										<label key={option} className='inline-flex items-center group'>
											<input
												type='radio'
												className='form-radio text-violet-600 transition-all duration-300 scale-100 group-hover:scale-110'
												name='gender'
												value={option.toLowerCase()}
												checked={gender === option.toLowerCase()}
												onChange={() => setGender(option.toLowerCase())}
											/>
											<span className='ml-2 transition-colors duration-300 group-hover:text-violet-700'>{option}</span>
										</label>
									))}
								</div>
							</div>

							{/* GENDER PREFERENCE */}
							<div>
								<span className='block text-sm font-medium text-gray-700 mb-2'>Gender Preference</span>
								<div className='flex space-x-4'>
									{["Male", "Female", "Both"].map((option) => (
										<label key={option} className='inline-flex items-center group'>
											<input
												type="checkbox"
												className="form-checkbox text-violet-600 transition-all duration-300 scale-100 group-hover:scale-110"
												checked={genderPreference.includes(option.toLowerCase())}
												onChange={() => {
													setGenderPreference((prev) =>
														prev.includes(option.toLowerCase())
															? prev.filter((item) => item !== option.toLowerCase())
															: [...prev, option.toLowerCase()]
													);
												}}
											/>

											<span className='ml-2 transition-colors duration-300 group-hover:text-violet-700'>{option}</span>
										</label>
									))}
								</div>
							</div>

							{/* BIO */}

							<div>
								<label htmlFor='bio' className='block text-sm font-medium text-gray-700'>
									Bio
								</label>
								<div className='mt-1'>
									<textarea
										id='bio'
										name='bio'
										rows={3}
										value={bio}
										onChange={(e) => setBio(e.target.value)}
										className='appearance-none block w-full px-3 py-2 border border-purple-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm transition-all duration-300 hover:border-purple-400'
									/>
								</div>
							</div>

							<div>
								<label className='block text-sm font-medium text-gray-700'>Cover Image</label>
								<div className='mt-1 flex items-center'>
									<button
										type='button'
										onClick={() => fileInputRef.current.click()}
										className='inline-flex items-center px-4 py-2 border border-violet-300 rounded-md shadow-sm text-sm font-medium text-violet-700 bg-white hover:bg-violet-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-all duration-300 hover:shadow-lg hover:scale-105'
									>
										Upload Image
									</button>
									<input
										ref={fileInputRef}
										type='file'
										accept='image/*'
										className='hidden'
										onChange={handleImageChange}
									/>
								</div>
							</div>

							{image && (
								<div className='mt-4'>
									<img src={image} alt='User Image' className='w-48 h-full object-cover rounded-md shadow-xl transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:rotate-1' />
								</div>
							)}

							<button
								type='submit'
								className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-md text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-purple-700 hover:from-violet-700 hover:to-purple-800 
								focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] transform'
								disabled={loading}
							>
								{loading ? "Saving..." : "Save"}
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
export default ProfilePage;