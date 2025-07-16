"use client";

import Link from "next/link";

export function Footer() {
	return (
		<footer className="flex flex-col sm:flex-row items-center justify-between p-4 max-w-3xl mx-auto border-t border-border mt-8">
			<div className="text-sm text-muted-foreground mb-2 sm:mb-0">
				© 2025 brew. by shane.
			</div>
			<div className="flex items-center gap-4">
				<Link
					href="https://github.com/shanefully-done/brew"
					target="_blank"
					rel="noopener noreferrer"
					className="text-sm text-muted-foreground hover:text-foreground transition-colors"
				>
					GitHub
				</Link>
				<Link
					href="https://www.ixtj.dev/"
					target="_blank"
					rel="noopener noreferrer"
					className="text-sm text-muted-foreground hover:text-foreground transition-colors"
				>
					Blog
				</Link>
			</div>
		</footer>
	);
}
