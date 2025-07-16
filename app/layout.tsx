import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
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
	description: "A simple coffee recipe & timer app for home brewers.",
	openGraph: {
		title: "brew.",
		description: "A simple coffee recipe & timer app for home brewers.",
		url: "https://brew.ixtj.dev",
		siteName: "brew.",
		images: [
			{
				url: "/og.png",
				width: 1200,
				height: 630,
				alt: "brew. – coffee timer app",
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "brew.",
		description: "A simple coffee recipe & timer app for home brewers.",
		images: ["/og.png"],
	},
	icons: {
		icon: "/favicon.svg",
	},
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
				<link rel="shortcut icon" href="/favicon.svg" />
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
							<Footer />
						</div>
					</ThemeProvider>
				</FeedbackProvider>
			</body>
		</html>
	);
}
