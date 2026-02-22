import { render, screen } from '@/test/utils'
import { RoomSection } from '../RoomSection'

describe('RoomSection', () => {
  it('renders the ROOMS english label', () => {
    render(<RoomSection />)
    expect(screen.getByText('ROOMS')).toBeInTheDocument()
  })

  it('renders the section title about rooms', () => {
    render(<RoomSection />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/全八室/)
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
})
