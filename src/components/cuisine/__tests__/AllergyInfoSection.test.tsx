import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { AllergyInfoSection } from '../AllergyInfoSection'

describe('AllergyInfoSection', () => {
  it('renders the section title', () => {
    render(<AllergyInfoSection />)
    expect(screen.getByText('アレルギー・特別対応')).toBeInTheDocument()
  })

  it('renders all three accommodation type titles', () => {
    render(<AllergyInfoSection />)
    expect(screen.getByText('アレルギー対応')).toBeInTheDocument()
    expect(screen.getByText('ベジタリアン対応')).toBeInTheDocument()
    expect(screen.getByText('お子様メニュー')).toBeInTheDocument()
  })

  it('renders descriptions for each accommodation type', () => {
    render(<AllergyInfoSection />)
    expect(screen.getByText(/事前にお知らせいただければ/)).toBeInTheDocument()
    expect(screen.getByText(/精進料理をベースとした/)).toBeInTheDocument()
    expect(screen.getByText(/お子様向けの特別メニュー/)).toBeInTheDocument()
  })

  it('renders the section as a semantic section element', () => {
    const { container } = render(<AllergyInfoSection />)
    const section = container.querySelector('section')
    expect(section).toBeInTheDocument()
  })

  it('renders icon placeholders for each item', () => {
    render(<AllergyInfoSection />)
    expect(screen.getByLabelText('アレルギー対応のアイコン')).toBeInTheDocument()
    expect(screen.getByLabelText('ベジタリアン対応のアイコン')).toBeInTheDocument()
    expect(screen.getByLabelText('お子様メニューのアイコン')).toBeInTheDocument()
  })
})
