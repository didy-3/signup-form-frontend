import React, {useEffect, useState} from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from "@mui/material/Grid";


const UserDetails = ({nextStep, handleChange, values}) => {
    const showNext = e => {
        e.preventDefault();
        nextStep();
    }

    const [emailIsNotValid, setEmailIsNotValid] = useState(false)

    const emailValidation = () => {
        if (values.email === "")
            return false
        const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
        setEmailIsNotValid(!regEx.test(values.email))
    };

    useEffect(() => {
        emailValidation()
    }, [emailIsNotValid])
    return <form>
        <Grid item xs={12}>
            <TextField
                required
                placeholder="Email Address"
                label="Email Address"
                autoComplete="email"
                fullWidth
                variant="outlined"
                onChange={(e) => {
                    handleChange('email')(e)
                    emailValidation()
                }}
                defaultValue={values.email}
                sx={{
                    borderRadius: "5px",
                    bgcolor: "white"
                }}
                error={emailIsNotValid}
                helperText={emailIsNotValid ? "Email is Not Valid" : ""}
            />
        </Grid>

        <Grid item xs={12}>
            <TextField
                required
                placeholder="Username"
                name="username"
                label="Username"
                //autoComplete="off"
                fullWidth
                variant="outlined"
                onChange={handleChange('username')}
                defaultValue={values.username}
                sx={{
                    borderRadius: "5px",
                    bgcolor: "white"
                }}
            />
        </Grid>

        <Grid item xs={12}>
            <TextField
                required
                placeholder="Password"
                label="Password"
                variant="outlined"
                autoComplete="password"
                fullWidth
                type="password"
                onChange={handleChange('password')}
                defaultValue={values.password}
                sx={{
                    borderRadius: "5px",
                    bgcolor: "white"
                }}
            />
        </Grid>
        <div className={'nav-buttons'}>
            <Button
                onClick={showNext}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                    marginTop: "1em",
                    borderRadius: "5px",
                    maxHeight: "3em",
                }}
            >
                Next
            </Button>
        </div>
    </form>
}

export default UserDetails
