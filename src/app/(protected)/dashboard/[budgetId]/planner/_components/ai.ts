export const getAIGeneratedTasks = async (section: string): Promise<string[]> => {
    // Define the possible sections as a type
    const sections = [
      "Event Details",
      "Event Assets",
      "Event Venue",
      "Designs",
      "Event Operations",
      "Event Logistics",
      "Human Capital",
      "Payment",
      "Post-Event Deliverables",
    ] as const;
  
    // Create a type for the section names (the keys of the tasks object)
    type Section = typeof sections[number];
  
    // Define the tasks object with type safety
    const tasks: Record<Section, string[]> = {
      "Event Details": [
        "Finalize Event Budget",
        "Confirm Event Date",
        "Prepare Event Schedule",
      ],
      "Event Assets": [
        "Design Event Flyers",
        "Create Event Videos",
        "Prepare Event Banners",
      ],
      "Event Venue": [
        "Book Venue",
        "Arrange Venue Decorations",
        "Verify Venue Capacity",
      ],
      "Designs": [
        "Design Invitations",
        "Create Event Branding",
        "Prepare Visuals for Event",
      ],
      "Event Operations": [
        "Confirm Speakers",
        "Arrange Event Catering",
        "Book Security Personnel",
      ],
      "Event Logistics": [
        "Arrange Transportation",
        "Prepare Event Equipment",
        "Verify Vendor Arrangements",
      ],
      "Human Capital": [
        "Hire Event Staff",
        "Assign Roles to Volunteers",
        "Coordinate with HR",
      ],
      "Payment": [
        "Send Payment Invoices",
        "Verify Sponsorship Payments",
        "Confirm Budget Allocations",
      ],
      "Post-Event Deliverables": [
        "Send Thank You Emails",
        "Analyze Event Feedback",
        "Prepare Post-Event Report",
      ],
    };
  
    // Ensure the section is valid before trying to access tasks
    if (!sections.includes(section as Section)) {
      throw new Error("Invalid section name");
    }
  
    // Return the tasks for the valid section
    return tasks[section as Section];
  };
  