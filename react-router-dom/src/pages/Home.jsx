
import { useEffect, useState } from 'react'

function Home() {
  const [filmes, setFilmes] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    async function buscarFilmes() {
      try {
        const resposta = await fetch('/api/films')

        if (!resposta.ok) {
          throw new Error('Não foi possível carregar os filmes.')
        }

        const dados = await resposta.json()
        setFilmes(dados)
      } catch (erro) {
        setErro(erro.message)
      } finally {
        setCarregando(false)
      }
    }

    buscarFilmes()
  }, [])

  return (
    <main className="min-h-screen bg-zinc-950 px-5 py-10 text-white md:px-12">

      <section className="mb-12 rounded-2xl bg-gradient-to-r from-red-950 to-zinc-900 p-8 md:p-14">
        <p className="mb-3 font-bold uppercase tracking-widest text-red-400">
          Bem-vindo ao CineFlix
        </p>

        <h1 className="mb-4 text-4xl font-black md:text-6xl">
          Histórias que merecem ser assistidas.
        </h1>

        <p className="max-w-xl text-gray-300">
          Descubra animações incríveis e escolha seu próximo filme.
        </p>
      </section>

      <section>
        <h2 className="mb-7 text-3xl font-bold">
          Filmes em destaque ⭐
        </h2>

        {carregando && <p>Carregando filmes...</p>}

        {erro && <p className="text-red-400">{erro}</p>}

        {!carregando && !erro && (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {filmes.map((filme) => (
              <article
                key={filme.id}
                className="overflow-hidden rounded-xl bg-zinc-900 transition duration-300 hover:-translate-y-2"
              >
                <img
                  src={filme.image}
                  alt={filme.title}
                  className="h-64 w-full object-cover"
                />

                <div className="p-3">
                  <h3 className="font-bold">{filme.title}</h3>

                  <p className="mt-2 text-sm text-yellow-400">
                    ⭐ {filme.rt_score}/100
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    {filme.release_date}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default Home
