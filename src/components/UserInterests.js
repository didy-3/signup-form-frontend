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


    return <form>
        <Grid item xs={12}>
            <p>Select your interests:</p>
        </Grid>
        <div className={"wrapper"}>
            {values.interests.map(it => {
                return <div className={'interest-item'}>
                    <FormControlLabel
                        sx={{
                            margin: 0,
                            padding: 0,
                        }}
                        key={it.name}
                        className={"interest-checkbox-container"}
                        labelPlacement="start"
                        control={
                            <Checkbox defaultChecked={it.checked}
                                      className={"interest-checkbox"}
                                      onChange={(e) => {
                                          it.checked = e.target.checked
                                          console.log(values)

                                      }}
                                      sx={{padding: 0, margin: 0, gridArea: "1/2/1/2"}}
                            />
                        }
                        label={
                            <Grid className={"interest-label"} sx={{fontSize: "14px"}}>
                                <img className={"interest-icon"}
                                     src={it.img ? require(`../img/${it.img}`) : it.base64img} width="40px"
                                     height="auto" alt={''}/>
                                <p className={"interest-name"}>{it.name}</p>
                            </Grid>
                        }
                    />
                </div>

            })}
        </div>

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
export default UserInterests