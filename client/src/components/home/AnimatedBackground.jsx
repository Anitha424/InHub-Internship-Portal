import { motion } from "framer-motion";

function AnimatedBackground() {
  const stars = Array.from({ length: 120 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 8 + 8,
    delay: Math.random() * 5,
    driftX: Math.random() * 20 - 10,
    driftY: Math.random() * 20 - 10,
    opacity: Math.random() * 0.6 + 0.3,
  }));

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