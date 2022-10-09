import clsx from 'clsx'
import React from 'react'
import styled from 'styled-components'

import { DataProps } from '~/ts/data'

interface NavigationImageProps {
  data: DataProps[]
  className: string
  onClick: () => void
}
const NavigationImage = ({
  data,
  className,
  onClick
}: NavigationImageProps) => {
  return (
    <StyledNavigationImage
      className={clsx(`nav nav--${className}`)}
      role="button"
      onClick={onClick}
    >
      <div className="nav__imgwrap slides">
        {data.map((item, index) => (
          <div key={index} className={'nav__img slides__img'}>
            <div
              className="nav__img-inner slides__img-inner"
              style={{ backgroundImage: 'url(' + item.image.src + ')' }}
            ></div>
          </div>
        ))}
      </div>
      <button className="nav__text no-select">
        {className === 'prev' ? 'Previous' : 'Next'}
      </button>
    </StyledNavigationImage>
  )
}

const StyledNavigationImage = styled.nav`
  text-align: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-self: start;

  &.nav--prev {
    grid-area: nav-prev;
    align-items: flex-end;
    padding-right: 1.5rem;
  }

  &.nav--next {
    grid-area: nav-next;
    align-items: flex-start;
    padding-left: 1.5rem;
  }

  .nav__imgwrap {
    background: #000;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    display: grid;
    grid-template-rows: 100%;
    grid-template-columns: 100% 100%;
  }

  .nav__img {
    grid-area: 1 / 1 / 2 / 2;
    position: relative;
    overflow: hidden;
    opacity: 0;
    pointer-events: none;
    will-change: opacity, transform;
  }

  .nav__img-inner {
    width: 60px;
    height: 60px;
    background-size: cover;
    will-change: filter, transform;
  }
  .nav__text {
    text-transform: uppercase;
    cursor: pointer;
    margin-top: 3.5vh;
    color: var(--color-text-alt);
  }
`

export default NavigationImage
