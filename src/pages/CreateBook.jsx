import BookForm from "../components/BookForm";

export default function CreateBook(){

  return (
    <div className="overflow-auto flex justify-center items-center h-[100vh]"> 
      <BookForm title="Criar Livro" method="POST" />
    </div>
  )
}