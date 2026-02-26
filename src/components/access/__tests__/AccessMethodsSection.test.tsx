import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { AccessMethodsSection } from '../AccessMethodsSection'

describe('AccessMethodsSection', () => {
  it('renders the section as a semantic section element', () => {
    const { container } = render(<AccessMethodsSection />)
    const section = container.querySelector('section')
    expect(section).toBeInTheDocument()
  })

  it('renders the section title "アクセス方法"', () => {
    render(<AccessMethodsSection />)
    expect(screen.getByText('アクセス方法')).toBeInTheDocument()
  })

  it('renders the train access method card', () => {
    render(<AccessMethodsSection />)
    expect(screen.getByText('電車でお越しの方')).toBeInTheDocument()
    expect(screen.getByText(/小田急ロマンスカー/)).toBeInTheDocument()
  })

  it('renders the car access method card', () => {
    render(<AccessMethodsSection />)
    expect(screen.getByText('お車でお越しの方')).toBeInTheDocument()
    expect(screen.getByText(/御殿場IC/)).toBeInTheDocument()
  })

  it('renders the shuttle service card', () => {
    render(<AccessMethodsSection />)
    expect(screen.getByText('送迎サービス')).toBeInTheDocument()
    expect(screen.getByText(/無料送迎/)).toBeInTheDocument()
  })

  it('renders the bus access method card', () => {
    render(<AccessMethodsSection />)
    expect(screen.getByText('バスでお越しの方')).toBeInTheDocument()
    expect(screen.getByText(/小田原駅/)).toBeInTheDocument()
  })

  it('renders all four access method cards', () => {
    render(<AccessMethodsSection />)
    const cards = screen.getAllByTestId('access-method-card')
    expect(cards).toHaveLength(4)
  })
})
