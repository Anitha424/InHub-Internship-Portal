import { motion } from "framer-motion";

const stars = Array.from({ length: 120 }, (_, i) => ({
  id: i,
  left: (i * 37.7) % 100,
  top: (i * 61.3) % 100,
  size: ((i * 17) % 10) / 10 + 1,
  duration: ((i * 29) % 80) / 10 + 8,
  delay: ((i * 13) % 50) / 10,
  driftX: (i % 21) - 10,
  driftY: ((i * 3) % 21) - 10,
  opacity: ((i * 7) % 6) / 10 + 0.3,
}));

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">

      {/* Background Gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at top left, rgba(59,130,246,0.18), transparent 45%), radial-gradient(circle at bottom right, rgba(168,85,247,0.18), transparent 45%)",
        }}
      />

      {/* Blue Glow */}
      <motion.div
        className="absolute w-[520px] h-[520px] rounded-full blur-[140px] bg-blue-500/20"
        style={{
          top: "-180px",
          left: "-180px",
        }}
        animate={{
          x: [0, 80, 0],
          y: [0, 60, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Purple Glow */}
      <motion.div
        className="absolute w-[520px] h-[520px] rounded-full blur-[140px] bg-purple-500/20"
        style={{
          bottom: "-180px",
          right: "-180px",
        }}
        animate={{
          x: [0, -80, 0],
          y: [0, -60, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.left}%`,
            top: `${star.top}%`,
            boxShadow: "0 0 10px rgba(255,255,255,0.8)",
          }}
          animate={{
            x: [0, star.driftX, 0],
            y: [0, star.driftY, 0],
            opacity: [star.opacity, 1, star.opacity],
            scale: [1, 1.6, 1],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}


export default AnimatedBackground;