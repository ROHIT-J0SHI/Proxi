import React, { useState } from "react";
import { Plus, Minus } from "lucide-react"; // Icons for expand/collapse

const faqs = [
  {
    question: "How do I sign up as an expert?",
    answer:
      "You can create an account and select the 'Expert' role during registration. Once completed, you'll be able to browse and respond to client requests.",
  },
  {
    question: "Is Proxi free to use?",
    answer:
      "Yes! Clients can post service requests for free. Experts may have premium features available for enhanced visibility.",
  },
  {
    question: "How do I ensure the expert is trustworthy?",
    answer:
      "All experts have verified profiles, user ratings, and reviews to help you make an informed decision.",
  },
  {
    question: "Can I communicate with experts before hiring?",
    answer:
      "Yes, you can chat with experts through the platform to discuss your requirements before making a decision.",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 my-10 px-4 mx-auto max-w-screen-md lg:py-16 lg:px-12 min-h-[70vh]">
      {/* Heading */}
      <h2 className="font-bold text-4xl text-gray-900 text-center">Frequently Asked Questions</h2>
      <p className="text-md text-gray-600 text-center mt-2">
        Find answers to common questions about Proxi
      </p>

      {/* FAQ List */}
      <div className="mt-8">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-300">
            <button
              className="w-full flex justify-between items-center py-4 text-left text-lg font-medium text-gray-900 hover:text-main transition duration-200"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              {openIndex === index ? (
                <Minus className="w-6 h-6 text-main" />
              ) : (
                <Plus className="w-6 h-6 text-gray-600" />
              )}
            </button>

            {/* Expanding Answer */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className="pb-4 text-gray-700">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FAQ;
