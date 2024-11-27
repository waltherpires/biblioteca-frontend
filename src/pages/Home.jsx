import { Link } from "react-router-dom"

import HomeBackground from "../assets/images/backgroundbiblioteca.jpg";

export default function Home(){
    return (
        <div className="flex min-h-screen items-center justify-center bg-center bg-cover w-full sm:justify-start" style= {{backgroundImage: `url(${HomeBackground})`,}}>

            <div className='flex flex-col sm:flex-row text-white m-10 p-6 rounded bg-gradient-to-br from-black w-fit'>
                <h1 className='font-logo font-bold text-7xl lg:text-8xl leading-normal'>Minha<br/>Biblioteca<br/></h1>

                <div className="flex flex-col justify-center sm:ml-3 lg:ml-12">
                    <p className="font-base text-xl lg:text-2xl">Encontre O Livro <br/> Que Quiser!</p>
                    <div className="mt-5 flex sm:flex-col gap-4">
                        <Link className="p-2 bg-[#F0F0F0] hover:bg-transparent border-2 border-[#F0F0F0] text-black hover:text-white max-w-36 rounded" to="/users/new">Criar Conta</Link>
                        <Link className="p-2 bg-[#F0F0F0] hover:bg-transparent border-2 border-[#F0F0F0] text-black hover:text-white max-w-36 rounded" to="/login">Entrar</Link>
                    </div>
                </div>
            </div>

        </div>
    )
}
