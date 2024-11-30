import { 
    useRouteLoaderData, 
    json, 
    Link, 
    redirect, 
    useSubmit
} from "react-router-dom"

import Container from "../components/Container"
import { globalLoader } from "../util/auth";

export default function BookDetail(){
    const { loggedUserId, typeOfUser } = useRouteLoaderData('root');

    const submit = useSubmit();
    const data = useRouteLoaderData('book-detail');

    function startDeleteHandler(){
        const proceed = window.confirm("Tem certeza de que deseja deletar este livro?");

        if(proceed){
            submit(null, { method: 'delete'});
        }
    }

    return (
        <div className="flex justify-center mt-2 items-center min-h-screen">
            <Container title={data.title}>
                {/* Botoes e campos */}
                <div className="flex flex-col gap-2 items-center md:justify-start">
                    {/* Campos */}
                    <div className="flex flex-col gap-2 md:flex-row">
                        <div className="bg-[#F0F0F0] px-2 rounded">
                            <h1 className="font-logo bg-[#262626] px-2 my-1 rounded text-white text-center">Título</h1>
                            <p className="text-center">{data.title}</p>
                        </div>
                        <div className="bg-[#F0F0F0] px-2 rounded">
                            <h1 className="font-logo bg-[#262626] px-2 my-1 rounded text-white text-center">Autor</h1>
                            <p className="text-center">{data.author}</p>
                        </div>
                        <div className="bg-[#F0F0F0] px-2 rounded">
                            <h1 className="font-logo bg-[#262626] px-2 my-1 rounded text-white text-center">Disponível</h1>
                            <p className="text-center">
                            {
                                data.rents && data.rents.length > 0 
                                ? (data.rents[0].isReturned === true ? 'SIM' : 'NÃO') 
                                : 'SIM'
                            }
                            </p>
                        </div>
                    </div>

                    {/* Botoes */}
                    {typeOfUser == "ADMINISTRADOR" || typeOfUser == "PROFESSOR" &&
                        <div className="flex flex-col md:flex-row gap-2 items-center">
                            <Link className="bg-yellow-500 hover:bg-yellow-700 text-white w-16 p-2 text-center text-xs sm:text-sm md:text-base font-bold  rounded" to="edit" relative="path">Editar</Link>
                            {/* Fazer */}
                            <button className="bg-red-500 hover:bg-red-700 text-white w-16 p-2 text-center text-xs sm:text-sm md:text-base font-bold  rounded" onClick={startDeleteHandler}>Excluir</button>
                        </div>
                    }
                    {typeOfUser == "USUARIO" &&
                        <div className="flex flex-col md:flex-row gap-2 items-center">
                             <Link className="bg-blue-500 hover:bg-blue-700 text-white max-w-25 min-w-20 p-2 text-center text-xs sm:text-sm md:text-base font-bold  rounded" to="newreservation">Reservar Livro</Link>
                        </div>
                    }

                    {
                        <div className="flex flex-col md:flex-row gap-2 items-center">
                            <Link className="bg-gray-500 hover:bg-gray-700 text-white max-w-25 min-w-20 p-2 text-center text-xs sm:text-sm md:text-base font-bold  rounded" to="reservations">Ver Reservas</Link>
                        </div>
                    }

                </div>

            </Container>
        </div>
    )
}

export async function loader({params}){
    const { bookId } = params;

    const response = await fetch('http://localhost:8080/books/' + bookId);

    if(!response.ok){
        throw json(
            {message: "Erro ao carregar dados do livro"}, 
            {status: 500}
        );
    }

    const data = await response.json();
    
    return data;
}

export async function action({params, request}) {
    const bookId = params.bookId;
    const { typeOfUser, token } = globalLoader();

    if(typeOfUser !== "ADMINISTRADOR" && typeOfUser !== "PROFESSOR" ){
        return redirect('/books')
    }

    const response = await fetch('http://localhost:8080/books/' + bookId, {
        method: request.method,
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    });

    if(!response.ok){
        const responseData = await response.json();
        console.log('Erro ao tentar deletar livro!', responseData);
        throw json(
            { message: responseData.message ||  'Erro ao tentar deletar livro!'}, 
            {
            status: 500
            }
        );
    }
    return redirect('/books');
}



