

const SuggestedMessages = ({
  inputMessage,
  setInputMessage,
}: {
  inputMessage: string;
  setInputMessage: (msg: string) => void;
}) => {

  const suggestionCategories = {
    order: [
      "Track my order",
      "Cancel my order",
      "Order status",
      "Order history",
    ],
    delivery: [
      "Delivery status",
      "Change delivery address",
      "Delivery charges",
      "Expected delivery time",
    ],
    payment: [
      "Refund",
      "Payment methods",
      "Payment issue",
      "Apply discount code",
    ],
  };

  // Detect keyword in input
  const getCategorySuggestions = () => {
    const lower = inputMessage.toLowerCase();

    if (lower.includes("ord") || lower.includes("order")) return suggestionCategories.order;
    if (lower.includes("deli") || lower.includes("delivery")) return suggestionCategories.delivery;
    if (lower.includes("paym") || lower.includes("payment")) return suggestionCategories.payment;

    return [
      "🤔 Do you deliver tirur?",
      "💰 Stores",
      "🙋‍♂️ FAQs",
      "📞 Contact Us",
      "Show me the latest products",
      "Do you have discounts today?",
      "Where is my order?",
      "What payment methods do you accept?",
      "I need help with my order",
    ]; // no suggestions
  };

  return (
    <div className="flex w-max  gap-2">
      {getCategorySuggestions().map((suggestion, index) => {
        return (
          <div
            key={index}
            onClick={() => setInputMessage(suggestion)}
            className="bg-[#f3f5f6] px-2 font-semibold py-1 text-xs text-[#444444] shadow-xs rounded-lg"
          >
            <p>{suggestion}</p>
          </div>
        );
      })}
    </div>
  );
};

export default SuggestedMessages;
