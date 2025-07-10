import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { FeedbackProvider } from "@/components/feedback-context";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "brew.",
	description: "a simple coffee timer.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
				<link
					rel="icon"
					type="image/png"
					sizes="192x192"
					href="/web-app-manifest-192x192.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="512x512"
					href="/web-app-manifest-512x512.png"
				/>
				<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
				<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
				<link rel="shortcut icon" href="/favicon/favicon.ico" />
				<link rel="manifest" href="/site.webmanifest" />
			</head>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<FeedbackProvider>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<div className="mx-auto p-4">
							<Header />
							{children}
						</div>
					</ThemeProvider>
				</FeedbackProvider>
			</body>
		</html>
	);
}
