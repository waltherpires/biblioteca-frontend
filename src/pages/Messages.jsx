import { json, useLoaderData } from "react-router-dom";

import { globalLoader } from "../util/auth";
import Container from "../components/Container";
import Table from "../components/Table";

export default function Messages() {
    const messages = useLoaderData();

    // Transformar as mensagens em objetos com o campo 'message'
    const transformedData = messages.map((msg, index) => ({ id: index + 1, message: msg }));

    const messageColumns = [
        { label: 'Mensagens', field: 'message' },
    ];

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-10vh)] pt-[10vh]">
            <Container title="Mensagens">
                <Table columns={messageColumns} data={transformedData} />
            </Container>
        </div>
    );
}

export async function loader() {
    const { loggedUserId, token } = globalLoader();

    const response = await fetch(`http://localhost:8080/users/${loggedUserId}/messages`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw json({ message: "Erro ao tentar obter mensagens" }, { status: response.status });
    }

    const data = await response.json();
    return data;
}
