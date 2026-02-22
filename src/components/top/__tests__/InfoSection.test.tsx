import { render, screen } from '@/test/utils'
import { InfoSection } from '../InfoSection'

describe('InfoSection', () => {
  it('renders the NEWS english label', () => {
    render(<InfoSection />)
    expect(screen.getByText('NEWS')).toBeInTheDocument()
  })

  it('renders the ACCESS english label', () => {
    render(<InfoSection />)
    expect(screen.getByText('ACCESS')).toBeInTheDocument()
  })

  it('renders news items with dates', () => {
    render(<InfoSection />)
    expect(screen.getByText('2025.02.15')).toBeInTheDocument()
    expect(screen.getByText(/春の特別懐石/)).toBeInTheDocument()
  })

  it('renders the address information', () => {
    render(<InfoSection />)
    expect(screen.getByText(/神奈川県足柄下郡箱根町元箱根138/)).toBeInTheDocument()
  })

  it('renders a link to view all news', () => {
    render(<InfoSection />)
    const link = screen.getByRole('link', { name: /一覧を見る/ })
    expect(link).toHaveAttribute('href', '/news')
  })
})
