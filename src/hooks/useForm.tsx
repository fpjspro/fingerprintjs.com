import React, { createContext, Dispatch, Reducer, ReducerAction, useReducer, useContext, useCallback } from 'react'
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
    formState: state[formId]?.formState ?? FormState.Default,
    errorMessage: state[formId]?.errorMessage,
    updateFormState,
    updateErrorMessage,
  }
}

export const UPDATE_FORM_STATE = 'UPDATE_FORM_STATE'
export const UPDATE_ERROR_MESSAGE = 'UPDATE_ERROR_MESSAGE'

export enum Forms {
  Signup,
  ContactSales,
}

interface GetStartedFormData {
  formState: FormState
  errorMessage?: string
}

type FormsState = Partial<{ [key in Forms]: GetStartedFormData }>
type FormsReducer = Reducer<FormsState, Action>
type FormContextType = {
  state: FormsState
  dispatch: Dispatch<ReducerAction<FormsReducer>>
}

type Action =
  | {
      type: typeof UPDATE_FORM_STATE
      payload: { formId: Forms; formState: FormState }
    }
  | { type: typeof UPDATE_ERROR_MESSAGE; payload: { formId: Forms; errorMessage: string } }

const reducer: FormsReducer = (state: FormsState, action: Action) => {
  switch (action.type) {
    case UPDATE_FORM_STATE:
      return {
        ...state,
        [action.payload.formId]: { ...state[action.payload.formId], formState: action.payload.formState },
      }
    case UPDATE_ERROR_MESSAGE:
      return {
        ...state,
        [action.payload.formId]: { ...state[action.payload.formId], errorMessage: action.payload.errorMessage },
      }
    default:
      return state
  }
}

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {})
  const contextValue = {
    state,
    dispatch,
  }

  return <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
}

const FormContext = createContext<FormContextType>({
  state: {},
  dispatch: () => {
    // noop
  },
})
