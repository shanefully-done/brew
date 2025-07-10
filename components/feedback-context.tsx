"use client";

import React, { createContext, useContext, useRef, useCallback } from "react";

interface FeedbackContextType {
	isSoundEnabled: boolean;
	isVibrationEnabled: boolean;
	playSound: () => void;
	vibrate: (pattern?: VibratePattern) => void;
	toggleSound: () => void;
	toggleVibration: () => void;
}

const FeedbackContext = createContext<FeedbackContextType | undefined>(
	undefined
);

import { useEffect, useState } from "react";

export function FeedbackProvider({ children }: { children: React.ReactNode }) {
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [isSoundEnabled, setIsSoundEnabled] = useState(true);
	const [isVibrationEnabled, setIsVibrationEnabled] = useState(true);

	useEffect(() => {
		const storedSound = localStorage.getItem("isSoundEnabled");
		const storedVibration = localStorage.getItem("isVibrationEnabled");
		if (storedSound !== null) {
			setIsSoundEnabled(JSON.parse(storedSound));
		}
		if (storedVibration !== null) {
			setIsVibrationEnabled(JSON.parse(storedVibration));
		}
	}, []);

	const playSound = useCallback(() => {
		if (isSoundEnabled && audioRef.current) {
			audioRef.current.currentTime = 0; // Rewind to the start
			audioRef.current.play().catch((error) => {
				console.error("Error playing sound:", error);
			});
		}
	}, [isSoundEnabled]);

	const vibrate = useCallback(
		(pattern: VibratePattern = 200) => {
			if (isVibrationEnabled && navigator.vibrate) {
				navigator.vibrate(pattern);
			} else if (!isVibrationEnabled) {
				console.log("Vibration is disabled by user settings.");
			} else {
				console.warn("Vibration API not supported in this browser.");
			}
		},
		[isVibrationEnabled]
	);

	const toggleSound = useCallback(() => {
		setIsSoundEnabled((prev) => {
			const newState = !prev;
			localStorage.setItem("isSoundEnabled", JSON.stringify(newState));
			return newState;
		});
	}, []);

	const toggleVibration = useCallback(() => {
		setIsVibrationEnabled((prev) => {
			const newState = !prev;
			localStorage.setItem("isVibrationEnabled", JSON.stringify(newState));
			return newState;
		});
	}, []);

	return (
		<FeedbackContext.Provider
			value={{
				isSoundEnabled,
				isVibrationEnabled,
				playSound,
				vibrate,
				toggleSound,
				toggleVibration,
			}}
		>
			<audio ref={audioRef} src="/completed.mp3" preload="auto" />
			{children}
		</FeedbackContext.Provider>
	);
}

export function useFeedback() {
	const context = useContext(FeedbackContext);
	if (context === undefined) {
		throw new Error("useFeedback must be used within a FeedbackProvider");
	}
	return context;
}
