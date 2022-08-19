import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useMutation, gql,useQuery } from '@apollo/client';
import { useForm } from '../../../../util/hooks';
import { useParams, useNavigate } from 'react-router-dom';

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


const Gql_GetCategory = gql`
    query getCategories {
        getCategories {
            id
            name
        }
    }
`; 

const Gql_UpdateMusic = gql`
    mutation UpdateMusic($id: String!, $name: String!, $singer:String, $thumbnailUrl:String, $status:String, $category:String) {
        updateMusic(id: $id, name: $name, singer:$singer, thumbnailUrl: $thumbnailUrl, status:$status, category:$category) {
            id, name, singer, thumbnailUrl, status, category
        }
    }
    
`;

const Gql_GetMusicById = gql`
   query getMusicById($id: String) {
    getMusicById(id: $id) {
      id, name, singer, thumbnailUrl, status, category
    }
}`; 

export default function AddAlbum() {

    const classes = useStyles();
    
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});  

    const { id } = useParams();
    // console.log(id);
    const { data } = useQuery(Gql_GetMusicById, { variables: { id: id } });

    // console.log(data)
    
    function editMusic() {
        updateMusic();
    }
    const { onChange, onSubmit, values } = useForm(editMusic, {
        id,
        name: data?.getMusicById.name,
        singer: data?.getMusicById.singer,
        thumbnailUrl: data?.getMusicById.thumbnailUrl,
        status: data?.getMusicById.status,
        category: data?.getMusicById.category,
    });

    const [updateMusic, { loading }] =  useMutation(Gql_UpdateMusic, {
        update: (_, __) => navigate('/admin/album'),
        variables: {id : id , name : values.name, singer:values.singer, thumbnailUrl:values.thumbnailUrl, category:values.category, status:values.status},
    });

    function parserData(data) {
        let rows = [];
        if (data) {
            rows = data.getCategories;
        }
        return rows;
    }
    const { data : datacategories } = useQuery(Gql_GetCategory);

    const categoryList = parserData(datacategories);

    return (
       
        <div>           
            <form onSubmit={ onSubmit } className={classes.form} noValidate>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    >
                    <h1>Edit Song</h1>
                    <Button type="submit" color="primary" variant="contained"><SaveIcon/> Save</Button>
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
                                autoFocus
                                onChange={ onChange }
                                value={values?.name ?? data?.getMusicById.name}
                            />
                        </Grid>
                    
                        <Grid className={classes.inputMargin} item xs={12}>
                            <TextField
                                autoComplete="singer"
                                name="singer"
                                variant="outlined"
                                required
                                fullWidth
                                id="singer"
                                value={values?.singer ?? data?.getMusicById.singer}
                                autoFocus
                            />
                        </Grid>
                        <FormControl xs={12} variant="filled" className={classes.formControl}>
                            <InputLabel htmlFor="filled-age-native-simple">{values?.status ?? data?.getMusicById.status} </InputLabel>
                            <Select
                                name ="status"
                                onChange={ onChange }
                                >
                                <option value={values?.status ?? data?.getMusicById.status} />
                                <option value="Active">Active</option>
                                <option value="Pending">Pending</option>
                                <option value="Rejected or invalid">Rejected or invalid</option>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <FormControl xs={12} variant="filled" className={classes.formControl}>
                        <InputLabel htmlFor="filled-age-native-simple">{values?.category ?? data?.getMusicById.category} </InputLabel>
                        <Select
                            name ="category"
                            onChange={ onChange }
                            >
                            <option value={values?.category ?? data?.getMusicById.category} />
                            {categoryList.map(category => (
                                <option key={category.id}  value={category.name}>{category.name}</option>
                            ))}
                        </Select>
                        <h3>Current Image</h3>
                        <Grid className={classes.inputMargin} item xs={12}>
                            <TextField
                                autoComplete="thumbnailUrl"
                                name="thumbnailUrl"
                                variant="outlined"
                                required
                                fullWidth
                                id="thumbnailUrl"
                                autoFocus
                                value={values?.thumbnailUrl ?? data?.getMusicById.thumbnailUrl}
                            />
                        </Grid>
                        <img className='img-responsive--v2' style={{maxHeight:'250px'}} src={values?.thumbnailUrl ?? data?.getMusicById.thumbnailUrl}/>
                    </FormControl>
                    </Grid>                    
                </Grid>
            </form>
        </div>
    )
}

