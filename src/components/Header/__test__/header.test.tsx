import { screen } from '@testing-library/react'
import Header from '..'

import { renderizarComProvider } from '../../../utils/tests'
import { idText } from 'typescript'
describe('testes para o componente header', () => {
  test('deve renderizar o componente', () => {
    renderizarComProvider(<Header />)
    expect(screen.getByText('EBAC Games')).toBeInTheDocument()
  })

  test('deve renderizar com 2 itens no  carrinho', () => {
    renderizarComProvider(<Header />, {
      preloadedState: {
        carrinho: {
          itens: [
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
            }
          ]
        }
      }
    })

    expect(screen.getByTestId('qtd-carrinho').innerHTML).toContain('2 itens')
  })
})
