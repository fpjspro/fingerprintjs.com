import { useContext } from 'react'
import FormContext, { Forms, UPDATE_ERROR_MESSAGE, UPDATE_FORM_STATE } from '../context/FormContext'
import { FormState } from '../types/FormState'

export default function useForm(formId: Forms) {
  const { state, dispatch } = useContext(FormContext)

  const updateFormState = (formState: FormState) => {
    dispatch({ type: UPDATE_FORM_STATE, payload: { formId, formState } })
  }

  const updateErrorMessage = (errorMessage: string) => {
    dispatch({ type: UPDATE_ERROR_MESSAGE, payload: { formId, errorMessage } })
  }

  return {
    formState: state[formId]?.formState,
    errorMessage: state[formId]?.errorMessage,
    updateFormState,
    updateErrorMessage,
  }
}
