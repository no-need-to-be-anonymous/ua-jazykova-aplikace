import React, { ImgHTMLAttributes } from 'react';

const storage: Record<string, Promise<string> | string> = {};

const load = (src: string) => {
  console.log(`loading ${src}`);
  const promise = new Promise<string>((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      resolve(src);
    };
    image.onerror = () => {
      reject({ message: `image ${src} loading error` });
    };
    image.src = src;
  })
    .then((src) => (storage[src] = src))
    .catch((error) => (storage[src] = error.message));

  storage[src] = promise;
  return promise;
};

const getImage = (src: string) => {
  if (!storage.hasOwnProperty(src)) throw load(src);
  if (storage[src] instanceof Promise) throw storage[src];
  return storage[src];
};

const ImageSuspense = ({ src, ...rest }: { src: string } & ImgHTMLAttributes<HTMLImageElement>) => {
  getImage(src);
  return <img src={src} {...rest} />;
};

export default ImageSuspense;
