/* eslint-disable @next/next/no-img-element */
import clsx from 'clsx';
import * as React from 'react';

type ImageProps = {
  useSkeleton?: boolean;
  imgClassName?: string;
  blurClassName?: string;
  alt: string;
  width: string | number;
  height: string | number;
  className?: string;
  src: string;
  onClick?: () => void;
  onLoad?: () => void;
};

/**
 * @description Must set width using `w-` className
 */
const Image: React.FC<ImageProps> = ({
  src,
  width,
  height,
  alt,
  className,
  imgClassName,
  onClick,
  onLoad,
}) => {
  const widthIsSet = className?.includes('w-') ?? false;

  return (
    <figure
      style={!widthIsSet ? { width: `${width}px` } : undefined}
      className={className}
    >
      <img
        className={clsx(
          'm-auto max-h-full min-h-full min-w-full max-w-full',
          imgClassName
        )}
        src={src}
        width={width}
        height={height}
        alt={alt}
        sizes='100vw'
        onClick={onClick}
        onLoad={onLoad}
      />
    </figure>
  );
};

export default Image;
