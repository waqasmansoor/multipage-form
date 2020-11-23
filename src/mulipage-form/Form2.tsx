import React from 'react'
import { Field} from 'formik'
import { TextField} from 'formik-material-ui'
import * as Yup from 'yup'
import { Box} from '@material-ui/core'
import {FormikStep} from './Home'


export default function Form2(){
    return(
        <FormikStep validationSchema={Yup.object().shape({
            email: Yup.string().required("This is the Required Field").email(),
            password: Yup.string().min(5,"Shoud be of 5 characters").required("This is the Required Field"),
            confirmPassword:Yup.string().oneOf([Yup.ref("password")],"Passwords do no match").required("This is the Required Field"),
        })}>
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