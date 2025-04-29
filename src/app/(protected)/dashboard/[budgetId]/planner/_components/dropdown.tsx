import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { useState } from "react";

type DropdownProps = {
	label: string;
	options: string[];
	onChange: (value: string) => void;
};

const Dropdown = ({ label, options, onChange }: DropdownProps) => {
	const [selectedTask, setSelectedTask] = useState<string | null>(null);

	const handleSelect = (task: string) => {
		setSelectedTask(task);
		onChange(task);
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" className="w-full">
					{selectedTask ?? `Select ${label}`}
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent className="w-full">
				{options.map((task) => (
					<DropdownMenuItem
						key={task}
						onSelect={() => handleSelect(task)}
						className="cursor-pointer"
					>
						{task}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default Dropdown;
