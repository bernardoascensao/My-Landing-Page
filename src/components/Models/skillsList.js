import React from 'react';
import data from "../../data.json";
import Icons from "../Models/icons"

//important to tailwind beacause tailwind only generate static classes.
//during build process, tailwind recognizes this line and create a css necessary for it.
const colorMap = {
    red: "text-red-700",
    orange: "text-orange-700",
    green: "text-green-700",
};

const SkillList = () => {
    return(
        <div className='font-lexend'>
            {data.skills.map((it, index) => {
                const isLeft = index % 2 === 0;
                return(
                    <div key={index} className='text-sm md:text-lg mb-16 lg:mb-60'>
                        {isLeft ? (
                            <div className='flex flex-col md:flex-row md:justify-around '>
                                <div>
                                    <h1 className={`font-medium text-start ${colorMap[it.color] || "text-black"} text-3xl md:text-5xl mb-4`}>{it.tittle}</h1>
                                    <div className='flex justify-around mb-4'>
                                        {it.icons.map((icon, idx) => (
                                            <span key={idx}>
                                                {Icons[icon] || <span className="text-sm">{icon}</span>}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className='flex flex-col'>
                                    <ul className='list-disc list-inside md:ml-5'>
                                        {it.points.map((parag, idx) => (
                                            <li key={idx} className='mb-2'>{parag}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            <div className='flex flex-col-reverse md:flex-row md:justify-around '>
                                <div className='flex flex-col'>
                                    <ul className='list-disc list-inside'>
                                        {it.points.map((parag, idx) => (
                                            <li key={idx} className='mb-2'>{parag}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h1 className={`font-medium text-start md:text-end ${colorMap[it.color] || "text-black"} text-3xl md:text-5xl mb-4`}>{it.tittle}</h1>
                                    <div className='flex justify-around mb-4'>
                                        {it.icons.map((icon, idx) => (
                                            <span key={idx}>
                                                {Icons[icon] || <span className="text-sm">{icon}</span>}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    );
}

export default SkillList;