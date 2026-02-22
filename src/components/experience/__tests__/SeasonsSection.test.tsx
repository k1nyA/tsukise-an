import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { SeasonsSection } from '../SeasonsSection'

describe('SeasonsSection', () => {
  it('renders within a section element', () => {
    const { container } = render(<SeasonsSection />)
    const section = container.querySelector('section')
    expect(section).toBeInTheDocument()
  })

  it('renders the section title "四季の楽しみ方"', () => {
    render(<SeasonsSection />)
    expect(screen.getByText('四季の楽しみ方')).toBeInTheDocument()
  })

  it('renders all four season labels', () => {
    render(<SeasonsSection />)
    expect(screen.getByText(/Spring\s+—\s+春/)).toBeInTheDocument()
    expect(screen.getByText(/Summer\s+—\s+夏/)).toBeInTheDocument()
    expect(screen.getByText(/Autumn\s+—\s+秋/)).toBeInTheDocument()
    expect(screen.getByText(/Winter\s+—\s+冬/)).toBeInTheDocument()
  })

  it('renders all four season titles', () => {
    render(<SeasonsSection />)
    expect(screen.getByText('湖畔の桜と山菜')).toBeInTheDocument()
    expect(screen.getByText('湖上カヌーと花火')).toBeInTheDocument()
    expect(screen.getByText('紅葉と月見の宴')).toBeInTheDocument()
    expect(screen.getByText('雪見温泉と星空')).toBeInTheDocument()
  })

  it('renders season descriptions', () => {
    render(<SeasonsSection />)
    expect(screen.getByText(/芦ノ湖畔に咲く桜を愛でながら/)).toBeInTheDocument()
    expect(screen.getByText(/早朝のカヌー体験と/)).toBeInTheDocument()
    expect(screen.getByText(/色づく山々のハイキングと/)).toBeInTheDocument()
    expect(screen.getByText(/雪に包まれた露天風呂と/)).toBeInTheDocument()
  })

  it('renders four season cards', () => {
    const { container } = render(<SeasonsSection />)
    const cards = container.querySelectorAll('[data-testid="season-card"]')
    expect(cards.length).toBe(4)
  })

  it('renders season image placeholders', () => {
    const { container } = render(<SeasonsSection />)
    const images = container.querySelectorAll('[data-testid="season-image"]')
    expect(images.length).toBe(4)
  })
})
