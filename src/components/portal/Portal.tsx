import { createPortal } from 'react-dom';

type Props = {
  key?: Parameters<typeof createPortal>[2];
  children: Parameters<typeof createPortal>[0];
  container: Parameters<typeof createPortal>[1];
};

const Portal = ({ key, children, container }: Props) => {
  return createPortal(children, container, key);
};

export default Portal;
