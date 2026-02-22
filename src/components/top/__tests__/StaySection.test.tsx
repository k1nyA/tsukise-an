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

  it('renders all ten timeline items with times', () => {
    render(<StaySection />)
    // Afternoon row (4 items)
    expect(screen.getByText('15:00')).toBeInTheDocument()
    expect(screen.getByText('15:30')).toBeInTheDocument()
    expect(screen.getByText('16:00')).toBeInTheDocument()
    expect(screen.getByText('17:00')).toBeInTheDocument()
    // Evening row (3 items)
    expect(screen.getByText('18:30')).toBeInTheDocument()
    expect(screen.getByText('20:00')).toBeInTheDocument()
    expect(screen.getByText('21:00')).toBeInTheDocument()
    // Morning row (3 items)
    expect(screen.getByText('08:00')).toBeInTheDocument()
    expect(screen.getByText('10:00')).toBeInTheDocument()
    expect(screen.getByText('11:00')).toBeInTheDocument()
  })

  it('renders timeline item titles', () => {
    render(<StaySection />)
    expect(screen.getByText('チェックイン・お出迎え')).toBeInTheDocument()
    expect(screen.getByText('お部屋へご案内')).toBeInTheDocument()
    expect(screen.getByText('客室露天風呂')).toBeInTheDocument()
    expect(screen.getByText('庭園散策')).toBeInTheDocument()
    expect(screen.getByText('夕食・懐石')).toBeInTheDocument()
    expect(screen.getByText('湯上がりラウンジ')).toBeInTheDocument()
    expect(screen.getByText('月見の湯')).toBeInTheDocument()
    expect(screen.getByText('朝食')).toBeInTheDocument()
    expect(screen.getByText('チェックアウト準備')).toBeInTheDocument()
    expect(screen.getByText('お見送り')).toBeInTheDocument()
  })

  it('renders the next-morning divider text', () => {
    render(<StaySection />)
    expect(screen.getByText('翌 朝')).toBeInTheDocument()
  })

  it('renders 10 timeline images', () => {
    render(<StaySection />)
    const images = screen.getAllByRole('img')
    expect(images).toHaveLength(10)
  })

  it('renders timeline images with correct alt text for afternoon items', () => {
    render(<StaySection />)
    expect(screen.getByAltText('チェックイン・お出迎え')).toBeInTheDocument()
    expect(screen.getByAltText('お部屋へご案内')).toBeInTheDocument()
    expect(screen.getByAltText('客室露天風呂')).toBeInTheDocument()
    expect(screen.getByAltText('庭園散策')).toBeInTheDocument()
  })

  it('renders timeline images with correct alt text for evening items', () => {
    render(<StaySection />)
    expect(screen.getByAltText('夕食・懐石')).toBeInTheDocument()
    expect(screen.getByAltText('湯上がりラウンジ')).toBeInTheDocument()
    expect(screen.getByAltText('月見の湯')).toBeInTheDocument()
  })

  it('renders timeline images with correct alt text for morning items', () => {
    render(<StaySection />)
    expect(screen.getByAltText('朝食')).toBeInTheDocument()
    expect(screen.getByAltText('チェックアウト準備')).toBeInTheDocument()
    expect(screen.getByAltText('お見送り')).toBeInTheDocument()
  })

  it('renders timeline images with correct src paths', () => {
    const { container } = render(<StaySection />)
    const imgElements = container.querySelectorAll('img')
    const srcValues = Array.from(imgElements).map((img) => img.getAttribute('src') ?? '')

    // Afternoon
    expect(srcValues.some((src) => src.includes('stay-1500'))).toBe(true)
    expect(srcValues.some((src) => src.includes('stay-1530'))).toBe(true)
    expect(srcValues.some((src) => src.includes('stay-1600'))).toBe(true)
    expect(srcValues.some((src) => src.includes('stay-1700'))).toBe(true)
    // Evening
    expect(srcValues.some((src) => src.includes('stay-1830'))).toBe(true)
    expect(srcValues.some((src) => src.includes('stay-2000'))).toBe(true)
    expect(srcValues.some((src) => src.includes('stay-2100'))).toBe(true)
    // Morning
    expect(srcValues.some((src) => src.includes('stay-0800'))).toBe(true)
    expect(srcValues.some((src) => src.includes('stay-1000'))).toBe(true)
    expect(srcValues.some((src) => src.includes('stay-1100'))).toBe(true)
  })
})
