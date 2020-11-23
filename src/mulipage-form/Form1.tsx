import React from 'react'
import { Field} from 'formik'
import { TextField, CheckboxWithLabel } from 'formik-material-ui'
import * as Yup from 'yup'
import { Box} from '@material-ui/core'
import {FormikStep} from './Home'

const phoneRegExp=/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
export default function Form1(){
    return(
        <FormikStep validationSchema={Yup.object().shape({
            firstName: Yup.string().required("This is the required Field"),
            lastName: Yup.string().required("This is the required Field"),
            cell: Yup.mixed().when('ownMobile', {
                is: true,
                then: Yup.string().min(10,"Must be 11 characters").matches(phoneRegExp,"Phone number is not valid"),
                otherwise: Yup.number().notRequired(),
        })})}>
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