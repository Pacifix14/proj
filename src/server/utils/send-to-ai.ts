interface BudgetItem {
  id: string;
  quantity: number;
  isFreeOfCharge: boolean;
  unitPrice: number;
  description: string;
  name: string;
  supplierId: string;
  gstInclusive: boolean;
  markup: number;
  cost: number;
}

interface BudgetData {
  id: string;
  name: string;
  venue: string;
  date: string;
  pax: number;
  budget: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  categoryId: string;
  projectId: string;
  paymentTerm: string;
  active: boolean;
  budgetItems: BudgetItem[];
}

export const sendToAI = async (budgetData: Record<string, unknown>) => {  
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`, // Ensure your API key is set in environment variables
      },
      body: JSON.stringify({
        model: "gpt-4.1",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: JSON.stringify(budgetData) },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to send data to AI");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in sendToAI:", error);
    throw new Error("AI service failed");
  }
};

