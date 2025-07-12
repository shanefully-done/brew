"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useFeedback } from "@/components/feedback-context";
import { useLocale } from "@/hooks/use-locale";

export function ConfigButton() {
	const { dict } = useLocale();
	const [open, setOpen] = useState(false);
	const { isSoundEnabled, isVibrationEnabled, toggleSound, toggleVibration } =
		useFeedback();

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>{dict?.buttons?.config || "Config"}</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{dict?.config?.title || "Feedback Settings"}</DialogTitle>
					<DialogDescription>
						{dict?.config?.desc || "Manage sound and vibration feedback."}
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="flex items-center justify-between">
						<Label htmlFor="sound-toggle" className="text-right">
							{dict?.config?.sound || "Sound"}
						</Label>
						<Switch
							id="sound-toggle"
							checked={isSoundEnabled}
							onCheckedChange={toggleSound}
						/>
					</div>
					<div className="flex items-center justify-between">
						<Label htmlFor="vibration-toggle" className="text-right">
							{dict?.config?.vibration || "Vibration"}
						</Label>
						<Switch
							id="vibration-toggle"
							checked={isVibrationEnabled}
							onCheckedChange={toggleVibration}
						/>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
