import React, {Component} from 'react'
import UserInterests from "./UserInterests";
import Success from "./Success";
import PersonalDetails from "./PersonalDetails";
import UserDetails from "./UserDetails";
import Container from "@mui/material/Container";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Grid from "@mui/material/Grid";
import {getInterests} from "../services/apiCallerMock";
import Validation from "./Validation";

export default class SignUp extends Component {
    state = {
        step: 1,
        email: '',
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        birthday: '',
        avatar: '',
        interests: {},
        valid: false
    }

    prevStep = () => {
        const {step} = this.state;
        this.setState({step: step - 1});
    }
    nextStep = () => {
        const {step} = this.state;
        this.setState({step: step + 1});
    }
    handleChange = input => e => {
        if (input === 'birthday') {
            this.setState({[input]: new Date(e).toLocaleDateString('ru-RU')});
        }else if (input === 'avatar' || input === 'valid') {
            this.setState({[input]: e});
        } else {
            this.setState({[input]: e.target.value});
        }
        console.log(this.state)
    }

    componentDidMount() {
        getInterests((args) => {
            this.setState({interests: args})
            let tempInterests = this.state.interests
            tempInterests.forEach(it => (it.checked === undefined) && (it.checked = false))
            this.setState({interests: tempInterests})
        })
    }

    render() {
        const {email, username, password, firstName, lastName, birthday, avatar, interests,valid} = this.state;
        const values = {email, username, password, firstName, lastName, birthday, avatar, interests,valid}
        const theme = createTheme();
        const steps = [
            'Basic info',
            'Personal details',
            'Your interests',
            'Verification',
            'Completed'
        ];

        const selectRender = (step) => {
            switch (step) {
                case 1:
                    return (
                        <UserDetails
                            nextStep={this.nextStep}
                            handleChange={this.handleChange}
                            values={values}
                        />
                    )
                case 2:
                    return (
                        <PersonalDetails
                            nextStep={this.nextStep}
                            prevStep={this.prevStep}
                            handleChange={this.handleChange}
                            values={values}
                        />
                    )
                case 3:
                    return (
                        <UserInterests
                            nextStep={this.nextStep}
                            prevStep={this.prevStep}
                            values={values}
                        />
                    )
                case 4:
                    return (
                        <Validation
                            prevStep={this.prevStep}
                            nextStep={this.nextStep}
                            handleChange={this.handleChange}
                            values={values}
                        />
                    )
                case 5:
                    return (
                        <Success
                            values={values}
                            prevStep={this.prevStep}/>
                    )
                default:
                // do nothing
            }
        }
        return <div>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <Grid
                        sx={{
                            marginTop: 10,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{m: 1, bgcolor: 'purple'}} src={this.state.avatar}/>
                        <Typography component="h1" variant="h5">
                            Sign Up
                        </Typography>
                        {selectRender(this.state.step)}
                    </Grid>
                </Container>
                <Container component="main" maxWidth="xs">
                    <Grid sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <Stepper activeStep={this.state.step - 1} alternativeLabel>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Grid>
                </Container>
            </ThemeProvider>
        </div>
    }
}
