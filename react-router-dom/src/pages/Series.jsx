import { useEffect, useState } from 'react'

function Series() {
  const [series, setSeries] = useState([])
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    async function buscarSeries() {
      try {
        const resposta = await fetch(
          'https://api.tvmaze.com/shows'
        )

        const dados = await resposta.json()

        setSeries(dados.slice(12, 24))
      } catch (erro) {
        console.log('Erro ao buscar séries:', erro)
      } finally {
        setCarregando(false)
      }
    }

    buscarSeries()
  }, [])

  return (
    <div className="p-8">
      <h1 className="mb-8 text-3xl font-bold">
        Séries disponíveis 📺
      </h1>

      {carregando ? (
        <p>Carregando séries...</p>
      ) : (
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {series.map((serie) => (
            <div
              key={serie.id}
              className="overflow-hidden rounded-lg bg-zinc-800"
            >
              <img
                src={serie.image?.medium}
                alt={serie.name}
                className="h-64 w-full object-cover"
              />

              <div className="p-3">
                <h2 className="font-bold">{serie.name}</h2>

                <p className="mt-2 text-sm text-gray-400">
                  ⭐ {serie.rating?.average || 'Sem nota'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Series