export default function GlowLoader() {
  return (
        <div className="relative flex items-center justify-center">
       
      {/* Glowing aura layers */}
      <div className="absolute w-28 h-28 rounded-full bg-cyan-400 opacity-30 blur-3xl duration-500 animate-pulse"></div>
      <div className="absolute w-28 h-28 rounded-full bg-purple-500 opacity-30 blur-3xl animate-[glowPulse_3s_ease-in-out_infinite] [animation-delay:1s]"></div>
      <div className="absolute w-28 h-28 rounded-full bg-pink-500 opacity-30 blur-3xl animate-[glowPulse_3s_ease-in-out_infinite] [animation-delay:2s]"></div>

      {/* Floating blurred balls merging */}
      <div className="absolute duration-500 w-16 h-16 rounded-full bg-cyan-400 opacity-50 blur-2xl animate-pulse   mix-blend-screen"></div>
      <div className="absolute w-16 h-16 rounded-full bg-purple-500 opacity-50 blur-2xl animate-[float_3s_ease-in-out_infinite] [animation-delay:1s] mix-blend-screen"></div>
      <div className="absolute w-16 h-16 rounded-full bg-pink-500 opacity-50 blur-2xl animate-[float_3s_ease-in-out_infinite] [animation-delay:2s] mix-blend-screen"></div>

      {/* Core orb */}
      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-[length:200%_200%] animate-[gradientShift_5s_linear_infinite] relative z-10 shadow-[0_0_30px_rgba(0,255,255,0.7)]"></div>
    </div>
  );
}
