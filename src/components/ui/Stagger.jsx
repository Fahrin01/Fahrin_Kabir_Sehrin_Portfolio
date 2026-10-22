import { m } from 'framer-motion';

const group = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

// Children wrapped in <StaggerItem> animate in one after another when the group scrolls into view.
export function StaggerGroup({ as = 'div', className = '', children, ...props }) {
  const Tag = m[as];
  return (
    <Tag
      className={className}
      variants={group}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      {...props}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({ as = 'div', className = '', children, ...props }) {
  const Tag = m[as];
  return (
    <Tag className={className} variants={item} {...props}>
      {children}
    </Tag>
  );
}
