import { useStore } from "@nanostores/react";
import { $sessionStore, $userStore } from "@clerk/astro/client";
import { useState, useEffect } from "react";
import {
	SignedIn,
	SignedOut,
	UserButton,
	SignUpButton,
} from "@clerk/astro/react";

type Message = {
	id: number;
	note: string;
	author: string;
	user_id: string;
	pfp_url: string;
	username: string;
};

// const API_URL = "https://guestbook-db-production.up.railway.app";
const API_URL = "http://localhost:3000";

export default function GuestbookFeed() {
	const [messages, setMessages] = useState<Message[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isSending, setIsSending] = useState(false);
	const [inputText, setInputText] = useState("");
	const session = useStore($sessionStore);
	const user = useStore($userStore);

	async function fetchMessages() {
		setIsLoading(true);
		try {
			const req = await fetch(`${API_URL}/messages`);
			const res = await req.json();
			console.log(res);
			setMessages(res);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	}

	function inputHandeler(e) {
		setInputText(e.target.value);
	}

	async function sendMessage() {
		setIsSending(true);
		try {
			const req = await fetch(`${API_URL}/messages`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${await session.getToken()}`,
				},
				body: JSON.stringify({ note: inputText }),
			});
			const res = await req.json();
			console.log(res);
			setInputText("");
			setIsSending(false);
			await fetchMessages();
		} catch (error) {
			console.log(error);
			setIsSending(false);
		}
	}

	async function deleteMessage(id: number) {
		try {
			const req = await fetch(`${API_URL}/messages/${id}`, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${await session.getToken()}`,
				},
			});
			const res = await req.json();
			console.log(res);
			await fetchMessages();
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		fetchMessages();
	}, []);

	return (
		<div className="flex flex-col gap-6">
			<div className="">
				<SignedOut>
					<SignUpButton
						signInForceRedirectUrl="/guestbook"
						signInFallbackRedirectUrl="/guestbook"
						forceRedirectUrl="/guestbook"
						mode="modal"
						className="border-2 border-current rounded-md py-1 px-2 cursor-pointer"
					>
						Sign in with Github
					</SignUpButton>
				</SignedOut>
				<SignedIn>
					<div className="flex items-start gap-4 w-full">
						<UserButton afterSignOutUrl="/guestbook" />
						<input
							className="p-1 bg-bgColor border-current border-2 rounded-md w-96"
							type="text"
							onChange={inputHandeler}
							value={inputText}
						/>
						<button
							className="border-2 border-current rounded-md py-1 px-2 cursor-pointer"
							onClick={sendMessage}
							type="button"
						>
							{isSending ? "Posting..." : "Post"}
						</button>
					</div>
				</SignedIn>
			</div>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<div className="flex flex-col gap-6">
					{messages.map((note: Message) => (
						<div
							className="flex flex-row justify-between items-start"
							key={note.id}
						>
							<div className="flex flex-row gap-2 items-start">
								<a
									className="flex-shrink-0 h-7 w-7"
									href={`https://github.com/${note.username}`}
									target="_blank"
									rel="noreferrer"
								>
									<img
										className="h-full w-full rounded-full object-cover"
										src={note.pfp_url}
										alt={note.author}
									/>
								</a>
								<div className="flex flex-col justify-between">
									<a
										href={`https://github.com/${note.username}`}
										className="font-bold text-gray-400"
										target="_blank"
										rel="noreferrer"
									>
										{note.author}
									</a>
									<p className="break-words">{note.note}</p>
								</div>
							</div>
							{user && user.id === note.user_id && (
								<button
									onClick={async () => deleteMessage(note.id)}
									type="button"
								>
									x
								</button>
							)}
						</div>
					))}
				</div>
			)}
		</div>
	);
}
