import React from 'react'
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import '../scss/success.scss'
import Avatar from "@mui/material/Avatar";
import {v4 as uuidv4} from "uuid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";

const Success = ({nextStep, handleChange, values, prevStep}) => {
    const {email, username, firstName, lastName, birthday, avatar, interests} = values
    const showPrev = e => {
        e.preventDefault();
        prevStep();
    }
    return <div className={'success-form'}>

        <List className={"success-list"}>
            <ListItem className={"success-list-item"}>
                <ListItemText primary={email} secondary="Email" className={"success-list-text"}/>
            </ListItem>
            <ListItem className={"success-list-item"}>
                <ListItemText primary={username} secondary="Username" className={"success-list-text"}/>
            </ListItem>
            <ListItem className={"success-list-item"}>
                <ListItemText primary={firstName} secondary="First Name" className={"success-list-text"}/>
            </ListItem>
            <ListItem className={"success-list-item"}>
                <ListItemText primary={lastName} secondary="Last Name" className={"success-list-text"}/>
            </ListItem>
            <ListItem className={"success-list-item"}>
                <ListItemText primary={birthday} secondary="Birthday" className={"success-list-text"}/>
            </ListItem>

            <Grid container spacing={2} style={{margin: 0}}>
                {values.interests.map(it => {
                    if (it.checked)
                        return <Grid item xs={6} key={uuidv4()} style={{margin: 0, paddingLeft: 0}}>
                            <div className={"interest-label"}>
                                <img className={"interest-icon"}
                                     src={it.img ? require(`../img/${it.img}`) : it.base64img} width="50px"
                                     height="auto" alt={''}/>
                                <p className={"interest-name"}>{it.name}</p>
                            </div>
                        </Grid>
                })}
            </Grid>


        </List>
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
        </div>

    </div>
}
export default Success
