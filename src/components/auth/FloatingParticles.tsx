import { motion } from "framer-motion";

const particles = [
  { size: 8, left: "5%", top: "10%", color: "#06B6D4", delay: 0 },
  { size: 14, left: "12%", top: "80%", color: "#3B82F6", delay: 0.5 },
  { size: 12, left: "18%", top: "25%", color: "#22D3EE", delay: 1 },
  { size: 18, left: "25%", top: "60%", color: "#38BDF8", delay: 1.5 },
  { size: 10, left: "30%", top: "15%", color: "#06B6D4", delay: 2 },
  { size: 16, left: "35%", top: "75%", color: "#0EA5E9", delay: 2.5 },
  { size: 8, left: "42%", top: "45%", color: "#67E8F9", delay: 3 },
  { size: 20, left: "48%", top: "12%", color: "#3B82F6", delay: 3.5 },
  { size: 12, left: "55%", top: "85%", color: "#22D3EE", delay: 4 },
  { size: 16, left: "60%", top: "30%", color: "#06B6D4", delay: 4.5 },
  { size: 14, left: "66%", top: "60%", color: "#38BDF8", delay: 5 },
  { size: 18, left: "72%", top: "18%", color: "#0EA5E9", delay: 5.5 },
  { size: 10, left: "78%", top: "72%", color: "#67E8F9", delay: 6 },
  { size: 14, left: "84%", top: "38%", color: "#06B6D4", delay: 6.5 },
  { size: 20, left: "92%", top: "12%", color: "#3B82F6", delay: 7 },
  { size: 16, left: "95%", top: "78%", color: "#22D3EE", delay: 7.5 },

  { size: 8, left: "8%", top: "40%", color: "#06B6D4", delay: 8 },
  { size: 12, left: "15%", top: "55%", color: "#38BDF8", delay: 8.5 },
  { size: 10, left: "22%", top: "90%", color: "#67E8F9", delay: 9 },
  { size: 18, left: "28%", top: "35%", color: "#0EA5E9", delay: 9.5 },
  { size: 12, left: "37%", top: "8%", color: "#22D3EE", delay: 10 },
  { size: 16, left: "45%", top: "68%", color: "#06B6D4", delay: 10.5 },
  { size: 20, left: "52%", top: "52%", color: "#3B82F6", delay: 11 },
  { size: 12, left: "58%", top: "6%", color: "#67E8F9", delay: 11.5 },
  { size: 16, left: "64%", top: "48%", color: "#38BDF8", delay: 12 },
  { size: 10, left: "70%", top: "88%", color: "#22D3EE", delay: 12.5 },
  { size: 18, left: "76%", top: "52%", color: "#06B6D4", delay: 13 },
  { size: 12, left: "82%", top: "10%", color: "#3B82F6", delay: 13.5 },
  { size: 16, left: "88%", top: "90%", color: "#67E8F9", delay: 14 },
  { size: 10, left: "94%", top: "48%", color: "#38BDF8", delay: 14.5 },
];

export default function FloatingParticles() {
  return (
    <>
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            left: particle.left,
            top: particle.top,
            background: particle.color,
            boxShadow: `
              0 0 10px ${particle.color},
              0 0 20px ${particle.color},
              0 0 40px ${particle.color},
              0 0 70px ${particle.color}
            `,
            filter: "blur(1px)",
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, 15, 0],
            scale: [1, 1.5, 1],
            opacity: [0.25, 1, 0.25],
          }}
          transition={{
            duration: 6 + (index % 5),
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}
    </>
  );
}
