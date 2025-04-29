"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useCallback } from "react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ModeToggle = () => {
	const { setTheme } = useTheme();

	const handleThemeChange = useCallback(
		(theme: string) => {
			setTheme(theme);
		},
		[setTheme],
	);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="w-full justify-start py-1.5 pr-2 pl-2"
				>
					<Sun className="dark:-rotate-90 h-5 w-5 rotate-0 scale-100 transition-all dark:scale-0" />
					<Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
					<span>Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => handleThemeChange("light")}>
					Light
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => handleThemeChange("dark")}>
					Dark
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => handleThemeChange("system")}>
					System
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ModeToggle;
