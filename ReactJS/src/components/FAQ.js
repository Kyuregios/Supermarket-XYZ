import React, { useState } from 'react';

const faqData = [
  {
    question: "What is XYZ Supermarket?",
    answer: "XYZ Supermarket is an online shop that offers a wide variety of products at competitive prices, with fast and reliable delivery."
  },
  {
    question: "How do I place an order?",
    answer: "To place an order, browse our product categories, add the items to your cart and follow the checkout instructions - it's quick and easy!"
  },
  {
    question: "What is the delivery time?",
    answer: "Delivery time depends on your location, but we generally deliver within 1-3 business days."
  },
  {
    question: "Can I return a product?",
    answer: "Yes, we accept returns within 30 days of purchase. Please make sure the product is in its original condition and follow our return instructions."
  },
  // Añade más preguntas y respuestas según sea necesario
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = index => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">FAQs</h1>
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full text-left flex justify-between items-center text-lg font-semibold text-gray-800"
              >
                {item.question}
                <span>{activeIndex === index ? '-' : '+'}</span>
              </button>
              {activeIndex === index && (
                <div className="mt-2 text-gray-700">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FAQ;
