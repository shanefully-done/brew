"use client";

import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { useLocale } from "@/hooks/use-locale";

export function Header() {
	const { dict } = useLocale();

	return (
		<header className="flex items-center justify-between p-4 max-w-3xl mx-auto">
			<Link href="/">
				<h1 className="text-2xl font-bold">{dict?.header?.title || "brew."}</h1>{" "}
				{dict?.header?.byline || "by shane."}
			</Link>
			<div className="flex items-center gap-2">
				<LocaleSwitcher />
				<ModeToggle />
			</div>
		</header>
	);
}
