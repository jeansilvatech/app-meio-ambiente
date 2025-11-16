import React from "react";

const Header = ()=>{
    return(
        <div className="flex justify-center items-center flex-wrap w-full h-screen flex-col-reverse lg:flex-row">
            <div className="header lg:w-2/5 w-full lg:h-4/5 h-1/2 rounded-br-2xl">
            </div>
            <div className="lg:w-1/2 w-full lg:h-full h-1/2 flex justify-center items-center p-10">
                <h1 className="lg:text-4xl text-2xl uppercase">Monitoramento de Focos de Queimadas e incêndios florestais no Brasil</h1>
            </div>

        </div>
    )
}
export default Header;