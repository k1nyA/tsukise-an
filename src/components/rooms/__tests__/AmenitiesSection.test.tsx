import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { AmenitiesSection } from '../AmenitiesSection'

describe('AmenitiesSection', () => {
  it('renders the section heading text', () => {
    render(<AmenitiesSection />)
    expect(screen.getByText('客室の設えとおもてなし')).toBeInTheDocument()
  })

  it('renders all three amenity titles', () => {
    render(<AmenitiesSection />)
    expect(screen.getByText('源泉掛け流し露天風呂')).toBeInTheDocument()
    expect(screen.getByText('こだわりの調度品')).toBeInTheDocument()
    expect(screen.getByText('月見テラス')).toBeInTheDocument()
  })

  it('renders amenity descriptions', () => {
    render(<AmenitiesSection />)
    expect(
      screen.getByText(/全室に専用の露天風呂を完備/)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/箱根寄木細工の家具/)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/芦ノ湖に浮かぶ月を独占/)
    ).toBeInTheDocument()
  })

  it('renders the facilities section with bath and room equipment', () => {
    render(<AmenitiesSection />)
    expect(screen.getByText('お風呂')).toBeInTheDocument()
    expect(screen.getByText('客室設備')).toBeInTheDocument()
  })

  it('renders specific facility items', () => {
    render(<AmenitiesSection />)
    expect(screen.getByText(/源泉掛け流し専用露天風呂/)).toBeInTheDocument()
    expect(screen.getByText(/Wi-Fi完備/)).toBeInTheDocument()
  })
})
