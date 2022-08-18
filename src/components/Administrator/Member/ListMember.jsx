import React from 'react'
import { DataGrid } from '@material-ui/data-grid';
import { useQuery, gql } from '@apollo/client';
import Grid from '@material-ui/core/Grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'username',
      headerName: 'User Name',
      width: 250,
      editable: true,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 250,
      editable: true,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      editable: true,
    },

];
const pullQuery = gql`
    query getUsers {
        getUsers {
            id
            username
            email
            status
        }
    }
`;  
function getDataUser(data){
    let rows = [];
    if(data.getUsers.length > 0){
        rows = data.getUsers;
    }
    return rows;
}
export default function ListMember() {

    
    const { loading, error, data } = useQuery(pullQuery);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    var rows = getDataUser(data);
    console.log(rows)
    return (
        <div style={{ height: 400, width: '100%' }}>
            <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
             >
                <h1>List Member</h1>
            </Grid>
        <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            checkboxSelection
            disableSelectionOnClick
        />
        </div>
    )
}
