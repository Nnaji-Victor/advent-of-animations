import React from 'react'
import styled from 'styled-components'

const Vector = () => {
  return (
    <StyledVector>
      <svg
        className="vector vector--lines"
        width="100%"
        height="100%"
        viewBox="0 0 1441 790"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          vectorEffect="non-scaling-stroke"
          d="M1035.5 790V0m-315 790V0m-317 790V0M.5 490h1440M.5 725h1440M.5 490l403 235m633 .5 403-235"
        />
      </svg>
      <svg
        className="vector vector--circle"
        width="100%"
        height="100%"
        viewBox="0 0 634 634"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <circle
          vectorEffect="non-scaling-stroke"
          cx="316"
          cy="316"
          r="316"
        ></circle>
      </svg>
    </StyledVector>
  )
}

const StyledVector = styled.span`
  .vector {
    position: fixed;
    pointer-events: none;
    fill: none;
    stroke: #000;
    stroke-width: 0.5px;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  .vector--circle {
    width: 44%;
    left: 28%;
    top: -50%;
  }
`

export default Vector
