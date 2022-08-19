import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { useQuery, gql, useMutation} from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../../../util/hooks';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    inputMargin: {
        marginBottom: theme.spacing(2),
    },
    formControl: {
        width: '100%',
    },
  }));
const Gql_UpdateCategory = gql`
    mutation UpdateCategory($id: String!, $name: String!) {
        updateCategory(id: $id, name: $name) {
            id, name
        }
    }
`;
const Gql_GetCategoryById = gql`
   query GetCategoriesById($id: String) {
    getCategoriesById(id: $id) {
      id, name
    }
  }`; 
    

export default function EditCategory() {
    
    const classes = useStyles();
    const { id } = useParams();
    const navigate = useNavigate();
    console.log(id);
    const { data, error } = useQuery(Gql_GetCategoryById, { variables: { id: id } });

    function editCategory() {
        updateCategory();
    }
    const { onChange, onSubmit, values } = useForm(editCategory, {
        id,
        name: data?.getCategoriesById.name,
    });

    const [updateCategory, { loading }] =  useMutation(Gql_UpdateCategory, {
        update: (_, __) => navigate('/admin/category'),
        variables: {id : id , name : values.name },
    });

    return (
        <div>          
            <form onSubmit={ onSubmit } className={classes.form} noValidate>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <h1>Edit New Category</h1>
                    <Button color="primary" variant="contained" type="submit"><SaveIcon/> Save</Button>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Grid className={classes.inputMargin} item xs={12}>
                            <TextField
                                autoComplete="name"
                                name="name"
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Category Name"
                                autoFocus
                                onChange={ onChange }
                                value={values?.name ?? data?.getCategoriesById.name}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}

