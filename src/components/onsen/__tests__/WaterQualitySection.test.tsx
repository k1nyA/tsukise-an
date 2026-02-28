import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { WaterQualitySection } from '../WaterQualitySection'

describe('WaterQualitySection', () => {
  it('renders the section title "泉質と効能"', () => {
    render(<WaterQualitySection />)
    expect(screen.getByText('泉質と効能')).toBeInTheDocument()
  })

  it('renders all four quality card labels per .pen SSOT', () => {
    render(<WaterQualitySection />)
    expect(screen.getByText('源泉名')).toBeInTheDocument()
    expect(screen.getByText('泉質')).toBeInTheDocument()
    expect(screen.getByText('泉温')).toBeInTheDocument()
    expect(screen.getByText('効能')).toBeInTheDocument()
  })

  it('renders correct values per .pen SSOT', () => {
    render(<WaterQualitySection />)
    expect(screen.getByText(/姥子温泉/)).toBeInTheDocument()
    expect(screen.getByText('単純硫黄泉')).toBeInTheDocument()
    expect(screen.getByText(/源泉 62\.3℃/)).toBeInTheDocument()
    expect(screen.getByText(/神経痛・筋肉痛/)).toBeInTheDocument()
  })

  it('renders within a section element', () => {
    const { container } = render(<WaterQualitySection />)
    const section = container.querySelector('section')
    expect(section).toBeInTheDocument()
  })

  it('renders the WATER QUALITY English label', () => {
    render(<WaterQualitySection />)
    expect(screen.getByText('WATER QUALITY')).toBeInTheDocument()
  })
})
