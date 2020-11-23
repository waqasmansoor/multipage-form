import React from 'react'
import { Field, FormikConfig,FormikValues} from 'formik'
import { TextField} from 'formik-material-ui'
import {Box} from '@material-ui/core'
import {FormikStep} from './Home'

export interface FormikStepProps extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> { }
const Form3=({children}:FormikStepProps)=>{
    return(
        
        <FormikStep>
            
        <Box paddingBottom={2} paddingTop={5}>
            <Field fullWidth name='saySomething' type="text" component={TextField} label="Say Something to the World" />
        </Box>
    
        
    </FormikStep>
    )
}
export default Form3