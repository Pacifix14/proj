export const parseAssistantReply = (replyText: string): Record<string, string[]> => {
	const tasksBySection: Record<string, string[]> = {}; // Initialize the record to store tasks.

	let currentSection: string | null = null; // Initially, there's no section.
	let currentMainTask: string | null = null; // Initially, there's no task.

	// Split the reply text into lines, clean up, and filter out empty lines
	const lines = replyText
		.split("\n")
		.map((line) => line?.trim())
		.filter((line): line is string => !!line && line.length > 0);

	for (const line of lines) {
		// If the line doesn't start with a bullet or sub-bullet, it's a section header
		if (!line.startsWith("- ") && !line.startsWith("→") && !line.startsWith("  -")) {
			// This is a section header, so start a new section.
			currentSection = line;
			// Initialize an empty array for the tasks under the current section.
			tasksBySection[currentSection] = [];  
			currentMainTask = null; // Reset the main task when a new section starts.
		} else if (line.startsWith("- ")) {
			// This is a main task (starts with '- ')
			const task = line.slice(2).trim();
			currentMainTask = task;
			if (currentSection) {
				// Ensure that currentSection is not null or undefined before accessing tasksBySection.
				tasksBySection[currentSection]?.push(task); // Use optional chaining to prevent undefined access.
			}
		} else if (/^ {2,}- /.test(line)) {
			// This is a subtask (indented with at least two spaces)
			const subTask = line.replace(/^ {2,}-\s*/, "").trim();
			if (currentSection && currentMainTask) {
				// Ensure the section and main task are set before pushing subtask.
				tasksBySection[currentSection]?.push(`→ ${subTask}`); // Use optional chaining here as well.
			}
		}
	}

	return tasksBySection;
};
