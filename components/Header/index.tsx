import React from "react";
import DrawerAppBar from "@/components/NavBar";

const Header = ()=>{
    return(
        <>
       
        <div className="flex justify-center items-center flex-wrap w-full h-screen flex-col-reverse lg:flex-row">
            <div className="header lg:w-2/5 w-full lg:h-4/5 h-full lg:mb-16 lg:rounded-br-2xl">
            </div>
            <div className="lg:w-1/2 w-full h-full lg:relative absolute lg:text-black text-white flex justify-center items-center p-10">
                <h1 className="lg:text-4xl text-3xl uppercase">Monitoramento de Focos de Queimadas e incêndios florestais no Brasil</h1>
            </div>

        </div>
        </>
    )
}
export default Header;