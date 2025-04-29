// src/app/(protected)/dashboard/[budgetId]/planner/_components/dropdown.tsx

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
    onChange(task); // Pass the selected task to the parent
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="w-full p-2 border rounded bg-white"
      >
        {selectedTask ?? `Select ${label}`}
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-md">
          <ul>
            {options.map((task, index) => (
              <li
                key={index}
                className="p-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelect(task)}
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
