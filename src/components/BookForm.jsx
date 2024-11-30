
import { Form, json, redirect, useNavigate, useNavigation } from 'react-router-dom';

import Input from './Input';
import { globalLoader } from '../util/auth';

export default function PlaceForm({title , method, book }){
    //title, author

    const navigation = useNavigation();

    const isSubmitting = navigation.state === 'submitting';

    return (
        <Form method={method} className="w-1/3 min-w-60 p-2 shadow-lg bg-white rounded-md" > 
            <h1 className="text-sm sm:text-base md:text-xl block text-center font-semibold"><i className="fa fa-book mx-2" aria-hidden="true"></i>{title}</h1>
            <hr className="mt-2"/>
            <Input 
            label="Título" 
            id="title" 
            name="title" 
            type="text" 
            defaultValue={book ? book.title : ''}
            />

            <Input 
                label="Autor" 
                id="author" 
                name="author" 
                type="text" 
                defaultValue={book ? book.author : ''}
            />
        
            <div className="mt-2">
                <button className="border-2 py-1 rounded-md w-full font-semibold bg-neutral-500 text-white hover:bg-neutral-900" disabled={isSubmitting}>
                    {
                    isSubmitting ? 'Enviando...' 
                        : book ? 'Salvar' : 'Criar'
                    }
                </button>
            </div>
        </Form>
    )
}

export async function action({request, params}){
    const { typeOfUser, token } = globalLoader();
    const method = request.method;
    const data = await request.formData();
    // const { token, typeOfUser } = globalLoader();

    if(typeOfUser !== "PROFESSOR" && typeOfUser !== "ADMINISTRADOR") {
        throw json({message: "Tipo de usuário inválido para esta operação"}, {status: 500})
    }

    const placeData = {
        title: data.get('title'),
        author: data.get('author'),
    }

    let url = 'http://localhost:8080/books';

    if(method === "PUT"){
        const bookId = params.bookId;
        if(!bookId){
            throw json({ message: "ID do livro não encontrado"}, {status: 400});
        }

        url = 'http://localhost:8080/books/' + bookId;
    }

    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`,
        },
        body: JSON.stringify(placeData)
    })

    if(response.status === 422){
        return response;
    }
    
    const responseData = await response.json();
    console.log('Response status:', response.status);
    console.log('Response body:', responseData);

    if(!response.ok) {
        throw json({message: responseData.message || "Não foi possível salvar os dados do livro"}, {status: 500})
    }

    return redirect('/books')
}