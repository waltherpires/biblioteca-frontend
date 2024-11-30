import { json, useLoaderData } from "react-router-dom";

import { globalLoader } from "../util/auth";

import Container from "../components/Container";
import Table from "../components/Table";

export default function Reservations(){
    const data = useLoaderData();
    console.log(data);

    const transformedData = data.map(rent => ({
        rentDate: rent.rentDate || "Não definida",
        dueDate: rent.dueDate || "Não definida",
        returned: rent.returned || "Não definida",
        returnDate: rent.returnDate || "Não devolvido",
        user: rent.user.name,
    }));

    const rentsColumns = [
        { label: 'Data de Início', field: 'rentDate' },
        { label: 'Data Limite', field: 'dueDate' },
        { label: "Data de Devolução", field: 'returnDate'},
        { label: 'Aluno', field: 'user' },
    ];

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
    


    const data = response.json();
    return data;
}