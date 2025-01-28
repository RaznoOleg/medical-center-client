import { WrapperElement } from './styles';

interface IWrapperProps {
  children: React.ReactNode;
}

const Wrapper = ({ children }: IWrapperProps) => {
  return <WrapperElement>{children}</WrapperElement>;
};
export default Wrapper;
