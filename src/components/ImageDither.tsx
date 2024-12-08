import React, { useState, useEffect, useRef } from "react";

const ImageDither = ({ imageUrl }) => {
	const [ditheredData, setDitheredData] = useState([]);
	const [animatedData, setAnimatedData] = useState([]);
	const canvasRef = useRef(null);
	const animationStartRef = useRef(null);

	// Process image and create dithered data
	useEffect(() => {
		const img = new Image();
		img.crossOrigin = "Anonymous";

		img.onload = () => {
			const canvas = canvasRef.current;
			const ctx = canvas.getContext("2d");

			// Fixed size of 100px width
			const targetWidth = 100;
			const scale = targetWidth / img.width;
			const targetHeight = Math.round(img.height * scale);

			canvas.width = targetWidth;
			canvas.height = targetHeight;

			// Draw and process image
			ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
			const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
			const dithered = createDitheredData(imageData);
			setDitheredData(dithered);

			// Initialize animated data with random characters
			const randomized = dithered.map((row) =>
				row.map((val) => ({
					final: val,
					current: getRandomChar(),
					isSettled: false,
				})),
			);
			setAnimatedData(randomized);
			animationStartRef.current = Date.now();
		};

		img.src = imageUrl;
	}, [imageUrl]);

	// Animation loop
	useEffect(() => {
		if (!animatedData.length) return;

		const animationFrame = requestAnimationFrame(function animate() {
			const elapsed = Date.now() - animationStartRef.current;
			const progress = Math.min(elapsed / 1000, 1); // 1 second duration

			setAnimatedData((prev) => {
				const newData = prev.map((row) =>
					row.map((cell) => {
						if (Math.random() < progress) {
							return {
								...cell,
								current: cell.final,
								isSettled: true,
							};
						}
						return {
							...cell,
							current: getRandomChar(),
							isSettled: false,
						};
					}),
				);

				if (progress < 1) {
					requestAnimationFrame(animate);
				}
				return newData;
			});
		});

		return () => cancelAnimationFrame(animationFrame);
	}, [animatedData.length]);

	// Helper function to create dithered data from image
	const createDitheredData = (imageData) => {
		const { width, height, data } = imageData;
		const result = [];

		for (let y = 0; y < height; y++) {
			const row = [];
			for (let x = 0; x < width; x++) {
				const i = (y * width + x) * 4;
				const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
				row.push(brightness < 128 ? "█" : " ");
			}
			result.push(row);
		}

		return result;
	};

	// Helper function to get random character
	const getRandomChar = () => {
		const chars = "█▓▒░ ";
		return chars[Math.floor(Math.random() * chars.length)];
	};

	return (
		<div className="w-full max-w-2xl mx-auto">
			<canvas ref={canvasRef} className="hidden" />
			<pre className="font-mono text-[0.5em] leading-[0.5em] select-none bg-black text-white p-4">
				{animatedData.map((row, i) => (
					<div key={i} className="whitespace-pre">
						{row.map((cell, j) => (
							<span key={j}>{cell.current}</span>
						))}
					</div>
				))}
			</pre>
		</div>
	);
};

export default ImageDither;
