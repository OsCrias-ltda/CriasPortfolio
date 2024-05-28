import { useRef, useState } from "react";

export default function Contact() {
  // const [form, setForm] = useState({
  //   'email': '',
  //   'name': '',
  //   'mensagem': '',
  // })

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const domain = process.env.email
  const handleSubmit = async () => {
    const submitData = { email, name, message };

    try {
      const res = await fetch(`/api/contact`, {
        method: "POST",
        body: JSON.stringify(submitData),
        headers: {
          "content-type": "application/json",
        },
      });
      if (res.ok) {
      } else {
        console.log("Oops! Something is wrong.");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setEmail("");
      setMessage("");
      setName("");
    }
  };

  const ref = useRef<HTMLFormElement>(null);

  return (
    <div
      id="Contact"
      className="flex flex-col bg-gray-500 items-center place-items-center justify-start space-y-24"
    >
      <h1 className="text-6xl text-center py-6"> Entre em Contato </h1>
      <div
        id="content_Contact"
        className="flex flex-col sm:flex-row justify-center m-12 border rounded-md "
      >
        <form
          id="form_Contact"
          className="flex flex-col sm:w-1/2  place-items-center p-12 m-12 rounded-xl border space-y-3"
          ref={ref}
          action={async (formData) => {
            await handleSubmit();
            ref.current?.reset();
          }}
        >
          <div
            id="info_fields"
            className="flex flex-row items-start space-x-4 "
          >
            <div id="email_field">
              <label>Email:</label>
              <input
                placeholder="email@email.com"
                className="bg-white w-full p-2 text-black rounded-sm"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div id="content_field">
              <label>Nome Completo:</label>
              <input
                placeholder="Nome Completo"
                className="bg-white w-full p-2 text-black rounded-sm"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="flex w-full flex-col items-start">
            <label>Mensagem</label>
            <textarea
              placeholder="Sua Mensagem"
              className="bg-white h-20 w-full p-2 text-black rounded-sm"
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
          </div>

          <div className="flex bg-white hover:bg-gray-100 w-24 text-center justify-center h-8 rounded-md">
            <button type="submit" className="text-black">
              Enviar
            </button>
          </div>
        </form>

        <div
          id="socialMedia_Contact"
          className="flex flex-col sm:w-1/2  place-items-center p-12 m-12 space-y-4 rounded-xl border"
        >
          <div>
            <h1>Redes Sociais</h1>
          </div>
          <div className="flex flex-col">
            <a
              className="hover:underline"
              href="https://github.com/OsCrias-ltda"
            >
              Github: https://github.com/OsCrias-ltda
            </a>
            <a
              className="hover:underline"
              href="https://www.linkedin.com/in/CriasLtda/"
            >
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
