import React from 'react'
import { Field,FormikConfig,FormikValues} from 'formik'
import { TextField} from 'formik-material-ui'
import { Box} from '@material-ui/core'
import {FormikStep} from './Home'

export interface FormikStepProps extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> { }
const Form2=({children}:FormikStepProps)=>{
    return(
        <FormikStep>
            <Box paddingBottom={2}>
                <Field fullWidth name='email' type='email' component={TextField} label="Email" />
            </Box>
            <Box paddingBottom={2}>
                <Field fullWidth name='password' type="password" component={TextField} label="Password" />
            </Box>
            <Box paddingBottom={2}>
                <Field fullWidth name='confirmPassword' type="password" component={TextField} label="Confirm Password" />
            </Box>
        </FormikStep>
    )
}
export default Form2