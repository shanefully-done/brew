import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";

export function Header() {
	return (
		<header className="flex items-center justify-between p-4">
			<Link href="/">
				<h1 className="text-2xl font-bold">brew.</h1> by shane.
			</Link>
			<ModeToggle />
		</header>
	);
}
