import React, {useCallback, useState} from 'react'
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import ruLocale from 'date-fns/locale/ru';
import {useDropzone} from "react-dropzone";
import '../scss/personalDetails.scss'

const PersonalDetails = ({nextStep, handleChange, values, prevStep}) => {
    const showNext = e => {
        e.preventDefault();
        nextStep();
    }
    const showPrev = e => {
        e.preventDefault();
        prevStep();
    }

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
                // Do whatever you want with the file contents
                handleChange('avatar')(reader.result)
                setAvatarInput(<img src={reader.result} style={{width: "50px", height: "50px"}}/>)
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const {getRootProps, getInputProps} = useDropzone({onDrop})

    const [avatarInput, setAvatarInput] = useState(<div {...getRootProps({className: 'drop-zone'})}>
            <input {...getInputProps()} accept=".las"/>
            Drag avatar image here or choose one on click
        </div>
    );

    return <form>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                    required
                    placeholder="First name"
                    label="First name"
                    autoComplete="firstName"
                    fullWidth
                    variant="outlined"
                    onChange={handleChange('firstName')}
                    defaultValue={values.firstName}
                    sx={{
                        borderRadius: "5px",
                        bgcolor: "white"
                    }}
                />
            </Grid>

            <Grid item xs={12}>
                <TextField
                    required
                    placeholder="Last name"
                    label="Last name"
                    autoComplete="lastName"
                    fullWidth
                    variant="outlined"
                    onChange={handleChange('lastName')}
                    defaultValue={values.lastName}
                    sx={{
                        borderRadius: "5px",
                        bgcolor: "white"
                    }}
                />
            </Grid>

            <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
                    <DatePicker
                        mask={'__.__.____'}
                        label="Birthday"
                        value={values.birthday}
                        onChange={handleChange('birthday')}
                        renderInput={(params) =>
                            <TextField {...params}
                                       required
                                       placeholder="Birthday"
                                       label="Birthday"
                                       autoComplete="birthday"
                                       fullWidth
                                       variant="outlined"
                                       sx={{
                                           borderRadius: "5px",
                                           bgcolor: "white"
                                       }}
                            />}
                    />
                </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
                {avatarInput}
            </Grid>
        </Grid>

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
export default PersonalDetails