import { Button } from "@/components/ui/button";
import React, { useState } from "react";

type DropdownProps = {
	label: string;
	options: string[];
	onChange: (value: string) => void;
};

const Dropdown = ({ label, options, onChange }: DropdownProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedTask, setSelectedTask] = useState<string | null>(null);

	const toggleDropdown = () => {
		setIsOpen((prev) => !prev);
	};

	const handleSelect = (task: string) => {
		setSelectedTask(task);
		onChange(task);
		setIsOpen(false);
	};

	return (
		<div className="relative">
			<Button
				onClick={toggleDropdown}
				className="w-full rounded border bg-white p-2"
			>
				{selectedTask ?? `Select ${label}`}
			</Button>

			{isOpen && (
				<div className="absolute z-10 mt-1 w-full rounded border bg-white shadow-md">
					<ul>
						{options.map((task, index) => (
							<li
								key={task}
								className="cursor-pointer p-2 hover:bg-gray-100"
								onClick={() => handleSelect(task)}
								onKeyDown={(e) => {
									if (e.key === "Enter" || e.key === " ") {
										e.preventDefault();
										handleSelect(task);
									}
								}}
							>
								{task}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default Dropdown;
