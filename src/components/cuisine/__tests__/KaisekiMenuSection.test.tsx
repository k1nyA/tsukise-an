import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { KaisekiMenuSection } from '../KaisekiMenuSection'

describe('KaisekiMenuSection', () => {
  it('renders the menu section title', () => {
    render(<KaisekiMenuSection />)
    expect(screen.getByText(/月替わり懐石/)).toBeInTheDocument()
    expect(screen.getByText(/如月の膳/)).toBeInTheDocument()
  })

  it('renders all nine menu course names', () => {
    render(<KaisekiMenuSection />)
    expect(screen.getByText('先附')).toBeInTheDocument()
    expect(screen.getByText('椀物')).toBeInTheDocument()
    expect(screen.getByText('造り')).toBeInTheDocument()
    expect(screen.getByText('焼物')).toBeInTheDocument()
    expect(screen.getByText('煮物')).toBeInTheDocument()
    expect(screen.getByText('水菓子')).toBeInTheDocument()
    expect(screen.getByText('八寸')).toBeInTheDocument()
    expect(screen.getByText('揚物')).toBeInTheDocument()
    expect(screen.getByText('食事')).toBeInTheDocument()
  })

  it('renders descriptions for each course', () => {
    render(<KaisekiMenuSection />)
    expect(screen.getByText(/季節の先付け三種盛り/)).toBeInTheDocument()
    expect(screen.getByText(/蛤の真薯仕立て/)).toBeInTheDocument()
    expect(screen.getByText(/小田原の地魚三種盛り/)).toBeInTheDocument()
    expect(screen.getByText(/駿河湾産金目鯛の西京焼き/)).toBeInTheDocument()
    expect(screen.getByText(/飛龍頭と聖護院大根/)).toBeInTheDocument()
    expect(screen.getByText(/季節の果実と自家製甘味/)).toBeInTheDocument()
    expect(screen.getByText(/季節の前菜を少しずつ/)).toBeInTheDocument()
    expect(screen.getByText(/旬の素材を軽やかに揚げた/)).toBeInTheDocument()
    expect(screen.getByText(/土鍋で炊き上げる/)).toBeInTheDocument()
  })

  it('renders the section as a semantic section element', () => {
    const { container } = render(<KaisekiMenuSection />)
    const section = container.querySelector('section')
    expect(section).toBeInTheDocument()
  })

  it('renders images for courses with available photos', () => {
    render(<KaisekiMenuSection />)
    expect(screen.getByAltText('先附の写真')).toBeInTheDocument()
    expect(screen.getByAltText('椀物の写真')).toBeInTheDocument()
    expect(screen.getByAltText('造りの写真')).toBeInTheDocument()
  })

  it('renders placeholder images for courses without photos', () => {
    render(<KaisekiMenuSection />)
    expect(screen.getByLabelText('八寸の写真')).toBeInTheDocument()
    expect(screen.getByLabelText('揚物の写真')).toBeInTheDocument()
    expect(screen.getByLabelText('食事の写真')).toBeInTheDocument()
  })
})
