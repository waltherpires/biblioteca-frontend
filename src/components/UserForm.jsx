import { 
  Form, 
  useNavigation, 
  json,
  redirect
} from "react-router-dom"

import Input from "./Input"

export default function UserForm({title , method, user }){
  const navigation = useNavigation();
  
    const isSubmitting = navigation.state === 'submitting';

    return (
        <Form method={method} className="min-w-60 md:w-96 p-2 bg-[#F0F0F0] rounded-md shadow-md"> 
        <h1 className="text-sm sm:text-base md:text-xl block text-center font-semibold"><i className="fa-solid fa-user mx-2"></i>{title}</h1>       
        <hr className="mt-2 "/>

        <Input
          required 
          label="Nome"
          name="name" 
          id="name" 
          type="text"
          placeholder="Digite seu nome..."
        />

        <Input
          label="Nova Senha" 
          name="password"
          id="password"
          type="password"
          placeholder="Digite sua senha..." 
        />

        <Input
          required
          label="E-mail" 
          name="email"
          id="email" 
          placeholder="Digite seu e-mail..."
          type="email" 
        />

        <Input
          required
          label="Telefone"
          name="phone" 
          id="telefone" 
          placeholder="Digite seu telefone..."
          type="tel"
          maxLength={11}
          minLength={9}
        />

        <div className="mt-2">
          <label htmlFor="typeOfUser" className="block text-xs sm:text-sm md:text-base mb-1 md:mb-2">Tipo de Usuário</label>
          <select 
            name="typeOfUser" 
            className="border w-full text-xs sm:text-sm px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
          > 
            <option value="PROFESSOR">Professor</option>
            <option value="USUARIO">Estudante</option>
            <option value="ADMINISTRADOR">Administrador</option>
          </select>
        </div>

        <div className="mt-2">
          <button className="border-2 py-1 rounded-md w-full font-semibold bg-neutral-500 text-white hover:bg-neutral-900" disabled={isSubmitting}>
            {
              isSubmitting ? 'Enviando...'
              : user ? 'Salvar' : 'Criar'
            }
            </button>
        </div>
      </Form>
    )
}

export async function action({request, params}){
  const method = request.method;
  const data = await request.formData();

  const userData = {
    name: data.get('name'),
    email: data.get('email'),
    password: data.get('password'),
    phone: data.get('phone'),
  }

  let url = 'http://localhost:8080/users';

  let headers = {
    'Content-Type' : 'application/json',
  }

  
  const response = await fetch(url, {
    method: method,
    headers: headers,
    body: JSON.stringify(userData)
  });


  if(response.status === 422){
    return response;
  }


  if(!response.ok) {
    throw json({message: "Não foi possível salvar o usuário"}, {status: 500})
  }

  return redirect('/')

}
