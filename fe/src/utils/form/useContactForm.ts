import { useCallback } from 'react';
import { useDispatch } from 'react-redux'; 
interface IContactFormFields {
  email: string,
  password: string
}
type ISubmitFormType = (e: React.FormEvent<HTMLFormElement>) => Promise<void> ;

// seems not good place for specific purpose 
const submitContactForm = (params: IContactFormFields): ISubmitFormType => {
  return ( e: React.FormEvent<HTMLFormElement> ) => {
     e.preventDefault();
     return new Promise<void>(
      (resolve, _ ) => setTimeout(() => {
        console.log(params); 
      }, 1000)
    );
  }
}

const useContactForm = () => {
  const handleSubmit = useCallback(
    ( formFields : IContactFormFields ) => {
      return submitContactForm(formFields).then(() => {
        console.log('form submitted');
      })
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