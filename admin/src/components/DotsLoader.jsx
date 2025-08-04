import React from 'react';

const DotsLoader = ({
  size = '64px',
  dotSize = '6px',
  dotCount = 6,
  color = '#fff',
  speed = '1s',
  spread = '60deg',
}) => {
  const dotsArray = Array.from({ length: dotCount });

  const loaderStyle = `
    .dots {
      width: var(--size);
      height: var(--size);
      position: relative;
    }

    .dot {
      width: var(--size);
      height: var(--size);
      animation: dwl-dot-spin calc(var(--speed) * 5) infinite linear both;
      animation-delay: calc(var(--i) * var(--speed) / (var(--dot-count) + 2) * -1);
      rotate: calc(var(--i) * var(--spread) / (var(--dot-count) - 1));
      position: absolute;
    }

    .dot::before {
      content: "";
      display: block;
      width: var(--dot-size);
      height: var(--dot-size);
      background-color: var(--color);
      border-radius: 50%;
      position: absolute;
      transform: translate(-50%, -50%);
      bottom: 0;
      left: 50%;
    }

    @keyframes dwl-dot-spin {
      0% {
        transform: rotate(0deg);
        animation-timing-function: cubic-bezier(0.390, 0.575, 0.565, 1.000);
        opacity: 1;
      }

      2% {
        transform: rotate(20deg);
        animation-timing-function: linear;
        opacity: 1;
      }

      30% {
        transform: rotate(180deg);
        animation-timing-function: cubic-bezier(0.445, 0.050, 0.550, 0.950);
        opacity: 1;
      }

      41% {
        transform: rotate(380deg);
        animation-timing-function: linear;
        opacity: 1;
      }

      69% {
        transform: rotate(520deg);
        animation-timing-function: cubic-bezier(0.445, 0.050, 0.550, 0.950);
        opacity: 1;
      }

      76% {
        opacity: 1;
      }

      76.1% {
        opacity: 0;
      }

      80% {
        transform: rotate(720deg);
      }

      100% {
        opacity: 0;
      }
    }
  `;

  return (
    <>
      <style>{loaderStyle}</style>
      <div
        className="dots"
        style={{
          '--size': size,
          '--dot-size': dotSize,
          '--dot-count': dotCount,
          '--color': color,
          '--speed': speed,
          '--spread': spread,
        }}
      >
        {dotsArray.map((_, i) => (
          <div key={i} className="dot" style={{ '--i': i }}></div>
        ))}
      </div>
    </>
  );
};

export default DotsLoader;
