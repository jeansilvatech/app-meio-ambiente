import React from "react";

interface CardProps{
    local: string;
    quantidade: number;
}
const Card = ({ local, quantidade}:CardProps)=>{
    return(
        <>
        {
        quantidade > 0 &&(
            <div key={local} data-aos="fade-right" className="lg:w-[300px] lg:h-[300px] w-[150px] h-[150px] bg-[#71E4C0] text-black flex justify-center items-center flex-col shadow-2xl m-2 rounded-2xl border border-black/30">
                    <h2 className="uppercase text-center text-wrap">{local}</h2>
                    <p className="font-bold text-3xl lg:text-6xl">{quantidade}</p>
                    <span>focos</span>      
            </div>
            )
        }
        </>
    )
}
export default Card;