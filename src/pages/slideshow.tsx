import React, { useEffect, useRef, useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'

import { PageLayout } from '~/components/layout/page'
import Vector from '~/components/primitives/vector'
import Gallery from '~/components/sections/SlideShow/Gallery'
import NavigationImage from '~/components/sections/SlideShow/NavigationImage'
import { gsap } from '~/lib/gsap'
import { SlideShowClass } from '~/lib/utils/slideshow/SlideShow'
import image1 from '~/public/images/1.jpg'
import image2 from '~/public/images/2.jpg'
import image3 from '~/public/images/3.jpg'
import image4 from '~/public/images/4.jpg'
import image5 from '~/public/images/5.jpg'
import image6 from '~/public/images/6.jpg'

const SlideShow = () => {
  const data = [
    {
      meta: 'Gravity is a b****',
      image: image1,
      popularity: 'well known'
    },
    {
      meta: "Clock's not right",
      image: image2,
      popularity: 'Newbie'
    },
    {
      meta: 'Hot jungle speed',
      image: image3,
      popularity: 'Rising Star'
    },
    {
      meta: 'Crisps gone wild',
      image: image4,
      popularity: 'well known'
    },
    {
      meta: "Who's Walter?",
      image: image5,
      popularity: 'Newbie'
    },
    {
      meta: 'Fancy franky',
      image: image6,
      popularity: 'well known'
    }
  ]
  const galleryRef = useRef<HTMLDivElement | null>(null)
  const prevRef = useRef<HTMLDivElement | null>(null)
  const nextRef = useRef<HTMLDivElement | null>(null)
  const [state, setState] = useState<any>({
    bodyEl: '',
    bodyColor: '',
    titleElems: '',
    slideshowMain: null,
    slideshowNavPrev: null,
    slideshowNavNext: null
  })
  useEffect(() => {
    const bodyEl = document.body
    const bodyColor = getComputedStyle(bodyEl).getPropertyValue('--color-bg')

    const slideshowMain = new SlideShowClass(
      galleryRef.current?.querySelector('.slides') as HTMLElement
    )
    const slideshowNavNext = new SlideShowClass(
      nextRef.current?.querySelector('.slides') as HTMLElement,
      { duration: 1, filtersAnimation: false }
    )
    const slideshowNavPrev = new SlideShowClass(
      prevRef.current?.querySelector('.slides') as HTMLElement,
      { duration: 1, filtersAnimation: false }
    )

    slideshowMain.setInitialSlide()
    slideshowNavNext.setInitialSlide(
      slideshowMain.current < slideshowMain.slidesTotal - 1
        ? slideshowMain.current + 1
        : 0
    )
    slideshowNavPrev.setInitialSlide(
      slideshowMain.current
        ? slideshowMain.current - 1
        : slideshowMain.slidesTotal - 1
    )

    const titleElems: HTMLElement[] = gsap.utils.toArray(
      '.meta__content > .meta__content-title'
    )

    gsap.set(titleElems[slideshowMain.current], { opacity: 1 })

    setState({
      slideshowMain,
      slideshowNavPrev,
      slideshowNavNext,
      bodyColor,
      bodyEl,
      titleElems
    })
  }, [])

  const {
    slideshowMain,
    slideshowNavPrev,
    slideshowNavNext,
    titleElems,
    bodyEl,
    bodyColor
  } = state

  const animateBodyBGColor = () => {
    gsap
      .timeline()
      .to(
        bodyEl,
        {
          duration: slideshowMain.duration / 2,
          ease: 'power3.in',
          backgroundColor: '#2b0889'
        },
        'start'
      )
      .to(
        bodyEl,
        {
          duration: slideshowMain.duration,
          ease: 'power3',
          backgroundColor: bodyColor
        },
        'start+=' + slideshowMain.duration / 2
      )
  }

  const onClickNavCtrlEv = (dir: 'prev' | 'next') => {
    if (slideshowMain.isAnimating) return
    gsap.to(titleElems[slideshowMain.current], {
      duration: slideshowMain.duration / 2,
      ease: 'power3.in',
      y: dir === 'next' ? '-100%' : '100%',
      opacity: 0
    })

    slideshowMain[dir]()
    slideshowNavPrev[dir]()
    slideshowNavNext[dir]()
    animateBodyBGColor()

    gsap.to(titleElems[slideshowMain.current], {
      duration: slideshowMain.duration / 2,
      ease: 'power3',
      startAt: { y: dir === 'next' ? '100%' : '-100%' },
      y: '0%',
      opacity: 1,
      delay: slideshowMain.duration / 2
    })
  }

  function handleButtonClick(dir: 'prev' | 'next') {
    onClickNavCtrlEv(dir)
  }

  return (
    <PageLayout>
      <GlobalStyle />
      <StyledSlideShow>
        <Vector />
        <h1 className="title">Paranoia Diaries</h1>
        <div className="slideshows">
          <div className="meta">
            <span className="meta__heading">Now seeing</span>
            <div className="meta__content">
              {data.map((item, index) => (
                <span className="meta__content-title" key={index}>
                  {item.meta}
                </span>
              ))}
            </div>
          </div>
          <div className="prev" ref={prevRef}>
            <NavigationImage
              data={data}
              className="prev"
              onClick={() => handleButtonClick('prev')}
            />
          </div>
          <div className="next" ref={nextRef}>
            <NavigationImage
              data={data}
              className="next"
              onClick={() => handleButtonClick('next')}
            />
          </div>
          <div className="galleryRef" ref={galleryRef}>
            <Gallery data={data} />
          </div>
        </div>
      </StyledSlideShow>
    </PageLayout>
  )
}

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  --color-text: #000;
  --color-text-alt: #1d0460;
  --color-text-slide: #53dbf1;
  --color-bg: #4000ea;
  --color-link: #000;
  --color-link-hover: #f33ba5;
  --page-padding: 25px;
    color: var(--color-text);
    background-color: var(--color-bg);
    -webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	will-change: background-color;
  }
`

const StyledSlideShow = styled.section`
  display: grid;
  grid-template-columns: 28.05% 43.9% 28.05%;
  grid-template-rows: 25% 1fr 29.5% 8.5%;
  position: relative;
  width: 100%;
  height: 100vh;
  .title {
    line-height: 1;
    font-size: clamp(1.75rem, 3vw, 15rem);
    white-space: nowrap;
    font-weight: 900;
    margin: 0;
    padding: var(--page-padding);
    justify-self: center;
    grid-area: 1 / 2 / 2 / 3;
  }

  .slideshows {
    height: auto;
    display: grid;
    grid-area: 2 / 2 / 5 / 3;
    grid-template-columns: 4rem 43.8vw 4rem;
    grid-template-rows: 38% 20% 42%;
    margin-left: -4rem;
    grid-template-areas:
      '... img title'
      'nav-prev img nav-next'
      '... img ...';
    justify-content: start;
    .meta {
      margin: 3rem 0 0 1rem;
      text-align: left;
      width: max-content;
      justify-self: start;
      grid-area: title;

      .meta__heading {
        font-weight: 600;
        font-size: 2;
        display: block;
        margin: 0 0 0 0;
      }

      .meta__content {
        color: var(--color-text-slide);
        display: grid;
      }

      .meta__content-title {
        opacity: 0;
        grid-area: 1 / 1 / 2 / 2;
        will-change: opacity, transform;
      }
    }

    .slides__img--current {
      pointer-events: auto;
      opacity: 1;
      z-index: 1000;
    }

    .galleryRef {
      grid-area: img;
    }
    .prev {
      grid-area: nav-prev;
      align-items: flex-start;
      padding-right: 1.5rem;
    }

    .next {
      grid-area: nav-next;
      align-items: flex-start;
      padding-left: 1.5rem;
    }
  }
`

export default SlideShow
