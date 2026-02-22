import { render, screen } from '@/test/utils'
import { HeroSection } from '../HeroSection'

describe('HeroSection', () => {
  it('renders the main headline with ryokan name', () => {
    render(<HeroSection />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('月瀬庵')
  })

  it('renders the subtitle text', () => {
    render(<HeroSection />)
    expect(screen.getByText('心を解くひととき')).toBeInTheDocument()
  })

  it('renders the English label TSUKISE-AN', () => {
    render(<HeroSection />)
    expect(screen.getByText('TSUKISE-AN')).toBeInTheDocument()
  })

  it('renders the scroll indicator', () => {
    render(<HeroSection />)
    expect(screen.getByText('Scroll')).toBeInTheDocument()
  })

  it('renders the location label', () => {
    render(<HeroSection />)
    expect(screen.getByText('箱根 芦ノ湖畔')).toBeInTheDocument()
  })
})
