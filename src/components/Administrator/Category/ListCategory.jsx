import React from 'react'
import { DataGrid } from '@material-ui/data-grid';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useQuery, gql, useMutation } from '@apollo/client';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { useNavigate } from 'react-router-dom';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});


const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      editable: true,
    },
    
    {
        field: "edit",
        headerName: "Edit",
        sortable: false,
        renderCell: (params) => {
          const OnEdit = (e) => {
            e.stopPropagation(); // don't select this row after clicking
          }
           
          return <Button onClick={OnEdit} color="primary" variant="contained" ><EditIcon/></Button>;
        }
    },
    {
        field: "delete",
        headerName: "Delete",
        sortable: false,
        renderCell: (params) => {
          const OnDelete = () =>{
            const [open, setOpen] = React.useState(false);
            setOpen(true);
            
          }
          return <Button onClick={OnDelete} color="primary" variant="contained" ><DeleteIcon/></Button>;
        }
    },
];
const Gql_GetCategory = gql`
    query getCategories {
        getCategories {
            id
            name
        }
    }
`; 

const Gql_DeleteCategory = gql`
  mutation DeleteCategory($categoryId: String!) {
    deleteCategory(
      categoryId: $categoryId
    )
  }
`;
function getDataCategory(data){
    let rows = [];
    if(data.getCategories.length > 0){
        rows = data.getCategories;
    }
    return rows;
}
export default function ListCategory() {

    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
      setOpen(false);
    };

    const { loading, error, data } = useQuery(Gql_GetCategory);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    var rows = getDataCategory(data);

    return (
        <div style={{ height: 700, width: '100%' }}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
        >
            <h1>List Category</h1>
            <Button color="primary" variant="contained" href="/admin/category/add"><AddIcon/> Add New</Button>
        </Grid>
        <DataGrid
            rows={rows}
            columns={columns}
            pageSize={15}
            checkboxSelection
            disableSelectionOnClick
        />
         <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Modal title
          </DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
              in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            </Typography>
            <Typography gutterBottom>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
              lacus vel augue laoreet rutrum faucibus dolor auctor.
            </Typography>
            <Typography gutterBottom>
              Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
              scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
              auctor fringilla.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
              Save changes
            </Button>
          </DialogActions>
        </Dialog>
        
        </div>
    )
}
