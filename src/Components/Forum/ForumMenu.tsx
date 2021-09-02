import { Checkbox, Divider, FormControlLabel, FormGroup, List, ListItem, ListItemText, ListSubheader } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useState } from "react";
import { ForumCategory } from "../../data/Forum/ForumCategory";

import "./css/ForumMenu.css"

const useStyles = makeStyles((theme) => ({
    subListHeader: {
        textAlign: 'left',
    },
}));

interface ForumMenuprops {
    categories: ForumCategory[];
}

export default function ForumMenu(props: ForumMenuprops) {
    const classes = useStyles();
    const list = { width: '100%', bgcolor: 'background.paper' }
    const subList = { fontSize: '1.5rem' }
    const listItem = { padding: 0 }
    const checkboxLabel = { fontSize: '0.8rem' }
    const checkbox = { fontSize: '0.8rem', color: "rgb(34, 206, 43)", '&.Mui-checked': { color: "rgb(34, 206, 43)" } }

    const [checked, setChecked] = useState<boolean>(false);

    return (
        <div>
            <FormGroup>
                <FormControlLabel control={<Checkbox sx={checkbox} checked={checked} onChange={_ => setChecked(!checked)} />} 
                    sx={checkboxLabel}
                    label="See list meanings" 
                    labelPlacement="start" 
                />
            </FormGroup>

            <List sx={list} >
                <ListSubheader component="div" className={classes.subListHeader} sx={subList} >
                    General
                </ListSubheader>

                <ListItem disablePadding sx={listItem} >
                    <ListItemText primary="Newest Threads" secondary={checked ? "See the newest threads" : null} />
                </ListItem>

                <ListItem disablePadding sx={listItem} >
                    <ListItemText primary="Search" secondary={checked ? "Search threads from the forum" : null} />
                </ListItem>

                <Divider />

                <ListSubheader component="div" className={classes.subListHeader} sx={subList} >
                    Categories
                </ListSubheader>

                {props.categories.map((category: ForumCategory) => (
                    <ListItem key={category.categoryId} sx={listItem} >
                        <ListItemText primary={category.categoryName} secondary={checked ? category.categoryDescription : null} />
                    </ListItem>
                ))}
            </List>
        </div>
    )
}