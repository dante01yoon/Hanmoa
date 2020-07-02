import { useCallback } from 'react';
import { useDispatch } from 'react-redux'; 
interface IContactFormFields {
  email: string,
  password: string
}
type ISubmitFormType = (e: React.FormEvent<HTMLFormElement>) => void ;

// seems not good place for specific purpose 
const submitContactForm = <T>(params: T): Promise<T> => {
  return new Promise<T>(
    (resolve, _ ) => setTimeout(() => {
      resolve(params); 
    }, 1000)
  );
}

const useContactForm = () => {
  const handleSubmit = useCallback(
    ( formFields : IContactFormFields ) => {
      submitContactForm<IContactFormFields>(formFields).then((params) => {
        console.log(params);
      });
    },[]);

  const initialValues: IContactFormFields = {
    email: "",
    password: "",
  };
  return {
    initialValues,
    handleSubmit,
  }
}

export default useContactForm;