import { render, screen } from '@/test/utils'
import { OnsenSection } from '../OnsenSection'

describe('OnsenSection', () => {
  it('renders the ONSEN english label', () => {
    render(<OnsenSection />)
    expect(screen.getByText('ONSEN')).toBeInTheDocument()
  })

  it('renders the section title about onsen', () => {
    render(<OnsenSection />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/湖を望む/)
  })

  it('renders the description about the hot spring source', () => {
    render(<OnsenSection />)
    expect(screen.getByText(/姥子温泉の源泉/)).toBeInTheDocument()
  })

  it('renders a link to onsen page', () => {
    render(<OnsenSection />)
    const link = screen.getByRole('link', { name: /温泉を見る/ })
    expect(link).toHaveAttribute('href', '/onsen')
  })

  it('renders with content area on the left and image on the right', () => {
    const { container } = render(<OnsenSection />)
    expect(container.querySelector('section')).toBeInTheDocument()
  })
})
