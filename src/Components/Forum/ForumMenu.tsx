import { Checkbox, Divider, FormControlLabel, FormGroup, List, ListItem, ListItemText, ListSubheader } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { AdditionalForumCategories } from "../../data/Forum/AdditionalForumCategories";
import { ForumCategory } from "../../data/Forum/ForumCategory";
import useBasicState from "../../data/General/BasicState";

const useStyles = makeStyles((theme) => ({
    subListHeader: {
        textAlign: 'left',
        '@media (max-width: 960px)': {
            textAlign: 'center',
        },
    },
}));

/**
 * The props for the {@link ForumMenu} component.
 */
export interface ForumMenuProps {
    /** All categories. */
    categories: ForumCategory[];
}

/**
 * The forum menu. It is seen in when using any forum component.
 * @param props {@link ForumMenu}
 */
export default function ForumMenu(props: ForumMenuProps) {
    const classes = useStyles();
    const { t } = useBasicState();
    
    const list = { width: '100%', bgcolor: 'background.paper' }
    const subList = { fontSize: '1.5rem', paddingRight: 0 }
    const checkboxLabel = { fontSize: '0.8rem' }
    const checkbox = { fontSize: '0.8rem', color: "rgb(34, 206, 43)", '&.Mui-checked': { color: "rgb(34, 206, 43)" } }
    const listItem = { paddingLeft: '3%', margin: "1%", '@media (max-width: 960px)': { textAlign: 'center' }, '&:hover': { cursor: 'pointer', backgroundColor: "rgb(242, 242, 242)", borderRadius: "5%" } }
    const listItemMainText = { fontSize: '1.3rem' }

    const [checked, setChecked] = useState<boolean>(false);
    const history = useHistory();
    
    return (
        <div>
            <FormGroup>
                <FormControlLabel control={
                    <Checkbox sx={checkbox} checked={checked} onChange={_ => setChecked(!checked)} 
                />} 
                    sx={checkboxLabel}
                    label={t("forum.forumMenu.seeCategoryMeanings")}
                    labelPlacement="start" 
                    disableTypography
                />
            </FormGroup>

            <List sx={list} >
                <ListSubheader component="div" className={classes.subListHeader} sx={subList} >
                    {t("forum.forumMenu.generalSubheader")}
                </ListSubheader>

                {props.categories.slice(0, AdditionalForumCategories.length).map((category: ForumCategory) => (
                    <ListItem key={category.categoryId} sx={listItem} onClick={_ => history.push(`/forum/${category.categoryName}`)} >
                        <ListItemText primary={category.categoryName} sx={listItemMainText} secondary={checked ? category.categoryDescription : null} />
                    </ListItem>
                ))}

                <Divider />

                <ListSubheader component="div" className={classes.subListHeader} sx={subList} >
                    {t("forum.forumMenu.categoriesSubheader")}
                </ListSubheader>

                {props.categories.slice(AdditionalForumCategories.length).map((category: ForumCategory) => (
                    <ListItem key={category.categoryId} sx={listItem} onClick={_ => history.push(`/forum/${category.categoryName}`)} >
                        <ListItemText primary={category.categoryName} sx={listItemMainText} secondary={checked ? category.categoryDescription : null} />
                    </ListItem>
                ))}
            </List>
        </div>
    )
}