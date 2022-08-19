import React, { useState } from 'react'
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import { useQuery, gql, useMutation} from '@apollo/client';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { useNavigate } from 'react-router-dom';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Gql_GetCategory = gql`
    query getCategories {
        getCategories {
            id
            name
        }
    }
`; 

const Gql_DeleteCategory = gql`
  mutation Mutation($categoryId: String!) {
    deleteCategory(categoryId: $categoryId)
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

  const navigate = useNavigate();
  const [deleteCategory] = useMutation(Gql_DeleteCategory, {
    onCompleted: (data) => {
      alert('Successfully deleted');
    },
    onError: (errorDel) => {
      alert(`Terdapat error saat delete!!!\n${errorDel}`);
    }
  });
  
  const [deleteId, setDeleteId] = useState(null);
  const handleClose = () => {
    setDeleteId(null);
  };

  const OnDelete = () => {
    if(deleteId) {
      deleteCategory({ variables: { categoryId: deleteId } });
      setDeleteId(null);
      refetch();
    }
    // console.log(id)
  };

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
          // e.stopPropagation(); // don't select this row after clicking
          
          navigate(`/admin/category/edit/${params.id}`)
          // window.location.href(`/admin/category/edit/${params.id}`);
          
        }
      
        return <Button onClick={OnEdit} color="primary" variant="contained" ><EditIcon/></Button>;
      }
    },
    {
        field: "delete",
        headerName: "Delete",
        sortable: false,
        renderCell: (params) => {
          const handleClickOpen = () => {
            setDeleteId(params.id);
            // // console.log(params.id)
          };       
          return <Button onClick={handleClickOpen} color="primary" variant="contained" ><DeleteIcon/></Button>;
        }
    },
  ];
    
    const { data, loading, error, refetch } = useQuery(Gql_GetCategory,{fetchPolicy: "no-cache" });
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
        <Dialog
          open={deleteId}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">{"Are you sure delete this?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">                
                Please select the corresponding option
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={OnDelete} color="primary">
                Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
}
