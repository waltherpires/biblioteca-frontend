import { useState } from "react" 

import { Link } from "react-router-dom";

import Table from "./Table";
import SearchBar from "./SearchBar";
import Container from './Container';
import { globalLoader } from "../util/auth";

export default function BookTable({ data, children }){
    const [filter, setFilter] = useState("");
    const { typeOfUser, token } = globalLoader();


    const userColumns = [
        { label: 'Título', field: 'title' },
        { label: 'Autor', field: 'author'},
    ];

    function handleFilter(value) {
        setFilter(value.toLowerCase());
    }

    return (
        <>
            <Container title="Livros">
                <SearchBar filterChange={handleFilter}/>
                {children}

                {token && typeOfUser !== "USUARIO" &&
                    <Link className="px-5 py-2 rounded-full my-1 bg-neutral-500 text-white hover:bg-neutral-900" to="/books/new">
                    Adicionar Livro
                    </Link>
                }


                <Table filter={filter} columns={userColumns} data={data} />
            </Container>
        </>
    )
}

