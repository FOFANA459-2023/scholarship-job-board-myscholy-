import React, { useState } from "react";

const FAQ = () => {
  // Dummy FAQ data
  const faqData = [
    {
      question: "What documents are required for a scholarship application?",
      answer:
        "Typically, you will need your academic transcripts, a personal statement, letters of recommendation, and proof of identity. Some scholarships may also require a portfolio or proof of extracurricular activities.",
    },
    {
      question: "How do I find scholarships that match my profile?",
      answer:
        "You can use our scholarship matching tool to find opportunities tailored to your academic background, interests, and goals. Simply input your details, and we'll provide a list of suitable scholarships.",
    },
    {
      question: "Can I apply for multiple scholarships at once?",
      answer:
        "Yes, you can apply for multiple scholarships simultaneously. However, make sure to tailor each application to the specific requirements of the scholarship.",
    },
    {
      question: "What is the deadline for most scholarship applications?",
      answer:
        "Deadlines vary depending on the scholarship. Some have rolling deadlines, while others have fixed dates. Always check the specific deadline for each scholarship you're interested in.",
    },
    {
      question: "Do I need to pay to apply for scholarships?",
      answer:
        "No, legitimate scholarships do not require an application fee. Be cautious of any scholarship that asks for payment.",
    },
  ];

  // State to manage which FAQ is open
  const [activeIndex, setActiveIndex] = useState(null);

  // Function to toggle FAQ visibility
  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-50 py-16"> {/* Background color matching the landing page */}
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {faq.question}
                </h3>
                <span className="text-xl text-gray-600">
                  {activeIndex === index ? "-" : "+"}
                </span>
              </div>
              {activeIndex === index && (
                <p className="mt-4 text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;