import React from 'react'
import { Formik, FormikConfig, FormikValues, Form } from 'formik'

import { Button, CardContent, Card, Grid} from '@material-ui/core'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel'
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Form1 from './Form1'
import Form2 from './Form2'
import Form3 from './Form3'
import * as Yup from 'yup'

const sleep = (time: number) => new Promise(acc => setTimeout(acc, time))





const initialValues = {
    firstName: '',
    lastName: '',
    ownMobile: false,
    cell: 0,
    email: '',
    password: '',
    confirmPassword: '',
    saySomething: '',

}

const useStyles = makeStyles({
    root: {
        //   minWidth: 575,
        display: 'flex',
        flexDirection: "row",

        justifyContent: "center",
        alignItems: "center",


    },
    card: {
        border: "1px solid black",
        borderRadius: 16
    },

});

const phoneRegExp=/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
export default function Home() {
    const [formValues, setFormValues] = React.useState<FormikValues>(initialValues)
    const classes = useStyles();
    
    return (
        <div>
            <Card>
                <CardContent>

                    <FormikStepper
                        initialValues={initialValues}

                        onSubmit={async (values, { setSubmitting }) => {

                            await sleep(2000)
                            setFormValues(values)

                        }}
                    >


                        <Form1 validationSchema={Yup.object().shape({
                            firstName: Yup.string().required("This is the required Field"),
                            lastName: Yup.string().required("This is the required Field"),
                            cell: Yup.mixed().when('ownMobile', {
                            is: true,
                            then: Yup.string().min(10,"Must be 11 characters").matches(phoneRegExp,"Phone number is not valid"),
                            otherwise: Yup.number().notRequired(),
                            })})}/>

                        <Form2 validationSchema={Yup.object().shape({
                            email: Yup.string().required("This is the Required Field").email(),
                            password: Yup.string().min(5,"Shoud be of 5 characters").required("This is the Required Field"),
                            confirmPassword:Yup.string().oneOf([Yup.ref("password")],"Passwords do no match").required("This is the Required Field"),
                        })}/>

                        <Form3 validationSchema={Yup.object().shape({
                            saySomething: Yup.string().min(5,'Must be greater than 5 Characters').required(),
                            
                        })}/>   


                    </FormikStepper>
                </CardContent>
                {formValues.firstName &&
                    <Card className={classes.root}>
                        <CardContent className={classes.card}>
                            <Typography color="textSecondary" gutterBottom>

                                {formValues.firstName} {formValues.lastName}
                            </Typography>
                            <Typography variant="body2" component="h3" >
                                Says
                </Typography>
                            <Typography variant="h6" component="p">
                                {formValues.saySomething}
                            </Typography>
                        </CardContent>
                    </Card>
                }
            </Card>
        </div>
    )
}
export interface FormikStepProps extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> { }
export function FormikStep({ children }: FormikStepProps) {
    return (
        <>
            { children}
        </>
    )
}
function getSteps() {
    return ['Tell us about Yourself', 'Create Your Account', 'Say Something'];
}
export function FormikStepper({ children, ...props }: FormikConfig<FormikValues>) {
    const childrenArray = React.Children.toArray(children) as React.Component<FormikStepProps>[]
    const [step, setStep] = React.useState(0)
    const [completed, setCompleted] = React.useState(false)
    const currentChild = childrenArray[step] 
    
    const steps = getSteps()

    return (
        <>
            <Stepper activeStep={step} alternativeLabel>
                {steps.map(label => (
                    <Step key={label} completed={completed}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Formik {...props}
                validationSchema={currentChild.props.validationSchema}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={async (values, helpers) => {


                    if (step === childrenArray.length - 1) {
                        await props.onSubmit(values, helpers)
                        setCompleted(true)
                    }
                    else {
                        setStep(s => s + 1)

                    }
                }}>
                {({ isSubmitting }) => (
                    <Form autoComplete="off">
                        {currentChild}

                        <Grid container spacing={2}>

                            {
                                step > 0 ? (
                                    <Grid item>
                                        <Button disabled={isSubmitting} onClick={() => setStep(step - 1)} color="primary" variant="contained">
                                            Back
                        </Button></Grid>)
                                    : null
                            }

                            <Grid item>

                                <Button startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null} disabled={isSubmitting} type='submit' color="primary" variant="contained">
                                    {isSubmitting ? "Please Wait" : step === childrenArray.length - 1 ? "Post" : "Next"}
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </>
    )
}