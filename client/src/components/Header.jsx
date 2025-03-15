import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Flame, User, LogOut, Menu } from "lucide-react";

export const Header = () => {
	const { authUser, logout } = useAuthStore();
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const dropdownRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setDropdownOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<header className='bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-xl'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between items-center py-4'>
					{/* Logo section with fixed spacing */}
					<div className='flex-shrink-0 flex items-center pl-8 sm:pl-10 md:pl-0'>
						<Link to='/' className='flex items-center'>
							<div className="flex items-center">
								<Flame className='w-7 h-7 sm:w-8 sm:h-8 text-white transform transition-transform duration-300 hover:scale-110 hover:rotate-12' />
								<span className='text-xl sm:text-2xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-pink-200 transition-all duration-300 hover:tracking-wider'>Swipe</span>
							</div>
						</Link>
					</div>

					<div className='hidden md:flex items-center space-x-4'>
						{authUser ? (
							<div className='relative' ref={dropdownRef}>
								<button
									onClick={() => setDropdownOpen(!dropdownOpen)}
									className='flex items-center space-x-2 focus:outline-none transition-all duration-300 hover:opacity-80'
								>
									<img
										src={authUser.image || "/avatar.png"}
										className='h-10 w-10 object-cover rounded-full border-2 border-indigo-300 shadow-md transform transition-all duration-300 hover:scale-105'
										alt='User image'
									/>
									<span className='text-white font-medium'>{authUser.name}</span>
								</button>
								{dropdownOpen && (
									<div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-2xl py-1 z-10 transform transition-all duration-300 origin-top-right animate-fadeIn'>
										<Link
											to='/profile'
											className='px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 flex items-center transition-colors duration-200'
											onClick={() => setDropdownOpen(false)}
										>
											<User className='mr-2 text-indigo-500' size={16} />
											Profile
										</Link>
										<button
											onClick={logout}
											className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 flex items-center transition-colors duration-200'
										>
											<LogOut className='mr-2 text-indigo-500' size={16} />
											Logout
										</button>
									</div>
								)}
							</div>
						) : (
							<>
								<Link
									to='/auth'
									className='text-white hover:text-indigo-200 transition duration-300 ease-in-out relative after:absolute after:bottom-0 after:left-0 after:bg-white after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300'
								>
									Login
								</Link>
								<Link
									to='/auth'
									className='bg-white text-indigo-600 px-4 py-2 rounded-full font-medium
                   hover:bg-opacity-90 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg'
								>
									Sign Up
								</Link>
							</>
						)}
					</div>

					<div className='md:hidden'>
						<button
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
							className='text-white focus:outline-none transition-transform duration-300 hover:scale-110'
						>
							<Menu className='size-6' />
						</button>
					</div>
				</div>
			</div>

			{/* MOBILE MENU */}

			{mobileMenuOpen && (
				<div className='md:hidden bg-gradient-to-r from-indigo-600 to-purple-600 animate-slideDown'>
					<div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
						{authUser ? (
							<>
								<Link
									to='/profile'
									className='block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-700 transition-colors duration-200'
									onClick={() => setMobileMenuOpen(false)}
								>
									Profile
								</Link>
								<button
									onClick={() => {
										logout();
										setMobileMenuOpen(false);
									}}
									className='block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-700 transition-colors duration-200'
								>
									Logout
								</button>
							</>
						) : (
							<>
								<Link
									to='/auth'
									className='block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-700 transition-colors duration-200'
									onClick={() => setMobileMenuOpen(false)}
								>
									Login
								</Link>
								<Link
									to='/auth'
									className='block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-700 transition-colors duration-200'
									onClick={() => setMobileMenuOpen(false)}
								>
									Sign Up
								</Link>
							</>
						)}
					</div>
				</div>
			)}
		</header>
	);
};