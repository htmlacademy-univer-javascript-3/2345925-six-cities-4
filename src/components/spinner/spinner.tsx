import { FC, useEffect, useRef } from 'react';
import './spinner.css';

export interface SpinnerProps {
    sizeInPixels: number;
}

const BORDER_FRACTION = 10;
const ROTATE_SPEED = 10;

const Spinner: FC<SpinnerProps> = ({sizeInPixels}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    let angle = 0;

    const rotate = () => {
      angle = (angle + 2) % 360;
      if(element){
        element.style.transform = `rotate(${angle}deg)`;
      }
    };

    const intervalId = setInterval(rotate, ROTATE_SPEED);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className='spinner-wrapper'
    >
      <div ref={ref} className="spinner" style={{
        width: `${sizeInPixels}px`,
        height: `${sizeInPixels}px`,
        borderWidth: `${sizeInPixels / BORDER_FRACTION}px`
      }}
      >
      </div>
    </div>);
};

export default Spinner;
