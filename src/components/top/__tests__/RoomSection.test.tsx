import { render, screen } from '@/test/utils'
import { RoomSection } from '../RoomSection'

describe('RoomSection', () => {
  it('renders the ROOMS english label', () => {
    render(<RoomSection />)
    expect(screen.getByText('ROOMS')).toBeInTheDocument()
  })

  it('renders the section title with 全八室の and 離れ', () => {
    render(<RoomSection />)
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveTextContent(/全八室の/)
    expect(heading).toHaveTextContent(/離れ/)
  })

  it('renders the description about private cottages', () => {
    render(<RoomSection />)
    expect(screen.getByText(/一棟独立の離れ形式/)).toBeInTheDocument()
  })

  it('renders a link to rooms page', () => {
    render(<RoomSection />)
    const link = screen.getByRole('link', { name: /客室を見る/ })
    expect(link).toHaveAttribute('href', '/rooms')
  })

  it('renders as a section element with dark background content area', () => {
    const { container } = render(<RoomSection />)
    expect(container.querySelector('section')).toBeInTheDocument()
  })

  it('renders a room image with appropriate alt text', () => {
    render(<RoomSection />)
    const img = screen.getByRole('img', { name: /客室/ })
    expect(img).toBeInTheDocument()
  })

  it('renders the room image with correct src', () => {
    render(<RoomSection />)
    const img = screen.getByRole('img', { name: /客室/ })
    expect(img).toHaveAttribute('src', expect.stringContaining('top-room-main.png'))
  })

  it('renders image on the left and content on the right', () => {
    const { container } = render(<RoomSection />)
    const section = container.querySelector('section')!
    const children = Array.from(section.children) as HTMLElement[]
    // First child should contain the image, second child should contain the text content
    expect(children.length).toBe(2)
    expect(children[0].querySelector('img')).toBeInTheDocument()
    expect(children[1]).toHaveTextContent(/全八室/)
  })
})
