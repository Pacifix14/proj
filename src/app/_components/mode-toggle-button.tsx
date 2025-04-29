"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React, { memo, useCallback } from "react";

import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

const ModeToggle = () => {
	const { setTheme, theme } = useTheme();

	// Use useCallback to prevent function recreation on rerender
	const toggleTheme = useCallback(() => {
		setTheme(theme === "light" ? "dark" : "light");
	}, [theme, setTheme]);

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						variant="ghost"
						size="icon"
						onClick={toggleTheme}
						className="h-8 w-8"
					>
						<Sun className="dark:-rotate-90 h-4 w-4 rotate-0 scale-100 transition-all dark:scale-0" />
						<Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
						<span className="sr-only">Toggle theme</span>
					</Button>
				</TooltipTrigger>
				<TooltipContent side="right">
					<p>Toggle theme</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default memo(ModeToggle);
