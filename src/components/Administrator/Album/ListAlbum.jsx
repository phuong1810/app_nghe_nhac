import React from 'react'
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import { useQuery, gql } from '@apollo/client';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';

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
          const OnDelete = (e) => {
            e.stopPropagation(); // don't select this row after clicking
          }
          return <Button onClick={OnDelete} color="primary" variant="contained" ><DeleteIcon/></Button>;
        }
    },
];
const pullQuery = gql`
    query getMusics {
        getMusics {
            id
            name
            thumbnailUrl
            singer
        }
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

    
    const { loading, error, data } = useQuery(pullQuery);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    var rows = getDateMusic(data);

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
        </div>
      </div>
    )
}
