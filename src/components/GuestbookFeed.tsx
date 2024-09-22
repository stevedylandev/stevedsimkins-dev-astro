import { useStore } from "@nanostores/react";
import { $sessionStore, $userStore } from "@clerk/astro/client";
import { useState, useEffect } from "react";
import {
	SignedIn,
	SignedOut,
	UserButton,
	SignInButton,
} from "@clerk/astro/react";

type Message = {
	id: number;
	note: string;
	author: string;
	user_id: string;
	pfp_url: string;
};

export function GuestbookFeed() {
	const [messages, setMessages] = useState<Message[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [inputText, setInputText] = useState("");
	const session = useStore($sessionStore);
	const user = useStore($userStore);

	async function fetchMessages() {
		setIsLoading(true);
		try {
			const req = await fetch(`${process.env.PUBLIC_API_URL}/messages`);
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
		try {
			const req = await fetch(`${process.env.PUBLIC_API_URL}/messages`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${await session.getToken()}`,
				},
				body: JSON.stringify({ note: inputText }),
			});
			const res = await req.json();
			console.log(res);
			setInputText("");
			await fetchMessages();
		} catch (error) {
			console.log(error);
		}
	}

	async function deleteMessage(id: number) {
		try {
			const req = await fetch(
				`${import.meta.env.PUBLIC_API_URL}/messages/${id}`,
				{
					method: "DELETE",
					headers: {
						Authorization: `Bearer ${await session.getToken()}`,
					},
				},
			);
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
					<SignInButton
						as="button"
						mode="modal"
						className="border-2 border-current rounded-md p-1 cursor-pointer"
					>
						Sign in with Github
					</SignInButton>
				</SignedOut>
				<SignedIn>
					<div className="flex items-center gap-4 w-full">
						<UserButton />
						<input
							className="p-1 border-current border-2 rounded-md w-96"
							type="text"
							onChange={inputHandeler}
							value={inputText}
						/>
						<button
							className="border-2 border-current rounded-md py-1 px-2 cursor-pointer"
							onClick={sendMessage}
							type="button"
						>
							Send
						</button>
					</div>
				</SignedIn>
			</div>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<div className="flex flex-col gap-6">
					{messages.map((note: Message) => (
						<div className="flex flex-row justify-between" key={note.id}>
							<div className="flex flex-row gap-2 items-center">
								<img
									className="h-7 w-7 rounded-full"
									src={note.pfp_url}
									alt={note.author}
								/>
								<div className="flex flex-col justify-between">
									<p className="font-bold text-gray-400">{note.author}</p>
									<p>{note.note}</p>
								</div>
							</div>
							{user.id === note.user_id && (
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
