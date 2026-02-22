import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { ExperienceLinksSection } from '../ExperienceLinksSection'

describe('ExperienceLinksSection', () => {
  it('renders within a nav element', () => {
    const { container } = render(<ExperienceLinksSection />)
    const nav = container.querySelector('nav')
    expect(nav).toBeInTheDocument()
  })

  it('renders link to rooms page', () => {
    render(<ExperienceLinksSection />)
    const roomsLink = screen.getByRole('link', { name: /客室を見る/ })
    expect(roomsLink).toBeInTheDocument()
    expect(roomsLink).toHaveAttribute('href', '/rooms')
  })

  it('renders link to onsen page', () => {
    render(<ExperienceLinksSection />)
    const onsenLink = screen.getByRole('link', { name: /温泉を見る/ })
    expect(onsenLink).toBeInTheDocument()
    expect(onsenLink).toHaveAttribute('href', '/onsen')
  })

  it('renders arrow indicators in links', () => {
    render(<ExperienceLinksSection />)
    expect(screen.getByText(/客室を見る →/)).toBeInTheDocument()
    expect(screen.getByText(/温泉を見る →/)).toBeInTheDocument()
  })
})
