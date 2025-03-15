import TinderCard from "react-tinder-card";
import { useMatchStore } from "../store/useMatchStore";
import { motion } from "framer-motion";

const SwipeArea = () => {
	const { userProfiles, swipeRight, swipeLeft } = useMatchStore();

	const handleSwipe = (dir, user) => {
		if (dir === "right") swipeRight(user);
		else if (dir === "left") swipeLeft(user);
	};

	return (
		<div className='relative w-full max-w-sm h-[28rem]'>
			{userProfiles.map((user) => (
				<TinderCard
					className='absolute shadow-none'
					key={user._id}
					onSwipe={(dir) => handleSwipe(dir, user)}
					swipeRequirementType='position'
					swipeThreshold={100}
					preventSwipe={["up", "down"]}
				>
					<motion.div
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
						className='card bg-gradient-to-br from-indigo-50 via-violet-50 to-fuchsia-100 w-96 h-[28rem] select-none rounded-lg overflow-hidden border
						border-indigo-200 shadow-xl hover:shadow-2xl transition-shadow duration-500'
					>
						<figure className='px-4 pt-4 h-3/4 relative overflow-hidden'>
							<motion.img
								whileHover={{ scale: 1.05, rotate: 1 }}
								transition={{ duration: 0.4, ease: "easeOut" }}
								src={user.image || "/avatar.png"}
								alt={user.name}
								className='rounded-lg object-cover h-full pointer-events-none'
							/>
							<div className='absolute inset-0 bg-gradient-to-t from-indigo-900/40 to-transparent rounded-lg' />
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.2, duration: 0.5 }}
								className='absolute top-4 right-8 bg-white/30 backdrop-blur-md px-3 py-1 rounded-full shadow-lg border border-white/40'
							>
								<span className='text-indigo-900 font-semibold'>♾️ Perfect match</span>
							</motion.div>
						</figure>
						<motion.div
							initial={{ y: 20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ delay: 0.1, duration: 0.3 }}
							className='card-body bg-gradient-to-b from-white/90 to-indigo-100/90 backdrop-blur-sm'
						>
							<h2 className='card-title text-2xl text-indigo-900 font-bold'>
								{user.name}, {user.age}
							</h2>
							<p className='text-indigo-700'>{user.bio}</p>
						</motion.div>
					</motion.div>
				</TinderCard>
			))}
		</div>
	);
};
export default SwipeArea;