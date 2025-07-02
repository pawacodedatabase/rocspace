import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReviewComponent from './components/review';

const faqs = [
  {
    question: "What makes Rocspace different from other clothing brands?",
    answer:
      "Rocspace is where bold design meets everyday wear. We fuse streetwear attitude with premium quality to help you stand out and feel unstoppable.",
  },
  {
    question: "Are Rocspace pieces durable?",
    answer:
      "Absolutely. Each shirt and hoodie is made with premium fabrics and reinforced stitching, ensuring long-lasting wear and top-tier comfort.",
  },
  {
    question: "Do you release limited collections?",
    answer:
      "Yes. We regularly drop exclusive collections with limited runs—once they're gone, they’re gone. Follow us on social media or subscribe to stay in the loop.",
  },
  {
    question: "What’s your return policy?",
    answer:
      "You have 30 days to return unused items in original condition and packaging. If something’s not right, we’ve got you covered.",
  },
  {
    question: "Why trust Rocspace?",
    answer:
      "Thousands of customers trust Rocspace for our focus on quality, originality, and street-level authenticity. We're not just clothing — we're culture.",
  },
  {
    question: "Can I customize my order?",
    answer:
      "We occasionally offer personalization or one-off pieces. Be on the lookout during special drops or collaborations.",
  },
  {
    question: "How do I choose the right size?",
    answer:
      "Our product pages include a detailed size chart. If you're unsure, reach out to our support — we're happy to help you get the right fit.",
  },
  {
    question: "Can I order in bulk for a team or crew?",
    answer:
      "Yes. Rocspace supports bulk and group orders. Contact us directly and we’ll hook you up with tailored pricing and info.",
  },
];

const FAQAccordion: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <div className="p-8 bg-gray-100 min-h-screen">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 font-luxe">
            Why Rock With Rocspace?
          </h1>
          <p className="mt-4 text-gray-600">
            Discover how Rocspace delivers streetwear with attitude, quality, and confidence in every stitch.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-300 mb-4 bg-white rounded-lg shadow-lg"
            >
              {/* Question */}
              <div
                onClick={() => toggleAccordion(index)}
                className="flex justify-between items-center p-5 cursor-pointer transition duration-300 hover:bg-gray-50"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {faq.question}
                </h3>
                <motion.div
                  className="text-gray-500"
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                >
                  ▼
                </motion.div>
              </div>

              {/* Answer */}
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    className="px-5 pb-5 text-gray-600"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      <ReviewComponent />
    </>
  );
};

export default FAQAccordion;
