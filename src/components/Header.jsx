import { useState } from "react";
import { Link, Form, useRouteLoaderData } from "react-router-dom";
import { IoMdMenu, IoMdClose } from "react-icons/io";

export default function Header(){
    const { token, loggedUserId, typeOfUser } = useRouteLoaderData('root');

    const [iconMenu, setIconMenu] = useState(true);

    let listClass = "md:static duration-500 md:top-[100%] absolute bg-[#F0F0F0] md:min-h-fit min-h-[60vh] left-0  md:w-auto w-full flex items-center px-5"

    function onToggleMenu(){
        setIconMenu(prevIcon => !prevIcon);
    }

    if(iconMenu){
       listClass += ` top-[-100%]`;
    }
    else{
        listClass += ` top-[9%]`;
    }

    return (
        <header className="sitcky top-0  z-50 bg-[#F0F0F0] font-primary min-h-[10vh]">
            <nav className="mx-auto py-1 min-h-[10vh] flex justify-between items-center w-[92%] gap-4">
                <div className="">
                    <p className=" bg-neutral-800 px-2 rounded text-4xl text-center font-logo"><a className="text-white">Biblioteca</a></p>
                </div>
                <div className={listClass}>
                    <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
                        {!token &&
                            <li className="hover:text-gray-500 cursor-pointer" onClick={onToggleMenu}><Link to="/">Home</Link></li>
                        }

                        <li className="hover:text-gray-500 cursor-pointer" onClick={onToggleMenu} ><Link to='/books'>Livros</Link></li>

                        {token &&
                            <li className="hover:text-gray-500 cursor-pointer" onClick={onToggleMenu} ><Link to={`/users/${loggedUserId}`}>Meu Perfil</Link></li>
                        }

                    </ul>
                </div>
                <div className="flex items-center gap-4">
                    {!token && 
                        <Link className="px-5 py-2 rounded-full bg-neutral-500 text-white hover:bg-neutral-900" to="/login">
                        Entrar
                        </Link>
                    }
                    {token &&
                        <Form action="/logout" method="post">
                            <button className="px-5 py-2 rounded-full bg-neutral-500 text-white hover:bg-neutral-900">Sair</button>
                        </Form>
                    }
                    {iconMenu && <IoMdMenu onClick={onToggleMenu} className="text-3xl cursor-pointer md:hidden"/>}
                    {!iconMenu && <IoMdClose onClick={onToggleMenu} className="text-3xl cursor-pointer md:hidden"/>}
                </div>
            </nav>
        </header>
    )
}