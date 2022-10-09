import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'

import { PageLayout } from '~/components/layout/page'
import Vector from '~/components/primitives/vector'
import Gallery from '~/components/sections/SlideShow/Gallery'
import NavigationImage from '~/components/sections/SlideShow/NavigationImage'
import image1 from '~/public/images/1.jpg'
import image2 from '~/public/images/2.jpg'
import image3 from '~/public/images/3.jpg'
import image4 from '~/public/images/4.jpg'
import image5 from '~/public/images/5.jpg'
import image6 from '~/public/images/6.jpg'

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

const SlideShow = () => {
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
          <NavigationImage data={data} className="prev" />
          <NavigationImage data={data} className="next" />
          <Gallery data={data} />
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
  }
`

export default SlideShow
