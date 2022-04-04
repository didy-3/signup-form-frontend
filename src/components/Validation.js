import React, {useState} from 'react'
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {sentCodeToEmail} from "../services/apiCallerMock";
import Typography from "@mui/material/Typography";


const Validation = ({prevStep, nextStep, handleChange, values}) => {

    const [code, setCode] = useState('')
    const [userCode, setUserCode] = useState(false)

    const showNext = e => {
        e.preventDefault();
        nextStep();
    }
    const showPrev = e => {
        e.preventDefault();
        prevStep();
    }

    function checkUserCode(e) {
        e.preventDefault()
        const regEx = /[a-zA-Z]{2}[1-4]\d[a-zA-Z]{2}[5-9]\d?/g
        setUserCode(!regEx.test(e.target.value))
        if (!userCode) {
            handleChange('valid')(userCode)
        }
    }

    const selectRender = () => {
        if (values.valid) {
            return <Typography component="h1" variant="h5">Code is valid!</Typography>
        } else if (code === '') {
            return <>
                <Button
                    onClick={() => {
                        sentCodeToEmail(values.email)
                        setCode("sent")
                    }}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{
                        marginTop: "1em",
                        borderRadius: "5px",
                    }}
                >
                    Sent validation code to email
                </Button>
            </>
        } else {
            return <>
                <p>Code was sent to {values.email}</p>
                <Button
                    onClick={() => {
                        sentCodeToEmail(values.email)
                        setCode("sent")
                    }}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{
                        marginTop: "1em",
                        borderRadius: "5px",
                    }}
                >
                    Sent again
                </Button>
                <TextField
                    required
                    placeholder="Enter code here"
                    onChange={checkUserCode}
                    autoComplete="off"
                    fullWidth
                    variant="outlined"
                    sx={{
                        marginTop: "1em",
                        borderRadius: "5px",
                        bgcolor: "white",

                        height: "40%"
                    }}
                    error={userCode}
                    helperText={userCode && "Code is Not Valid" }
                    FormHelperTextProps={{
                    sx:{
                        height: '70px'
                    }
                    }}
                />
            </>
        }
    }
    return <form>

        {selectRender()}

        <div className={'nav-buttons'}>
            <Button
                onClick={showPrev}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                    marginTop: "1em",
                    borderRadius: "5px",
                }}
            >
                Back
            </Button>

            <Button
                onClick={showNext}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                    marginTop: "1em",
                    borderRadius: "5px",
                }}
            >
                Next
            </Button>

        </div>
    </form>
}

export default Validation