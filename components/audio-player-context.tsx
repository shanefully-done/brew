"use client";

import React, { createContext, useContext, useRef, useCallback } from "react";

interface AudioPlayerContextType {
	playSound: () => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(
	undefined
);

export function AudioPlayerProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const audioRef = useRef<HTMLAudioElement | null>(null);

	const playSound = useCallback(() => {
		if (audioRef.current) {
			audioRef.current.currentTime = 0; // Rewind to the start
			audioRef.current.play().catch((error) => {
				console.error("Error playing sound:", error);
			});
		}
	}, []);

	return (
		<AudioPlayerContext.Provider value={{ playSound }}>
			<audio ref={audioRef} src="/completed.mp3" preload="auto" />
			{children}
		</AudioPlayerContext.Provider>
	);
}

export function useAudioPlayer() {
	const context = useContext(AudioPlayerContext);
	if (context === undefined) {
		throw new Error("useAudioPlayer must be used within an AudioPlayerProvider");
	}
	return context;
}
