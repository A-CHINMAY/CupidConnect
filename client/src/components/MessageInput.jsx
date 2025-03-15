import { useEffect, useRef, useState } from "react";
import { useMessageStore } from "../store/useMessageStore";
import { Send, Smile } from "lucide-react";
import EmojiPicker from "emoji-picker-react";

const MessageInput = ({ match }) => {
	const [message, setMessage] = useState("");
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	const emojiPickerRef = useRef(null);

	const { sendMessage } = useMessageStore();

	const handleSendMessage = (e) => {
		e.preventDefault();
		if (message.trim()) {
			sendMessage(match._id, message);
			setMessage("");
		}
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
				setShowEmojiPicker(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<form onSubmit={handleSendMessage} className='flex relative'>
			<button
				type='button'
				onClick={() => setShowEmojiPicker(!showEmojiPicker)}
				className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-indigo-500 transition-colors duration-300 ease-in-out focus:outline-none'
			>
				<Smile size={24} className="transform transition-transform duration-300 hover:scale-110" />
			</button>

			<input
				type='text'
				value={message}
				onChange={(e) => setMessage(e.target.value)}
				className='flex-grow p-3 pl-12 rounded-l-lg border-2 border-indigo-500 
        focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg'
				placeholder='Type a message...'
			/>

			<button
				type='submit'
				className='bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-3 rounded-r-lg 
        hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-300 shadow-md transform hover:translate-x-1'
			>
				<Send size={24} className="transform transition-transform duration-300 hover:rotate-12" />
			</button>
			{showEmojiPicker && (
				<div ref={emojiPickerRef} className='absolute bottom-20 left-4 animate-fadeIn'>
					<EmojiPicker
						onEmojiClick={(emojiObject) => {
							setMessage((prevMessage) => prevMessage + emojiObject.emoji);
						}}
					/>
				</div>
			)}
		</form>
	);
};
export default MessageInput;