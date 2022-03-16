import React from 'react'
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import '../scss/userInterests.scss'
import {v4 as uuidv4} from 'uuid';

const UserInterests = ({nextStep, values, prevStep}) => {

    const showNext = e => {
        e.preventDefault();
        nextStep();
    }
    const showPrev = e => {
        e.preventDefault();
        prevStep();
    }


    return <form
        style={{marginTop: "2em", marginBottom: "2em"}}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <p>Select your interests:</p>
            </Grid>
            <FormGroup className={"interest-container"}>
                <Grid container spacing={2} style={{margin: 0}}>
                    {values.interests.map(it => {
                        return <Grid item xs={6} key={uuidv4()} style={{margin: 0, paddingLeft: 0}}>
                            <FormControlLabel
                                key={it.name}
                                sx={{m: 0, width: "200px",}}
                                className={"interest-checkbox-container"}
                                labelPlacement="start"
                                control={
                                    <Checkbox defaultChecked={it.checked}
                                              className={"interest-checkbox"}
                                              onChange={(e) => {
                                                  it.checked = e.target.checked
                                                  console.log(values)

                                              }}/>
                                }
                                label={
                                    <div className={"interest-label"}>
                                        <img className={"interest-icon"}
                                             src={it.img ? require(`../img/${it.img}`) : it.base64img} width="50px"
                                             height="auto" alt={''}/>
                                        <p className={"interest-name"}>{it.name}</p>
                                    </div>
                                }
                            />
                        </Grid>
                    })}
                </Grid>
            </FormGroup>
        </Grid>

        <Grid container spacing={2} sx={{alignContent:"end"}}>
            <Grid item xs={6}>
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
            </Grid>

            <Grid item xs={6}>
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
            </Grid>
        </Grid>

    </form>
}
export default UserInterests