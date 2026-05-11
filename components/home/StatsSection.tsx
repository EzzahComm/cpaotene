"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 25, suffix: "+", label: "Years of Professional Excellence", description: "Decades of trusted advisory across Kenya and East Africa" },
  { value: 500, suffix: "+", label: "Enterprise Clients", description: "From corporates to NGOs, government to private equity" },
  { value: 15, suffix: "+", label: "Industries Served", description: "Deep sector expertise across East Africa's economy" },
  { value: 98, suffix: "%", label: "Client Retention Rate", description: "Long-term partnerships built on trust and results" },
];

function AnimatedCounter({ value, suffix, duration = 2000 }: { value: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 bg-white border-b border-gray-100">
      <div className="container-enterprise" ref={ref}>
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="label-enterprise mb-3 block">
            <span className="w-8 h-px bg-gold-400 inline-block mr-2 align-middle" />
            Our Impact
            <span className="w-8 h-px bg-gold-400 inline-block ml-2 align-middle" />
          </span>
          <h2 className="text-display-sm font-bold font-heading text-navy-900">
            Numbers that speak for themselves
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center group"
            >
              <div className="inline-flex flex-col items-center">
                <div className="stat-number text-navy-900 mb-3">
                  {inView ? (
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  ) : (
                    `0${stat.suffix}`
                  )}
                </div>
                <div className="accent-line mb-4" />
                <h3 className="text-base font-semibold font-heading text-navy-900 mb-2">
                  {stat.label}
                </h3>
                <p className="text-sm text-charcoal-500 leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
