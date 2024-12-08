import React, { useState, useEffect } from "react";

interface DecryptingTextProps {
	text: string;
	className?: string;
}

const characters =
	"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

export function DecryptingText({ text, className = "" }: DecryptingTextProps) {
	const [decryptedText, setDecryptedText] = useState("");

	useEffect(() => {
		const totalDuration = 1500; // 1.5 seconds
		const intervalDuration = 30; // Update every 30ms
		const steps = totalDuration / intervalDuration;

		let step = 0;
		const intervalId = setInterval(() => {
			if (step < steps) {
				setDecryptedText(
					text
						.split("")
						.map((char, index) => {
							if (index < (step / steps) * text.length) {
								return char;
							}
							return characters[Math.floor(Math.random() * characters.length)];
						})
						.join(""),
				);
				step++;
			} else {
				clearInterval(intervalId);
				setDecryptedText(text);
			}
		}, intervalDuration);

		return () => clearInterval(intervalId);
	}, [text]);

	return <span className={`font-mono ${className}`}>{decryptedText}</span>;
}
