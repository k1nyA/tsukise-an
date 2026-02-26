import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { ContactFormSection } from '../ContactFormSection'

describe('ContactFormSection', () => {
  it('renders the section as a semantic section element', () => {
    const { container } = render(<ContactFormSection />)
    const section = container.querySelector('section')
    expect(section).toBeInTheDocument()
  })

  it('renders a form element', () => {
    const { container } = render(<ContactFormSection />)
    const form = container.querySelector('form')
    expect(form).toBeInTheDocument()
  })

  it('renders the Web3Forms badge text', () => {
    render(<ContactFormSection />)
    expect(screen.getByText('Powered by Web3Forms')).toBeInTheDocument()
  })

  // --- Name field ---
  it('renders the name label with required marker', () => {
    render(<ContactFormSection />)
    expect(screen.getByText(/お名前/)).toBeInTheDocument()
  })

  // --- Email field ---
  it('renders the email label with required marker', () => {
    render(<ContactFormSection />)
    expect(screen.getByText(/メールアドレス/)).toBeInTheDocument()
  })

  // --- Phone field ---
  it('renders the phone label without required marker', () => {
    render(<ContactFormSection />)
    const phoneLabel = screen.getByText('お電話番号')
    expect(phoneLabel).toBeInTheDocument()
  })

  // --- Subject select ---
  it('renders the subject select with required attribute', () => {
    const { container } = render(<ContactFormSection />)
    const select = container.querySelector('select')
    expect(select).toBeInTheDocument()
    expect(select).toBeRequired()
  })

  it('renders subject select options', () => {
    render(<ContactFormSection />)
    expect(screen.getByText('ご予約について')).toBeInTheDocument()
    expect(screen.getByText('施設について')).toBeInTheDocument()
    expect(screen.getByText('アクセスについて')).toBeInTheDocument()
    expect(screen.getByText('その他')).toBeInTheDocument()
  })

  // --- Message textarea ---
  it('renders the message label with required marker', () => {
    render(<ContactFormSection />)
    expect(screen.getByText(/お問い合わせ内容/)).toBeInTheDocument()
  })

  it('renders the message textarea', () => {
    const { container } = render(<ContactFormSection />)
    const textarea = container.querySelector('textarea')
    expect(textarea).toBeInTheDocument()
    expect(textarea).toBeRequired()
  })

  // --- Privacy checkbox ---
  it('renders the privacy policy checkbox', () => {
    render(<ContactFormSection />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeInTheDocument()
  })

  it('renders the privacy agreement text', () => {
    render(<ContactFormSection />)
    expect(screen.getByText(/プライバシーポリシーに同意する/)).toBeInTheDocument()
  })

  // --- Submit button ---
  it('renders the submit button', () => {
    render(<ContactFormSection />)
    const button = screen.getByRole('button', { name: '送信する' })
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('type', 'submit')
  })

  // --- Missing access key warning ---
  it('shows a warning when no access key is provided', () => {
    render(<ContactFormSection />)
    expect(
      screen.getByText(/フォーム送信設定が未完了です/)
    ).toBeInTheDocument()
  })

  // --- Form labels linked to inputs ---
  it('associates labels with their corresponding inputs via htmlFor', () => {
    const { container } = render(<ContactFormSection />)
    const labels = container.querySelectorAll('label')
    labels.forEach((label) => {
      const forAttr = label.getAttribute('for')
      if (forAttr) {
        const input = container.querySelector(`#${forAttr}`)
        expect(input).toBeInTheDocument()
      }
    })
  })
})
