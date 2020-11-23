import React from 'react'
import { Field} from 'formik'
import { TextField} from 'formik-material-ui'
import * as Yup from 'yup'
import {Box} from '@material-ui/core'
import {FormikStep} from './Home'


export default function Form3(){
    return(
        
        <FormikStep validationSchema={Yup.object().shape({
            saySomething: Yup.string().min(5,'Must be greater than 5 Characters').required(),
    
        })}>
            
        <Box paddingBottom={2} paddingTop={5}>
            <Field fullWidth name='saySomething' type="text" component={TextField} label="Say Something to the World" />
        </Box>
    
        
    </FormikStep>
    )
}