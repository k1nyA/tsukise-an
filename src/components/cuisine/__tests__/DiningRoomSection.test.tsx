import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { DiningRoomSection } from '../DiningRoomSection'

describe('DiningRoomSection', () => {
  it('renders the DINING English label', () => {
    render(<DiningRoomSection />)
    expect(screen.getByText('DINING')).toBeInTheDocument()
  })

  it('renders the section title about the dining room', () => {
    render(<DiningRoomSection />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('食事処「月影」')
  })

  it('renders the description text about private dining', () => {
    render(<DiningRoomSection />)
    expect(
      screen.getByText(/離れの食事処「月影」にてご用意いたします/)
    ).toBeInTheDocument()
  })

  it('renders an image placeholder with aria-label', () => {
    render(<DiningRoomSection />)
    expect(screen.getByLabelText('食事処のイメージ')).toBeInTheDocument()
  })

  it('renders the section as a semantic section element', () => {
    const { container } = render(<DiningRoomSection />)
    const section = container.querySelector('section')
    expect(section).toBeInTheDocument()
  })
})
