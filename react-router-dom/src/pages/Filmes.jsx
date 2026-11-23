
import { useEffect, useState } from 'react'

function Filmes() {
  const [filmes, setFilmes] = useState([])
  const [pesquisa, setPesquisa] = useState('')
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    async function buscarFilmes() {
      try {
        const resposta = await fetch('https://api.tvmaze.com/shows')
        const dados = await resposta.json()
        setFilmes(dados.slice(0, 100))
      } catch (erro) {
        console.log('Erro ao buscar títulos:', erro)
      } finally {
        setCarregando(false)
      }
    }

    buscarFilmes()
  }, [])

  const filmesFiltrados = filmes.filter((filme) =>
    filme.name.toLowerCase().includes(pesquisa.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-zinc-950 px-5 py-10 text-white md:px-12">

      <section className="mb-10">
        <p className="mb-3 font-semibold uppercase tracking-widest text-red-500">
          Seu próximo favorito está aqui
        </p>

        <h1 className="mb-4 text-4xl font-black md:text-5xl">
          Explore o <span className="text-red-600">CineFlix.</span>
        </h1>

        <p className="max-w-xl text-gray-400">
          Descubra histórias incríveis, explore novos títulos
          e encontre algo perfeito para assistir.
        </p>
      </section>

      <section className="mb-10">
        <label className="mb-3 block text-lg font-bold">
          Buscar títulos
        </label>

        <div className="flex items-center gap-3 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 focus-within:border-red-600">
          <span className="text-xl">🔎</span>

          <input
            type="text"
            placeholder="Digite o nome de uma série..."
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
            className="w-full bg-transparent text-white outline-none placeholder:text-gray-500"
          />

          {pesquisa && (
            <button
              onClick={() => setPesquisa('')}
              className="text-sm text-red-500 hover:text-red-400"
            >
              Limpar
            </button>
          )}
        </div>
      </section>

      <section>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-bold">
            {pesquisa ? 'Resultados da pesquisa' : 'Todos os títulos'}
          </h2>

          <span className="text-sm text-gray-400">
            {filmesFiltrados.length} títulos encontrados
          </span>
        </div>

        {carregando ? (
          <p className="text-gray-400">Carregando catálogo...</p>
        ) : filmesFiltrados.length > 0 ? (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {filmesFiltrados.map((filme) => (
              <article
                key={filme.id}
                className="group overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 transition duration-300 hover:-translate-y-2 hover:border-red-600 hover:shadow-xl hover:shadow-red-950/30"
              >
                <div className="overflow-hidden">
                  {filme.image?.medium ? (
                    <img
                      src={filme.image.medium}
                      alt={filme.name}
                      className="h-64 w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-64 items-center justify-center bg-zinc-800 text-gray-500">
                      Sem imagem
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="truncate font-bold">
                    {filme.name}
                  </h3>

                  <p className="mt-2 text-sm text-yellow-400">
                    ⭐ {filme.rating?.average || 'Sem nota'}
                  </p>

                  <p className="mt-2 text-xs text-gray-500">
                    {filme.genres?.join(' • ') || 'Gênero não informado'}
                  </p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="rounded-xl bg-zinc-900 p-6 text-center text-gray-400">
            Nenhum título encontrado. Tente outra pesquisa.
          </p>
        )}
      </section>
    </div>
  )
}

export default Filmes
