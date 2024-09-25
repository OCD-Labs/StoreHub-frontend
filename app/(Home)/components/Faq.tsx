// components/FAQ.tsx
"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "How easy is it to set up my online store with StoreHub?",
      answer:
        "Setting up your online store with StoreHub is straightforward...",
    },
    {
      question: "Can I co-own my store with partners using StoreHub?",
      answer: "Yes, StoreHub allows you to co-own your store with partners...",
    },
    {
      question: "How does StoreHub ensure the security of my store?",
      answer:
        "StoreHub uses advanced security measures to protect your store...",
    },
    {
      question: "What kind of business insights can I get from StoreHub?",
      answer:
        "You can get detailed analytics and insights into your business performance...",
    },
    {
      question: "Can I scale my store with StoreHub as my business grows?",
      answer:
        "StoreHub is designed to grow with your business, offering scalable solutions...",
    },
    {
      question: "Is StoreHub suitable for someone without technical skills?",
      answer:
        "Absolutely, StoreHub is user-friendly and doesn't require technical expertise...",
    },
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 mb-[100px]">
      <h2 className="text-[45px] font-bold text-center mb-4">
        Frequently Asked Questions
      </h2>
      <p className="text-center mb-8">
        Got Questions? Get the Answers You Need to Succeed with StoreHub
      </p>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-300">
            <button
              onClick={() => toggleFAQ(index)}
              className="flex justify-between w-full font-bold py-3 text-left text-lg"
            >
              {faq.question}
              <span className="text-xl">
                {activeIndex === index ? "-" : "+"}
              </span>
            </button>
            {activeIndex === index && (
              <div className="py-2 text-gray-600">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
