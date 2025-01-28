import { WrapperElement } from './styles';

interface IWrapperProps {
  children: React.ReactNode;
}

const FormWrapper = ({ children }: IWrapperProps) => {
  return <WrapperElement>{children}</WrapperElement>;
};
export default FormWrapper;
