import { useState } from 'react';
import { json, useLoaderData } from 'react-router-dom';
import BookTable from '../components/BookTable';

export default function Books() {
    const { byTitle } = useLoaderData(); 
    const [data, setData] = useState(byTitle); 
    const [cache, setCache] = useState({});

    async function handleClick(type) {
        if (cache[type]) {
            setData(cache[type]); 
            return;
        }

        try {
            const sortedData = await fetchBooks(type); 
            setData(sortedData);
            setCache((prev) => ({ ...prev, [type]: sortedData })); 
        } catch (error) {
            console.error('Erro ao carregar os livros:', error);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-10vh)] pt-[10vh]">
            <BookTable data={data}>
                <div className="bg-[#F0F0F0] p-4 rounded">
                    <h2 className='text-center font-bold text-lg'>Ordenar Por:</h2>
                    <button
                        className="bg-[#1A1A1A] border-[#1A1A1A] border-2 hover:bg-transparent hover:text-black text-white p-3 mx-2 rounded"
                        onClick={() => handleClick('author')}
                    >
                        Autor
                    </button>
                    <button
                        className="bg-[#1A1A1A] border-[#1A1A1A] border-2 hover:bg-transparent hover:text-black text-white p-3 mx-2 rounded"
                        onClick={() => handleClick('title')}
                    >
                        Título
                    </button>
                    <button
                        className="bg-[#1A1A1A] border-[#1A1A1A] border-2 hover:bg-transparent hover:text-black text-white p-3 mx-2 rounded"
                        onClick={() => handleClick('title-desc')}
                    >
                        Título (DESC)
                    </button>
                </div>
            </BookTable>
        </div>
    );
}

async function fetchBooks(sortBy) {
    const response = await fetch(`http://localhost:8080/books/sorted?sortBy=${sortBy}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw json({ message: "Erro ao tentar obter livros" }, { status: 500 });
    }

    return response.json();
}


export async function loader() {
    const byTitle = await fetchBooks('title'); // Inicializa com ordenação padrão.
    return { byTitle };
}


// http://localhost:8080/books/sorted?sortBy=title-desc

// http://localhost:8080/books/sorted?sortBy=title

// http://localhost:8080/books/sorted?sortBy=author