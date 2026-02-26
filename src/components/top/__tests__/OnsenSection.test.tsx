import { render, screen } from '@/test/utils'
import { OnsenSection } from '../OnsenSection'

describe('OnsenSection', () => {
  it('renders the ONSEN english label', () => {
    render(<OnsenSection />)
    expect(screen.getByText('ONSEN')).toBeInTheDocument()
  })

  it('renders the section title with 湖を望む and 湯処', () => {
    render(<OnsenSection />)
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveTextContent(/湖を望む/)
    expect(heading).toHaveTextContent(/湯処/)
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

  it('renders an onsen image with appropriate alt text', () => {
    render(<OnsenSection />)
    const img = screen.getByRole('img', { name: /露天風呂/ })
    expect(img).toBeInTheDocument()
  })

  it('renders the onsen image with correct src', () => {
    render(<OnsenSection />)
    const img = screen.getByRole('img', { name: /露天風呂/ })
    expect(img).toHaveAttribute('src', expect.stringContaining('top-onsen-main.png'))
  })

  it('renders content on the left and image on the right', () => {
    const { container } = render(<OnsenSection />)
    const section = container.querySelector('section')!
    const children = Array.from(section.children) as HTMLElement[]
    // First child should contain the text content, second child should contain the image
    expect(children.length).toBe(2)
    expect(children[0]).toHaveTextContent(/湖を望む/)
    expect(children[1].querySelector('img')).toBeInTheDocument()
  })
})
