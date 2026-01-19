import { useState } from "react";
import data from "../../data.json";
import Icons from "../Models/icons";
import { motion } from 'framer-motion';

const colorMap = {
    red: "text-red-500",
    orange: "text-orange-500",
    green: "text-green-500",
};

// Mapping for the glow effect
const glowMap = {
    red: "shadow-[0_0_30px_rgba(185,28,28,0.4)]",
    orange: "shadow-[0_0_30px_rgba(194,65,12,0.4)]",
    green: "shadow-[0_0_30px_rgba(21,128,61,0.4)]",
};

const SkillCard = ({ it }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div 
            className="group w-full h-[400px] [perspective:1000px] font-lexend cursor-pointer"
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <motion.div 
                className={`relative w-full h-full [transform-style:preserve-3d] ${glowMap[it.color] || "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]"}`}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
            >
                {/* FACE DA FRENTE */}
                <div 
                    className={`absolute inset-0 w-full h-full [backface-visibility:hidden] 
                    border border-slate-800 rounded-xl bg-gray-900 flex flex-col items-center justify-center p-6 text-center`}
                    style={{ WebkitBackfaceVisibility: 'hidden' }} // Prefix for Safari/Chrome
                >
                    <h1 className={`font-medium ${colorMap[it.color] || "text-blue-400"} text-3xl md:text-4xl mb-8`}>
                        {it.tittle}
                    </h1>
                    <div className='flex flex-wrap justify-center gap-6'>
                        {it.icons.map((icon, idx) => (
                            <div key={idx} className='text-white scale-125'>
                                {Icons[icon] || <span>{icon}</span>}
                            </div>
                        ))}
                    </div>
                    <p className="absolute bottom-6 text-slate-500 text-xs uppercase tracking-widest">
                        Hover to see details
                    </p>
                </div>

                {/* FACE DE TRÁS */}
                <div 
                    className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] 
                    bg-slate-900 border border-slate-700 rounded-xl flex items-center p-8"
                    style={{ 
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg) translateZ(1px)' // translateZ forces layer separation
                    }}
                >
                    <ul className='list-disc list-inside text-sm md:text-base text-slate-200 space-y-4'>
                        {it.points.map((parag, idx) => (
                            <li key={idx} className='leading-relaxed'>{parag}</li>
                        ))}
                    </ul>
                </div>
            </motion.div>
        </div>
    );
};

const SkillList = () => {
    return (
        <div className='px-10 py-20'>
            {/* Grid para organizar os cartões */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto'>
                {data.skills.map((it, index) => (
                    <SkillCard key={index} it={it} />
                ))}
            </div>
        </div>
    );
}

export default SkillList;