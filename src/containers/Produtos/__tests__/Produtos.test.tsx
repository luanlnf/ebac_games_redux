import { rest } from 'msw'
import { setupServer } from 'msw/node'
import Produtos from '..'
import { renderizarComProvider } from '../../../utils/tests'
import { screen, waitFor } from '@testing-library/react'

const mocks = [
  {
    id: 1,
    categoria: 'Esportes',
    imagem: '',
    plataformas: ['windows'],
    preco: 150.9,
    precoAntigo: 199.9,
    titulo: 'elden ring'
  },
  {
    id: 2,
    categoria: 'RPG',
    imagem: '',
    plataformas: ['windows'],
    preco: 155.9,
    precoAntigo: 189.9,
    titulo: 'FIFA 2025'
  },
  {
    id: 3,
    categoria: 'Ação',
    imagem: '',
    plataformas: ['PS5', 'Xbox Series S/X', 'Windows'],
    preco: 153.9,
    precoAntigo: 200.8,
    titulo: 'Gotham Knights'
  },
  {
    id: 4,
    categoria: 'Aventura',
    imagem: '',
    plataformas: ['Nintendo Switch'],
    preco: 189.9,
    precoAntigo: 299.9,
    titulo: 'Donkey Kong'
  }
]

const server = setupServer(
  rest.get(
    'http://localhost:4000/produtos',
    (requisicao, resposta, contexto) => {
      return resposta(contexto.json(mocks))
    }
  )
)
describe('testes para o container produtos', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test('Deve renderizar corretamente com o texto de carregamento', () => {
    renderizarComProvider(<Produtos />)
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })
  test('Deve renderizar corretamente com a listagem de jogos', async () => {
    renderizarComProvider(<Produtos />)
    await waitFor(() => {
      expect(screen.getByText('Donkey Kong')).toBeInTheDocument()
    })
  })
})
