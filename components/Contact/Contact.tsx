export default function Contact() {
  return (
    <div
      id="Contact"
      className="flex flex-col sm:h-screen bg-gray-500 items-center justify-start space-y-24"
    >
      <h1 className="text-6xl text-center py-6"> Entre em Contato </h1>
      <div id="content_Contact" className="flex flex-col sm:flex-row justify-center m-12 border rounded-md ">
        <div
          id="form_Contact"
          className="flex flex-col sm:w-1/2  place-items-center p-12 m-12 rounded-xl border space-y-3"
        >
          <div
            id="info_fields"
            className="flex flex-row items-start space-x-4 "
          >
            <div id="email_field">
              <label>Email:</label>
              <input placeholder="email@email.com" className="w-full p-2 text-black rounded-sm" />
            </div>
            <div id="content_field">
              <label>Assunto:</label>
              <input placeholder="Assunto" className="w-full p-2 text-black rounded-sm" />
            </div>
          </div>
          <div className="flex w-full flex-col items-start">
            <label>Assunto</label>
            <textarea placeholder="Sua Mensagem" className="h-20 w-full p-2 text-black rounded-sm" />
          </div>

          <div className="flex bg-white hover:bg-gray-100 w-24 text-center justify-center h-8 rounded-md">
            <button className="text-black">Enviar</button>
          </div>
        </div>




        <div
          id="socialMedia_Contact"
          className="flex flex-col sm:w-1/2  place-items-center p-12 m-12 space-y-4 rounded-xl border"
        >
          <div>
            <h1>Redes Sociais</h1>
          </div>
          <div className="flex flex-col">
            <a className="hover:underline" href="https://github.com/OsCrias-ltda">
              Github: https://github.com/OsCrias-ltda
            </a>
            <a className="hover:underline" href="https://www.linkedin.com/in/CriasLtda/">
              Linkedin: https://www.linkedin.com/in/CriasLtda/
            </a>
            <p>Telefone: (62) 9XXXX-XXXX</p>
            <p>Email: grupocrias.sa@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
