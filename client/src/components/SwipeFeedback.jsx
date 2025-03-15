import { useMatchStore } from "../store/useMatchStore";
import { motion, AnimatePresence } from "framer-motion";

const getFeedbackStyle = (swipeFeedback) => {
	if (swipeFeedback === "liked") return "text-emerald-500 bg-gradient-to-r from-emerald-50 to-teal-100";
	if (swipeFeedback === "passed") return "text-rose-500 bg-gradient-to-r from-rose-50 to-pink-100";
	if (swipeFeedback === "matched") return "text-violet-600 bg-gradient-to-r from-fuchsia-50 to-violet-100";
	return "";
};

const getFeedbackEmoji = (swipeFeedback) => {
	if (swipeFeedback === "liked") return "❤️";
	if (swipeFeedback === "passed") return "✖️";
	if (swipeFeedback === "matched") return "✨";
	return "";
};

const getFeedbackText = (swipeFeedback) => {
	if (swipeFeedback === "liked") return "Liked!";
	if (swipeFeedback === "passed") return "Passed";
	if (swipeFeedback === "matched") return "It's a Match!";
	return "";
};

const SwipeFeedback = () => {
	const { swipeFeedback } = useMatchStore();

	return (
		<AnimatePresence>
			{swipeFeedback && (
				<motion.div
					key={swipeFeedback}
					initial={{ y: -50, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: -20, opacity: 0 }}
					transition={{ type: "spring", stiffness: 600, damping: 25 }}
					className={`
						absolute top-10 left-0 right-0 mx-auto max-w-xs py-2 px-4 rounded-full
						text-center text-2xl font-bold ${getFeedbackStyle(swipeFeedback)}
						shadow-xl backdrop-blur-lg border border-white/30
					`}
				>
					<motion.span
						initial={{ scale: 0.5, rotate: -10 }}
						animate={{ scale: [1, 1.3, 1], rotate: [0, 10, 0] }}
						transition={{ duration: 0.6, ease: "easeOut" }}
						className="inline-block mr-2"
					>
						{getFeedbackEmoji(swipeFeedback)}
					</motion.span>
					<motion.span
						initial={{ opacity: 0, y: 5 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1, duration: 0.3 }}
					>
						{getFeedbackText(swipeFeedback)}
					</motion.span>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
export default SwipeFeedback;