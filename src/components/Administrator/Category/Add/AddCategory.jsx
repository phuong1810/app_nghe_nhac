import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../../../until/hooks';


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
export default function AddAlbum() {

    const classes = useStyles();

    const [errors, setErrors] = useState({});  

    const { onChange, onSubmit, values } = useForm(createCategory, {
        name: '',
    });


    let navigate = useNavigate();

    const [addCategory, { loading }] =  useMutation(Gql_CreateCategory, {
        update: (_, __) => navigate('/admin/category'),
        onError(err) {
            console.log(err.graphQLErrors.length);
            if (err.graphQLErrors.length > 0) {
                setErrors(err.graphQLErrors[0].extensions.errors);
            }
        },
        variables: values
    });

    function createCategory() {
        addCategory();
    }

    return (
        <div>          
            <form onSubmit={ onSubmit } className={classes.form} noValidate>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <h1>Add New Category</h1>
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
                                value={values.name}
                                error={errors.name ? true : false}
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
const Gql_CreateCategory = gql`
    mutation CreateCategory(
        $name: String!
    ) {
        createCategory(name: $name) {
            id
        }
    }
`;
