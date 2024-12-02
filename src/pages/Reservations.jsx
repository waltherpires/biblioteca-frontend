
import { useState } from "react";
import { json, useLoaderData } from "react-router-dom";

import { globalLoader } from "../util/auth";

import Container from "../components/Container";
import Table from "../components/Table";

export default function Reservations(){
    const { token, loggedUserId } = globalLoader();
    const initialData = useLoaderData();
    const [data, setData] = useState(initialData);

    console.log(data);

    const hasActions = data.some(rent => rent.returnDate === null && rent.user.id == loggedUserId);

    const transformedData = data.map(rent => ({
        rentDate: rent.rentDate || "Não definida",
        dueDate: rent.dueDate || "Não definida",
        returned: rent.returned || "Não definida",
        returnDate: rent.returnDate || "Não devolvido",
        user: rent.user.name,
        bookId: rent.book.id,
        actions: rent.returned === false && rent.user.id == loggedUserId ? (
            (
                rent.rentDate === null ? (
                    <button
                        onClick={() => handleButtonClick('POST', rent.id, rent.book.id)}
                        className="bg-blue-500 text-white text-center text-sm md:text-base font-bold py-2 px-3 rounded hover:bg-blue-600"
                    >
                        Confirmar
                    </button>
                ) 
                :
                (
                    <button
                    onClick={() => handleButtonClick('PATCH', rent.id, rent.book.id)}
                    className="bg-blue-500 text-white text-center text-sm md:text-base font-bold py-2 px-3 rounded hover:bg-blue-600"
                    >
                        Devolver
                    </button>
                )
            ) 
        ) : null

    }));

    const rentsColumns = [
        { label: 'Data de Início', field: 'rentDate' },
        { label: 'Data Limite', field: 'dueDate' },
        { label: "Data de Devolução", field: 'returnDate'},
        { label: 'Aluno', field: 'user' },
        ...(hasActions ? [{ label: 'Ações', field: 'actions' }] : []),
    ];

    
    async function handleButtonClick(method, rentId, bookId){
        let url = `http://localhost:8080/books/${bookId}/rents/${rentId}/confirm`;

        if(method === 'PATCH'){
            url = `http://localhost:8080/books/${bookId}/rents/${rentId}`;
        }

        try{
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            if(method === "POST"){
                if (!response.ok){
                    throw new Error("Erro ao confirmar reserva!");
                }
            } 
            else if(method === "PATCH"){
                if (!response.ok){
                    throw new Error("Erro ao devolver livro!");
                }
            }

            const updatedData = data.map(rent => {
                if (rent.id === rentId) {
                    // Atualize o objeto da reserva conforme necessário, por exemplo:
                    return {
                        ...rent,
                        rentDate: method === "POST" ? new Date().toISOString().substring(0, 10) : rent.rentDate,
                        dueDate: method === "POST" ? new Date(new Date().setDate(new Date().getDate() + 14)).toISOString().substring(0, 10) : rent.dueDate,
                        returnDate: method === "PATCH" ? new Date().toISOString().substring(0, 10) : rent.returnDate,
                        returned: method === "PATCH" ? true : rent.returned
                    };
                }
                return rent;
            });

            setData(updatedData); 
            
            alert("Ação realizada com sucesso!");
        } catch (error) {
            console.error("Erro na requisição", error);
            alert("Falha ao realizar a ação");
        }
    }

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-10vh)] pt-[10vh]">
            <Container title="Fila de Reservas">
                <Table columns={rentsColumns} data={transformedData} />
            </Container>
        </div>
    )
}


export async function loader({params}) {
    const { bookId } = params;

    const { loggedUserId, token } = globalLoader();

    const response = await fetch('http://localhost:8080/books/' + bookId + '/rents', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if(!response.ok){
        throw json({ message: "Erro ao tentar obter livro"}, {status: 500})
    } 
    


    const data = await response.json();
    return data;
}

