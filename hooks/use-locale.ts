"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import enDict from "@/locales/en.json";

interface Dictionary {
	common: {
		loading: string;
		error: string;
		success: string;
	};
	navigation: {
		home: string;
		about: string;
		contact: string;
	};
	header: {
		title: string;
		byline: string;
	};
	buttons: {
		submit: string;
		cancel: string;
		save: string;
		newRecipe: string;
		config: string;
		export: string;
		import: string;
		reset: string;
		dupe: string;
		remove: string;
	};
	config: {
		title: string;
		desc: string;
		sound: string;
		vibration: string;
	};
	card: {
		brewer: string;
		dose: string;
		water: string;
		totalTime: string;
	};
	reset: {
		title: string;
		desc: string;
	};
	recipe: {
		titleNew: string;
		titleEdit: string;
		name: string;
		brewer: string;
		dosage: string;
		water: string;
		ratio: string;
		temp: string;
		grind: string;
		drain: string;
		stage: {
			title: string;
			name: string;
			duration: string;
			instruction: string;
			add: string;
			remove: string;
		};
		create: string;
	};
	cardRemove: {
		title: string;
		desc: string;
	};
	detail: {
		brewer: string;
		dosage: string;
		water: string;
		ratio: string;
		temp: string;
		grind: string;
		timer: string;
		start: string;
		pause: string;
		reset: string;
		skip: string;
		currStage: string;
		name: string;
		instruction: string;
		allStage: string;
		noStage: string;
		drain: string;
		drainInstruction: string;
	};
}

export function useLocale() {
	const router = useRouter();
	const [locale, setLocale] = useState<string>("en");
	const [dict, setDict] = useState<Dictionary>(enDict);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const savedLocale = localStorage.getItem("locale");
		if (savedLocale) {
			setLocale(savedLocale);
		}
	}, []);

	useEffect(() => {
		const loadDictionary = async () => {
			setIsLoading(true);
			setError(null);

			try {
				const dictionaryModule = await import(`@/locales/${locale}.json`);
				setDict(dictionaryModule.default);
			} catch (err) {
				console.error("Failed to load locale dictionary:", err);
				if (locale !== "en") {
					setError(new Error(`Failed to load ${locale} dictionary`));
				}
				setDict(enDict);
			} finally {
				setIsLoading(false);
			}
		};

		loadDictionary();
	}, [locale]);

	const getTranslation = (path: string): string => {
		const keys = path.split(".");
		let current: unknown = dict;

		for (const key of keys) {
			if (typeof current !== "object" || current === null || !(key in current)) {
				throw new Error(`Missing translation: ${path}`);
			}
			current = (current as Record<string, unknown>)[key];
		}

		if (typeof current !== "string") {
			throw new Error(`Invalid translation path: ${path}`);
		}

		return current;
	};

	const updateLocale = (newLocale: string) => {
		setLocale(newLocale);
		localStorage.setItem("locale", newLocale);
		router.refresh();
	};

	return {
		locale,
		setLocale: updateLocale,
		dict,
		isLoading,
		error,
		getTranslation,
	};
}
