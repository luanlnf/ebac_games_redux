import { fireEvent, screen } from '@testing-library/react'
import Produto from '..'
import { renderizarComProvider } from '../../../utils/tests'

const jogo = {
  id: 2,
  categoria: 'RPG',
  imagem: '',
  plataformas: ['windows'],
  preco: 155.9,
  precoAntigo: 189.9,
  titulo: 'FIFA 2025'
}

describe('Teste para o componente produto', () => {
  test('deve renderizar corretamente', () => {
    renderizarComProvider(<Produto game={jogo} />)
    expect(screen.getByText('FIFA 2025')).toBeInTheDocument()
  })

  test('deve adicionar um item ao carrinho', () => {
    const { store } = renderizarComProvider(<Produto game={jogo} />)
    const botao = screen.getByTestId('btn-adicionar-produto')
    fireEvent.click(botao)
    expect(store.getState().carrinho.itens).toHaveLength(1)
  })
})
