import React from "react";
import Separator from "../Separator";

const Footer = ()=>{
    return(
        <footer className="flex justify-center items-center flex-col p-4 h-60 bg-[#71E4C0] text-black mt-10 shadow-2xl">
            <p className="font-bold">Monitoramento de Queimadas no Brasil</p>
            <Separator/>
            <small>Desenvolvido por Jean Silva</small>
            <small>2025</small>
        </footer>
    )
}
export default Footer;