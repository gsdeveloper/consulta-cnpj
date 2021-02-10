import { ReactNode } from 'react';
import './blue-button.scss';

const BlueButton = ({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) => <button className={`blue-button ${className}`}>{children}</button>;

export default BlueButton;
