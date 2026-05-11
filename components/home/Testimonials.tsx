"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "CPA Otene and Associates provided an exceptional governance review for our organisation. Their recommendations have transformed our board's effectiveness and institutional credibility.",
    author: "Chief Executive Officer",
    organisation: "Leading East African NGO",
    sector: "Non-Profit",
    rating: 5,
  },
  {
    quote:
      "Their tax advisory team saved us significant costs while ensuring full compliance. The depth of knowledge they bring to complex tax matters is remarkable — truly international standard.",
    author: "Chief Financial Officer",
    organisation: "Regional Commercial Bank",
    sector: "Banking",
    rating: 5,
  },
  {
    quote:
      "The internal audit engagement was thorough and highly professional. CPA Otene's team identified critical gaps we had missed internally. We now have a much stronger control environment.",
    author: "Audit Committee Chair",
    organisation: "Listed Kenyan Corporation",
    sector: "Corporate",
    rating: 5,
  },
  {
    quote:
      "Their IFRS advisory guided us seamlessly through a complex transition. The team's technical expertise and clear communication made a challenging process manageable and on schedule.",
    author: "Head of Finance",
    organisation: "Multinational Energy Company",
    sector: "Energy",
    rating: 5,
  },
  {
    quote:
      "We engaged CPA Otene for our ESG framework development. The outcome exceeded expectations — a robust, stakeholder-aligned sustainability strategy ready for institutional reporting.",
    author: "Sustainability Director",
    organisation: "Development Finance Institution",
    sector: "Development Finance",
    rating: 5,
  },
];

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section className="section-padding bg-gray-50" ref={ref}>
      <div className="container-enterprise">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <span className="label-enterprise mb-3 flex items-center justify-center gap-2">
            <span className="w-6 h-px bg-gold-400" />
            Client Testimonials
            <span className="w-6 h-px bg-gold-400" />
          </span>
          <h2 className="text-display-md font-bold font-heading text-navy-900">
            Trusted by leaders across East Africa
          </h2>
        </motion.div>

        {/* Testimonial Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="relative bg-white rounded-2xl shadow-enterprise-lg border border-gray-100 p-10 overflow-hidden">
            {/* Decorative quote mark */}
            <div className="absolute top-6 right-8 opacity-5">
              <Quote size={80} className="text-navy-900" />
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                <Star key={i} size={16} className="text-gold-400 fill-gold-400" />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <blockquote className="text-lg md:text-xl text-charcoal-700 leading-relaxed font-medium mb-8 italic">
                  "{testimonials[current].quote}"
                </blockquote>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-navy-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-navy-700 font-bold text-sm font-heading">
                      {testimonials[current].author[0]}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy-900">{testimonials[current].author}</p>
                    <p className="text-xs text-charcoal-500">{testimonials[current].organisation}</p>
                  </div>
                  <div className="ml-auto">
                    <span className="inline-block bg-navy-50 text-navy-700 text-xs font-medium px-3 py-1 rounded-full">
                      {testimonials[current].sector}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-navy-900 hover:border-navy-900 hover:text-white text-charcoal-600 transition-all duration-200 shadow-enterprise"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={16} />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? "w-6 bg-navy-900" : "w-2 bg-gray-300"
                  }`}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-navy-900 hover:border-navy-900 hover:text-white text-charcoal-600 transition-all duration-200 shadow-enterprise"
              aria-label="Next testimonial"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
