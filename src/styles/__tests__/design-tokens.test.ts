import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

// Test that design-tokens.css exists and contains all required CSS variables
describe('Design Tokens CSS', () => {
  const cssPath = path.resolve(__dirname, '../design-tokens.css')

  it('design-tokens.css file exists', () => {
    expect(fs.existsSync(cssPath)).toBe(true)
  })

  it('contains all color variables', () => {
    const css = fs.readFileSync(cssPath, 'utf-8')
    const requiredVars = [
      '--ryokan-bg',
      '--ryokan-dark',
      '--ryokan-gold',
      '--ryokan-muted',
      '--ryokan-light-gold',
      '--ryokan-subtle',
      '--ryokan-secondary',
      '--ryokan-light-bg',
      '--ryokan-light-bg-alt',
      '--ryokan-darkest',
      '--ryokan-soft-line',
      '--ryokan-text-on-dark',
      '--ryokan-text-subtle',
    ]
    requiredVars.forEach(v => {
      expect(css).toContain(v)
    })
  })

  it('contains hero overlay variable', () => {
    const css = fs.readFileSync(cssPath, 'utf-8')
    expect(css).toContain('--ryokan-hero-overlay')
  })

  it('contains font family variables', () => {
    const css = fs.readFileSync(cssPath, 'utf-8')
    expect(css).toContain('--font-heading')
    expect(css).toContain('--font-body')
    expect(css).toContain('--font-accent')
  })

  it('contains spacing variables', () => {
    const css = fs.readFileSync(cssPath, 'utf-8')
    expect(css).toContain('--section-padding-y')
    expect(css).toContain('--section-padding-x')
    expect(css).toContain('--content-max-width')
    expect(css).toContain('--page-width')
  })

  it('contains layout dimension variables', () => {
    const css = fs.readFileSync(cssPath, 'utf-8')
    expect(css).toContain('--header-height')
    expect(css).toContain('--hero-height')
    expect(css).toContain('--subpage-hero-height')
  })

  it('color values match design-tokens.json', () => {
    const css = fs.readFileSync(cssPath, 'utf-8')
    const tokensPath = path.resolve(__dirname, '../../../docs/design-data/design-tokens.json')
    const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf-8'))

    // Verify CSS variable values match the source of truth
    Object.entries(tokens.cssVariables as Record<string, string>).forEach(([varName, value]) => {
      expect(css).toContain(`${varName}: ${value}`)
    })
  })

  it('font variables reference Next.js font CSS variables', () => {
    const css = fs.readFileSync(cssPath, 'utf-8')
    // Should reference the Next.js font variables from layout.tsx
    expect(css).toContain('var(--font-serif-jp)')
    expect(css).toContain('var(--font-sans-jp)')
    expect(css).toContain('var(--font-display)')
  })
})
