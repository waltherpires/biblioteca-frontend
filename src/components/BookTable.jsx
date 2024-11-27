import { useState } from "react" 

import Table from "./Table";
import SearchBar from "./SearchBar";
import Container from './Container';

export default function BookTable({ data, children }){
    const [filter, setFilter] = useState("");


    // private String title;
    // private String author;

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
                <Table filter={filter} columns={userColumns} data={data} />
            </Container>
        </>
    )
}

