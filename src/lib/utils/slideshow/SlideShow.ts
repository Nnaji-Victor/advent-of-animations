import { gsap } from '~/lib/gsap'

interface SlideShowProps {
  el: HTMLElement | null
  slides: NodeListOf<Element> | null
}

class Slide {
  DOM = {
    outer: null,
    inner: null
  } as any

  constructor(el: HTMLElement) {
    this.DOM.outer = el
    this.DOM.inner = this.DOM.outer.children[0]
  }
}

export class SlideShowClass {
  DOM: SlideShowProps = {
    el: null,
    slides: null
  }

  slideArr: any = []
  current = 0
  slidesTotal: any
  currentSlide: any
  direction!: 'next' | 'prev'
  isAnimating = false
  duration = 1.2
  ease = 'power3.inOut'
  filtersAnimation = true
  upcomingSlide: any
  timeline: any

  constructor(el: HTMLElement, options: any = {}) {
    this.DOM.el = el

    this.duration = options.duration || this.duration
    this.ease = options.ease || this.ease
    this.filtersAnimation = options.filtersAnimation || this.filtersAnimation

    this.DOM.slides = this.DOM.el.querySelectorAll('.slides__img')

    this.DOM.slides.forEach((slide: any) =>
      this.slideArr.push(new Slide(slide))
    )
    this.slidesTotal = this.slideArr.length
  }

  setInitialSlide(position = this.current) {
    this.current = position
    this.currentSlide = this.slideArr[this.current]
    if (this.DOM.slides) {
      this.DOM.slides[this.current].classList.add('slides__img--current')
    }
  }

  next() {
    if (this.isAnimating) return
    this.direction = 'next'
    this.current = this.current < this.slidesTotal - 1 ? this.current + 1 : 0
    this.navigate()
  }

  prev() {
    if (this.isAnimating) return
    this.direction = 'prev'
    this.current = this.current > 0 ? this.current - 1 : this.slidesTotal - 1
    this.navigate()
  }

  navigate(position = this.current) {
    this.isAnimating = true
    this.current = position

    this.upcomingSlide = this.slideArr[this.current]

    this.timeline = gsap
      .timeline({
        defaults: {
          duration: this.duration,
          ease: this.ease
        },
        onComplete: () => {
          this.currentSlide.DOM.outer.classList.remove('slides__img--current')
          this.upcomingSlide.DOM.outer.classList.add('slides__img--current')
          // Update current Slide
          this.currentSlide = this.slideArr[this.current]

          this.isAnimating = false
        }
      })
      .addLabel('start', 0)
      .set(
        this.upcomingSlide.DOM.outer,
        {
          opacity: 1
        },
        'start'
      )
      .to(
        this.currentSlide.DOM.outer,
        {
          x: this.direction === 'next' ? '-101%' : '101%',
          onComplete: () => {
            gsap.set(this.currentSlide.DOM.outer, { x: '0%', opacity: 0 })
          }
        },
        'start'
      )
      .to(
        this.currentSlide.DOM.inner,
        {
          x: this.direction === 'next' ? '101%' : '-101%',
          onComplete: () => {
            gsap.set(this.currentSlide.DOM.inner, { x: '0%' })
          }
        },
        'start'
      )

    if (this.filtersAnimation) {
      this.timeline
        .to(
          this.currentSlide.DOM.inner,
          {
            startAt: { filter: 'brightness(100%)' },
            filter: 'brightness(800%)',
            onComplete: () =>
              gsap.set(this.currentSlide.DOM.inner, {
                filter: 'brightness(100%)'
              })
          },
          'start'
        )
        .to(
          this.upcomingSlide.DOM.inner,
          {
            startAt: { filter: 'brightness(800%)' },
            filter: 'brightness(100%)'
          },
          'start'
        )
    }
  }
}
