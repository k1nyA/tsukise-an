import { render, screen } from '@/test/utils'
import { StaySection } from '../StaySection'

describe('StaySection', () => {
  it('renders the EXPERIENCE english label', () => {
    render(<StaySection />)
    expect(screen.getByText('EXPERIENCE')).toBeInTheDocument()
  })

  it('renders the section title', () => {
    render(<StaySection />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('月瀬庵での過ごし方')
  })

  it('renders all six timeline items with times', () => {
    render(<StaySection />)
    expect(screen.getByText('15:00')).toBeInTheDocument()
    expect(screen.getByText('17:00')).toBeInTheDocument()
    expect(screen.getByText('18:30')).toBeInTheDocument()
    expect(screen.getByText('21:00')).toBeInTheDocument()
    expect(screen.getByText('08:00')).toBeInTheDocument()
    expect(screen.getByText('11:00')).toBeInTheDocument()
  })

  it('renders timeline item titles', () => {
    render(<StaySection />)
    expect(screen.getByText('お出迎え')).toBeInTheDocument()
    expect(screen.getByText('月見の湯')).toBeInTheDocument()
    expect(screen.getByText('お見送り')).toBeInTheDocument()
  })

  it('renders the next-morning divider text', () => {
    render(<StaySection />)
    expect(screen.getByText('翌 朝')).toBeInTheDocument()
  })
})
