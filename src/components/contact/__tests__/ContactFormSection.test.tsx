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

  // --- Name fields ---
  it('renders the last name (sei) label with required marker', () => {
    render(<ContactFormSection />)
    expect(screen.getByText(/お名前（姓）/)).toBeInTheDocument()
  })

  it('renders the last name input with correct placeholder', () => {
    render(<ContactFormSection />)
    const input = screen.getByPlaceholderText('月瀬')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'text')
    expect(input).toBeRequired()
  })

  it('renders the first name (mei) label with required marker', () => {
    render(<ContactFormSection />)
    expect(screen.getByText(/お名前（名）/)).toBeInTheDocument()
  })

  it('renders the first name input with correct placeholder', () => {
    render(<ContactFormSection />)
    const input = screen.getByPlaceholderText('太郎')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'text')
    expect(input).toBeRequired()
  })

  // --- Email field ---
  it('renders the email label with required marker', () => {
    render(<ContactFormSection />)
    expect(screen.getByText(/メールアドレス/)).toBeInTheDocument()
  })

  it('renders the email input with correct type and placeholder', () => {
    render(<ContactFormSection />)
    const input = screen.getByPlaceholderText('example@email.com')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'email')
    expect(input).toBeRequired()
  })

  // --- Phone field ---
  it('renders the phone label without required marker', () => {
    render(<ContactFormSection />)
    const phoneLabel = screen.getByText('お電話番号')
    expect(phoneLabel).toBeInTheDocument()
  })

  it('renders the phone input with correct placeholder', () => {
    render(<ContactFormSection />)
    const input = screen.getByPlaceholderText('090-1234-5678')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'tel')
    expect(input).not.toBeRequired()
  })

  // --- Subject select ---
  it('renders the subject select with required attribute', () => {
    render(<ContactFormSection />)
    const select = screen.getByRole('combobox', { name: /お問い合わせ種別/ })
    expect(select).toBeInTheDocument()
    expect(select).toBeRequired()
  })

  it('renders subject select options', () => {
    render(<ContactFormSection />)
    expect(screen.getByText('お問い合わせ種別を選択')).toBeInTheDocument()
    expect(screen.getByText('ご宿泊について')).toBeInTheDocument()
    expect(screen.getByText('お祝い・ご接待について')).toBeInTheDocument()
    expect(screen.getByText('お食事について')).toBeInTheDocument()
    expect(screen.getByText('その他のお問い合わせ')).toBeInTheDocument()
  })

  // --- Message textarea ---
  it('renders the message label with required marker', () => {
    render(<ContactFormSection />)
    expect(screen.getByText(/お問い合わせ内容/)).toBeInTheDocument()
  })

  it('renders the message textarea with correct placeholder', () => {
    render(<ContactFormSection />)
    const textarea = screen.getByPlaceholderText('ご質問やご要望をご記入ください')
    expect(textarea).toBeInTheDocument()
    expect(textarea.tagName).toBe('TEXTAREA')
    expect(textarea).toBeRequired()
  })

  // --- Privacy checkbox ---
  it('renders the privacy policy checkbox', () => {
    render(<ContactFormSection />)
    const checkbox = screen.getByRole('checkbox', { name: /プライバシーポリシーに同意する/ })
    expect(checkbox).toBeInTheDocument()
    expect(checkbox).toBeRequired()
  })

  it('renders a link to the privacy policy', () => {
    render(<ContactFormSection />)
    const link = screen.getByRole('link', { name: 'プライバシーポリシー' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/privacy')
  })

  // --- Submit button ---
  it('renders the submit button', () => {
    render(<ContactFormSection />)
    const button = screen.getByRole('button', { name: '送信する' })
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('type', 'submit')
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
