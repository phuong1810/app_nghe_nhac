import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useMutation, gql, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../../../util/hooks';
// import { Upload } from "./UploadImage/Upload";
// import { Files } from "./UploadImage/Files";

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

const Gql_CreateMusic = gql`
    mutation createMusic(
        $name: String!
        $singer: String
        $thumbnailUrl: String
        $status: String
        $category: String
    ) {
        createMusic(
            musicInput: {
                name: $name
                singer: $singer
                thumbnailUrl: $thumbnailUrl
                status: $status
                category: $category
            }
        ) {
            id name singer thumbnailUrl status category
        }
    }
`;


export default function AddAlbum() {
    
    const classes = useStyles();
    
    const [errors, setErrors] = useState({}); 
    //imgur
    
    const onFileChange = async (event) => {
        
        console.log("event",event);

         // Client ID
        const clientId = "3950dc3bf81e709",
        auth = "Client-ID " + clientId;
        
        const formData = new FormData();

        formData.append("image",  event.target.files[0]);
        try {
            let rep = await fetch("https://api.imgur.com/3/image/", {
                method: "POST", // HTTP Method
                body: formData, // Data to be sent
                contentType: "application/json",
                headers: {
                // Setting header
                    Authorization: auth,
                    Accept: "application/json",
                },
            });
            let datarep  = null;
            if(rep) {
                datarep = await rep.json();
            }
            if(datarep) {
                console.log(datarep.data);
                setDataForms({...values, thumbnailUrl : datarep.data.link});
            }
        }
        catch (errors) {
            console.log(errors);
        }
       
            
    };
    //end
    const initialState = {
        name: '',
        singer: '',
        thumbnailUrl: '',
        category: '',
    };


    const { onChange, onSubmit, values, setValues : setDataForms } = useForm(createAlbum, {
        name: '',
        singer: '',
        thumbnailUrl: '',
        category: '',
    });

    let navigate = useNavigate();

    const [addAlbum, { loading }] =  useMutation(Gql_CreateMusic, {
        update: (_, __) => navigate('/admin/album'),
        onError(err) {
            console.log(err.graphQLErrors.length);
            if (err.graphQLErrors.length > 0) {
                setErrors(err.graphQLErrors[0].extensions.errors);
            }
        },
        variables: values
    });

    function createAlbum() {
        console.log(values)
        addAlbum();
    }

    function parserData(data) {
        let rows = [];
        if (data) {
            rows = data.getCategories;
        }
        return rows;
    }
    const { data } = useQuery(Gql_GetCategory);

    const categoryList = parserData(data);

    return (
        <div>           
            <form onSubmit={ onSubmit } className={classes.form} noValidate>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <h1>Add New Song</h1>
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
                                label="Song Name"
                                autoFocus
                                onChange={ onChange }
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
                                label="Singer Name"
                                autoFocus
                                onChange={ onChange }

                            />
                        </Grid>
                        
                        <Grid className={classes.inputMargin} item xs={12}>
                            <TextField
                                autoComplete="urlthumbnail"
                                name="thumbnailUrl"
                                variant="outlined"
                                required
                                fullWidth
                                id="thumbnailUrl"
                                label="Url Thumbnail"
                                onChange={ onChange }
                                autoFocus
                                value={values.thumbnailUrl}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <FormControl xs={12} variant="filled" className={classes.formControl}>
                        <InputLabel htmlFor="filled-age-native-simple">Category</InputLabel>
                        <Select
                            name ="category"
                            onChange={ onChange }
                            >
                            <option aria-label="None" value="" />
                            {categoryList.map(category => (
                                <option key={category.id}  value={category.name}>{category.name}</option>
                            ))}
                        </Select>
                        <input type="file" onChange={onFileChange} />
                        {/* <Upload/>
                        <Files/> */}
                    </FormControl>
                    </Grid>                    
                </Grid>
            </form>
        </div>
    )
}

