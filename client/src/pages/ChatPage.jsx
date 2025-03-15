import { useEffect } from "react";
import { Header } from "../components/Header";
import { useAuthStore } from "../store/useAuthStore";
import { useMatchStore } from "../store/useMatchStore";
import { useMessageStore } from "../store/useMessageStore";
import { Link, useParams } from "react-router-dom";
import { Loader, UserX } from "lucide-react";
import MessageInput from "../components/MessageInput";

const ChatPage = () => {
	const { getMyMatches, matches, isLoadingMyMatches } = useMatchStore();
	const { messages, getMessages, subscribeToMessages, unsubscribeFromMessages } = useMessageStore();
	const { authUser } = useAuthStore();

	const { id } = useParams();

	const match = matches.find((m) => m?._id === id);

	useEffect(() => {
		if (authUser && id) {
			getMyMatches();
			getMessages(id);
			subscribeToMessages();
		}

		return () => {
			unsubscribeFromMessages();
		};
	}, [getMyMatches, authUser, getMessages, subscribeToMessages, unsubscribeFromMessages, id]);

	if (isLoadingMyMatches) return <LoadingMessagesUI />;
	if (!match) return <MatchNotFound />;

	return (
		<div className='flex flex-col h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50'>
			<Header />

			<div className='flex-grow flex flex-col p-4 md:p-6 lg:p-8 overflow-hidden max-w-4xl mx-auto w-full'>
				<div className='flex items-center mb-4 bg-white rounded-lg shadow-md p-3 hover:shadow-xl transition-shadow duration-500 animate-fade-in backdrop-blur-sm bg-opacity-90 border border-teal-100'>
					<img
						src={match.image || "/avatar.png"}
						className='w-12 h-12 object-cover rounded-full mr-3 border-2 border-emerald-400 transition-all duration-500 hover:scale-110 hover:rotate-3 shadow-lg'
					/>
					<h2 className='text-xl font-semibold text-emerald-800 transition-all duration-300 hover:text-teal-600'>{match.name}</h2>
				</div>

				<div className='flex-grow overflow-y-auto mb-4 bg-white rounded-lg shadow-lg p-4 animate-slide-up backdrop-filter backdrop-blur-sm bg-opacity-80 border border-teal-100'>
					{messages.length === 0 ? (
						<p className='text-center text-teal-500 py-8 font-medium italic'>Start your conversation with {match.name}</p>
					) : (
						messages.map((msg) => (
							<div
								key={msg._id}
								className={`mb-3 ${msg.sender === authUser._id ? "text-right" : "text-left"}`}
							>
								<span
									className={`inline-block p-3 rounded-lg max-w-xs lg:max-w-md transition-all duration-500 animate-fade-in shadow-md ${msg.sender === authUser._id
										? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:shadow-lg hover:-translate-y-1"
										: "bg-gradient-to-r from-gray-100 to-slate-200 text-gray-800 hover:shadow-lg hover:-translate-y-1"
										}`}
								>
									{msg.content}
								</span>
							</div>
						))
					)}
				</div>
				<MessageInput match={match} />
			</div>
		</div>
	);
};
export default ChatPage;

const MatchNotFound = () => (
	<div className='h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-50 to-emerald-100'>
		<div className='bg-white p-8 rounded-lg shadow-2xl text-center transform hover:scale-105 transition-transform duration-500 animate-fade-in backdrop-filter backdrop-blur-sm bg-opacity-90 border border-emerald-100'>
			<UserX size={64} className='mx-auto text-emerald-500 mb-4 animate-pulse' />
			<h2 className='text-2xl font-semibold text-emerald-800 mb-2'>Match Not Found</h2>
			<p className='text-teal-600'>Oops! It seems this match doesn&apos;t exist or has been removed.</p>
			<Link
				to='/'
				className='mt-6 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 
				focus:outline-none focus:ring-2 focus:ring-emerald-300 inline-block hover:shadow-lg transform hover:-translate-y-1'
			>
				Go Back To Home
			</Link>
		</div>
	</div>
);

const LoadingMessagesUI = () => (
	<div className='h-screen flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100'>
		<div className='bg-white p-8 rounded-lg shadow-2xl text-center animate-fade-in backdrop-filter backdrop-blur-sm bg-opacity-90 border border-emerald-100'>
			<Loader size={48} className='mx-auto text-emerald-500 animate-spin mb-4' />
			<h2 className='text-2xl font-semibold text-emerald-800 mb-2'>Loading Chat</h2>
			<p className='text-teal-600'>Please wait while we fetch your conversation...</p>
			<div className='mt-6 flex justify-center space-x-2'>
				<div className='w-3 h-3 bg-emerald-500 rounded-full animate-bounce' style={{ animationDelay: "0s" }}></div>
				<div
					className='w-3 h-3 bg-teal-500 rounded-full animate-bounce'
					style={{ animationDelay: "0.2s" }}
				></div>
				<div
					className='w-3 h-3 bg-cyan-500 rounded-full animate-bounce'
					style={{ animationDelay: "0.4s" }}
				></div>
			</div>
		</div>
	</div>
);