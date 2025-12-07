import React from "react";
import Separator from "../Separator";

const Footer = ()=>{
    return(
        <footer className="flex justify-center items-center flex-col pt-6 pb-6 C0] text-black mt-10 shadow-2xl">
            <p className="font-bold p-2">Monitoramento de Queimadas no Brasil</p>
            <small>Desenvolvido por Jean Silva</small>
            <small>2025</small>
            <Separator/>
            <small className="lg:w-1/3 w-1/2 text-center text-zinc-800">Este site utiliza dados fornecidos pelo BD Queimadas, a quem expressamos nossa gratidão pelo essencial apoio à transparência e informação.</small>
        </footer>
    )
}
export default Footer;