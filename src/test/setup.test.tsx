import { describe, it, expect } from 'vitest'
import { render, screen } from './utils'

describe('Test Setup', () => {
  it('renders a basic element', () => {
    render(<div data-testid="test">Hello</div>)
    expect(screen.getByTestId('test')).toHaveTextContent('Hello')
  })

  it('vitest globals work', () => {
    expect(1 + 1).toBe(2)
  })
})
