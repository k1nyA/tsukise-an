import { render, screen } from '@/test/utils'
import { InfoSection } from '../InfoSection'

const mockNewsItems = [
  {
    slug: 'spring-news',
    date: '2026.02.20',
    title: '春の特別懐石「桜花」のご案内',
  },
  {
    slug: 'renewal-news',
    date: '2026.02.10',
    title: '客室「月影」リニューアルのお知らせ',
  },
]

describe('InfoSection', () => {
  it('renders the NEWS english label', () => {
    render(<InfoSection newsItems={mockNewsItems} />)
    expect(screen.getByText('NEWS')).toBeInTheDocument()
  })

  it('renders the ACCESS english label', () => {
    render(<InfoSection newsItems={mockNewsItems} />)
    expect(screen.getByText('ACCESS')).toBeInTheDocument()
  })

  it('renders news items from props with dates', () => {
    render(<InfoSection newsItems={mockNewsItems} />)
    expect(screen.getByText('2026.02.20')).toBeInTheDocument()
    expect(screen.getByText(/春の特別懐石/)).toBeInTheDocument()
    expect(screen.getByText('2026.02.10')).toBeInTheDocument()
    expect(screen.getByText(/客室「月影」リニューアル/)).toBeInTheDocument()
  })

  it('renders the address information', () => {
    render(<InfoSection newsItems={mockNewsItems} />)
    expect(screen.getByText(/神奈川県足柄下郡箱根町元箱根138/)).toBeInTheDocument()
  })

  it('renders a link to view all news', () => {
    render(<InfoSection newsItems={mockNewsItems} />)
    const link = screen.getByRole('link', { name: /一覧を見る/ })
    expect(link).toHaveAttribute('href', '/news')
  })

  it('renders fallback text when no news is provided', () => {
    render(<InfoSection newsItems={[]} />)
    expect(screen.getByText('お知らせは現在準備中です。')).toBeInTheDocument()
  })

  it('renders access methods with transport info', () => {
    render(<InfoSection newsItems={mockNewsItems} />)
    expect(screen.getByText(/お車で：東名高速/)).toBeInTheDocument()
    expect(screen.getByText(/電車で：箱根湯本駅/)).toBeInTheDocument()
  })

  it('renders TEL and FAX numbers', () => {
    render(<InfoSection newsItems={mockNewsItems} />)
    expect(screen.getByText(/0460-83-XXXX/)).toBeInTheDocument()
  })

  it('renders the map image with alt text', () => {
    render(<InfoSection newsItems={mockNewsItems} />)
    const mapImg = screen.getByAltText('月瀬庵へのアクセスマップ')
    expect(mapImg).toBeInTheDocument()
  })
})
