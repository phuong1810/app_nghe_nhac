import React, { useState }  from 'react'
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import { useQuery, gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
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


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const Gql_GetMusic = gql`
    query getMusics {
        getMusics {
            id
            name
            thumbnailUrl
            singer
        }
    }
`;

const Gql_DeleteMusic = gql`
  # mutation Mutation($MusicId: String!) {
  #   deleteMusic(MusicId: $MusicId)
  # }
  mutation DeleteMusic($musicId: String!) {
    deleteMusic(musicId: $musicId)
  }
`;

function getDateMusic(data){
    let rows = [];
    if(data.getMusics.length > 0){
        rows = data.getMusics;
    }
    return rows;
}

export default function ListAlbum() {

  const navigate = useNavigate();

  const [deleteMusic] = useMutation(Gql_DeleteMusic, {
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
  const { loading, error, data , refetch} = useQuery(Gql_GetMusic);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  var rows = getDateMusic(data);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      editable: true,
    },
    {
      field: 'singer',
      headerName: 'Singer',
      width: 150,
      editable: true,
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 150,
      editable: true,
      valueGetter: (params) =>
      `${params.getValue(params.id, 'name') || ''} ${
        params.getValue(params.id, 'singer') || ''
      }`,
    },
    {
      width: 200,
      field: "thumbnailUrl",
      headerName: "Image",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <img className="img-responsive" alt="Remy Sharp" src="https://photo-resize-zmp3.zmdcdn.me/w480_r2x3_webp/cover_artist/3/5/a/d/35ad281a468d21a2d0ad5a8d96c62f23.jpg" />
          </>
        );
      }
    },
    {
        field: "edit",
        headerName: "Edit",
        sortable: false,
        renderCell: (params) => {
          const OnEdit = (e) => {
            navigate(`/admin/album/edit/${params.id}`)            
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
        };       
        return <Button onClick={handleClickOpen} color="primary" variant="contained" ><DeleteIcon/></Button>;
      }
    },
  ];

  

  const OnDelete = () => {
    if(deleteId) {
      deleteMusic({ variables: { musicId: deleteId } });
      setDeleteId(null);
      refetch();
    }
  };

  return (
    <div>
      <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
      >
          <h1>Album List</h1>
          <Button color="primary" variant="contained" href="/admin/album/add"><AddIcon/> Add New</Button>
      </Grid>
      <div style={{ height: 600, width: '100%' }}>
      <DataGrid
          rows={rows}
          columns={columns}
          pageSize={15}
          rowsPerPageOptions={[5, 10, 25]}
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
    </div>
  )
}
