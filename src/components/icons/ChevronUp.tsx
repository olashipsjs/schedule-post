import type { SVGProps } from 'react';

export function ChevronUp(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={512}
      height={512}
      viewBox='0 0 512 512'
      {...props}
    >
      <path
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={48}
        d='m112 328l144-144l144 144'
      ></path>
    </svg>
  );
}
