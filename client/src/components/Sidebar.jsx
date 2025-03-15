import { useEffect, useState } from "react";
import { Heart, Loader, MessageCircle, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useMatchStore } from "../store/useMatchStore";

const Sidebar = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleSidebar = () => setIsOpen(!isOpen);

	const { getMyMatches, matches, isLoadingMyMatches } = useMatchStore();

	useEffect(() => {
		getMyMatches();
	}, [getMyMatches]);

	return (
		<>
			<div
				className={`
		fixed inset-y-0 left-0 z-10 w-72 bg-gradient-to-br from-indigo-50 to-violet-100 shadow-xl overflow-hidden transition-all duration-500 
		 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:w-1/4 border-r border-indigo-200
		`}
			>
				<div className='flex flex-col h-full'>
					{/* Header */}
					<div className='p-4 pb-[27px] border-b border-indigo-300 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 flex justify-between items-center'>
						<h2 className='text-xl font-bold text-white tracking-wide'>
							<span className="relative inline-block">
								Matches
								<span className="absolute -bottom-1 left-0 w-full h-0.5 bg-white/40 rounded-full transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
							</span>
						</h2>
						<button
							className='lg:hidden p-1 text-white hover:text-indigo-100 focus:outline-none transition-all duration-300 transform hover:rotate-90'
							onClick={toggleSidebar}
						>
							<X size={24} />
						</button>
					</div>

					<div className='flex-grow overflow-y-auto p-4 z-10 relative'>
						{isLoadingMyMatches ? (
							<LoadingState />
						) : matches.length === 0 ? (
							<NoMatchesFound />
						) : (
							matches.map((match) => (
								<Link key={match._id} to={`/chat/${match._id}`}>
									<div className='flex items-center mb-4 cursor-pointer hover:bg-white/80 hover:shadow-lg p-3 rounded-lg transition-all duration-300 transform hover:translate-x-1 group border border-transparent hover:border-indigo-100'>
										<div className="relative overflow-hidden rounded-full">
											<img
												src={match.image || "/avatar.png"}
												alt='User avatar'
												className='size-12 object-cover rounded-full mr-3 border-2 border-indigo-300 shadow-md transition-all duration-300 group-hover:border-purple-400 group-hover:scale-105'
											/>
											<div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
										</div>

										<h3 className='font-semibold text-indigo-900 transition-all duration-300 group-hover:text-purple-700 group-hover:translate-x-1'>{match.name}</h3>
									</div>
								</Link>
							))
						)}
					</div>
				</div>
			</div>

			<button
				className='lg:hidden fixed top-4 left-37 p-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md z-0 shadow-xl transform transition-all duration-300 hover:scale-110 focus:scale-95 active:scale-90 hover:shadow-indigo-500/30 hover:shadow-lg'
				onClick={toggleSidebar}
			>
				<MessageCircle size={24} className="animate-pulse" />
			</button>
		</>
	);
};
export default Sidebar;

const NoMatchesFound = () => (
	<div className='flex flex-col items-center justify-center h-full text-center'>
		<div className="p-4 rounded-full bg-pink-100/50 mb-4">
			<Heart className='text-pink-500 animate-pulse' size={48} />
		</div>
		<h3 className='text-xl font-semibold text-indigo-700 mb-2'>No Matches Yet</h3>
		<p className='text-gray-600 max-w-xs'>
			Don&apos;t worry! Your perfect match is just around the corner. Keep swiping!
		</p>
		<div className="mt-6 w-3/4 h-1 rounded-full bg-gradient-to-r from-indigo-100 via-purple-200 to-pink-100"></div>
	</div>
);

const LoadingState = () => (
	<div className='flex flex-col items-center justify-center h-full text-center'>
		<div className="p-4 rounded-full bg-indigo-100/50 mb-4">
			<Loader className='text-indigo-600 animate-spin' size={48} />
		</div>
		<h3 className='text-xl font-semibold text-indigo-700 mb-2'>Loading Matches</h3>
		<p className='text-gray-600 max-w-xs'>We&apos;re finding your perfect matches. This might take a moment...</p>
		<div className="mt-6 w-1/2 h-1 rounded-full bg-gradient-to-r from-indigo-200 to-purple-300 animate-pulse"></div>
	</div>
);