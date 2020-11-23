import React from 'react'
import { Field,FormikConfig,FormikValues} from 'formik'
import { TextField, CheckboxWithLabel } from 'formik-material-ui'
import { Box} from '@material-ui/core'
import {FormikStep} from './Home'



export interface FormikStepProps extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> { }

const Form1=({children}:FormikStepProps)=>{
    
    return(
        <FormikStep >
            <Box paddingBottom={2}>
                <Field fullWidth name='firstName' type="text" component={TextField} label="First Name" />
            </Box>
            <Box paddingBottom={2}>
                <Field fullWidth name='lastName' type="text" component={TextField} label="Last Name" />
            </Box>
            <Box paddingBottom={2}>
                <Field component={CheckboxWithLabel} type="checkbox" name="ownMobile" Label={{ label: 'Own Mobile' }} />
            </Box>
            <Box paddingBottom={2}>
                <Field fullWidth name='cell' type="number" component={TextField} label="Cell #" />
            </Box>
        </FormikStep>
    )
}
export default Form1