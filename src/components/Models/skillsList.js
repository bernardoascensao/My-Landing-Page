import { useState } from "react";
import data from "../../data.json";
import Icons from "../Models/icons";
import { motion } from "framer-motion";

const colorMap = {
  red: "text-red-500",
  orange: "text-orange-500",
  green: "text-green-500",
};

const glowMap = {
  red: "shadow-[0_0_30px_rgba(185,28,28,0.4)]",
  orange: "shadow-[0_0_30px_rgba(194,65,12,0.4)]",
  green: "shadow-[0_0_30px_rgba(21,128,61,0.4)]",
};

const SkillCard = ({ it }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="
        group
        w-full
        [perspective:1000px]
        font-lexend
        cursor-pointer
      "
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className={`
          relative w-full h-full
          [transform-style:preserve-3d]
          transition-shadow duration-500
          rounded-xl
          ${isFlipped ? "" : (glowMap[it.color] || "group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]")}
        `}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* FRONT FACE (Absolute to float over the back one) */}
        <div
          className="
            absolute inset-0 w-full h-full
            [backface-visibility:hidden]
            border border-slate-800 rounded-xl
            bg-gray-900 z-10
            flex flex-col justify-center items-center
            p-4 text-center
          "
          style={{ WebkitBackfaceVisibility: "hidden" }}
        >
          <h1 className={`font-medium ${colorMap[it.color] || "text-blue-400"} text-lg md:text-2xl mb-4`}>
            {it.tittle}
          </h1>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {it.icons.map((icon, idx) => (
              <div key={idx} className="text-white scale-90 md:scale-100">
                {Icons[icon] || <span className="text-[10px]">{icon}</span>}
              </div>
            ))}
          </div>
        </div>

        {/* BACK FACE (Relative to dictate card height) */}
        <div
          className="
            relative w-full h-full
            [backface-visibility:hidden]
            [transform:rotateY(180deg)]
            bg-slate-900
            border border-slate-700
            rounded-xl
            flex flex-col justify-center
            p-6 md:p-8
            min-h-[180px] md:min-h-[220px] 
          "
          style={{
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg) translateZ(1px)",
          }}
        >
          <ul className="list-disc list-inside text-xs md:text-sm text-slate-200 space-y-2">
            {it.points.map((parag, idx) => (
              <li key={idx} className="leading-relaxed">
                {parag}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

const SkillList = () => {
  return (
    <div className="w-full px-4 md:px-0 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {data.skills.map((it, index) => (
          <SkillCard key={index} it={it} />
        ))}
      </div>
    </div>
  );
};

export default SkillList;