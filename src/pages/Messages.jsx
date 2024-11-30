import { json, useLoaderData } from "react-router-dom";

import { globalLoader } from "../util/auth";

import Container from "../components/Container";
import Table from "../components/Table";

export default function Messages(){
    const data = useLoaderData();

    const messageColumns = [
        { label: 'Mensagens', field: 'message' },
    ];

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-10vh)] pt-[10vh]">
            <Container title="Mensagens">
                <Table columns={messageColumns} data={data.messages} />
            </Container>
        </div>
    )
}


export async function loader() {
    const { loggedUserId, token } = globalLoader();

    const response = await fetch('http://localhost:8080/users/' + loggedUserId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    });

    if(!response.ok){
        throw json({ message: "Erro ao tentar obter usuários"}, {status: 500})
    } 
    
    const data = response.json();
    return data;
}