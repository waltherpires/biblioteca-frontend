import { useRouteLoaderData } from "react-router-dom";

import BookForm from "../components/BookForm";

export default function EditBook(){
  const data = useRouteLoaderData('book-detail');

  return (
    <div className="overflow-auto flex justify-center items-center h-[100vh]"> 
      <BookForm title="Editar Livro" book={data} method="PUT" />
    </div>
  )
}