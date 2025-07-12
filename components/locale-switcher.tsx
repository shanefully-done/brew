"use client";

import * as React from "react";
import { Globe } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLocale } from "@/hooks/use-locale";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LocaleSwitcher() {
	const router = useRouter();
	const { setLocale } = useLocale();

	const handleLocaleChange = (newLocale: string) => {
		setLocale(newLocale);
		router.refresh();
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon">
					<Globe className="h-[1.2rem] w-[1.2rem]" />
					<span className="sr-only">Toggle language</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => handleLocaleChange("en")}>
					ENGLISH
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => handleLocaleChange("ko")}>
					한국어
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
