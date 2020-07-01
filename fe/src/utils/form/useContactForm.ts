import { useCallback } from 'react';

interface ContactFormFields {
  email: string,
  password: string
}

const useContactForm = () => {
  const handleSubmit = useCallback(
    ( formFields : ContactFormFields ) => {
      return submitForm(formFields).then(() => {
        console.log('form submitted');
      })
    },[]);

  const initialValues: ContactFormFields = {
    email: "",
    password: "",
  };
  return {
    handleSubmit,
    initialValues,
  }
}

export default useContactForm;