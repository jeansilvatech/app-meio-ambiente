import React from "react";
import Separator from "../Separator";

const Footer = ()=>{
    return(
        <footer className="flex justify-center items-center flex-col p-4 h-60 bg-[#71E4C0] text-black mt-10 shadow-2xl">
            <p className="font-bold">Monitoramento de Queimadas no Brasil</p>
            <Separator/>
            <small>Desenvolvido por Jean Silva</small>
            <small>2025</small>
            <small className="lg:w-1/3 w-1/2 text-center text-zinc-800">Este site utiliza dados fornecidos pelo BD Queimadas, a quem expressamos nossa gratidão pelo essencial apoio à transparência e informação.</small>
        </footer>
    )
}
export default Footer;