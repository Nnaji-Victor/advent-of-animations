import clsx from 'clsx'
import React from 'react'
import styled from 'styled-components'

import { DataProps } from '~/ts/data'

interface GalleryProps {
  data: DataProps[]
}

const Gallery = ({ data }: GalleryProps) => {
  return (
    <StyledGallery className="gallery slides">
      {data.map((item, index) => (
        <div
          className={clsx(
            'gallery__img slides__img',
            index === 0 && 'slides__img--current'
          )}
          key={index + item.meta}
        >
          <div
            className="gallery__img-inner slides__img-inner"
            style={{ backgroundImage: 'url(' + item.image.src + ')' }}
          ></div>
        </div>
      ))}
    </StyledGallery>
  )
}

const StyledGallery = styled.div`
  border-radius: 25vw 25vw 0 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  margin-top: auto;
  justify-self: center;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 100%;

  .gallery__img {
    overflow: hidden;
    position: absolute;
    opacity: 0;
    pointer-events: none;
    width: 100%;
    height: 100%;
    will-change: opacity, transform;
  }

  .gallery__img-inner {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: 50% 50%;
    will-change: filter, transform;
  }
`

export default Gallery
