import React from "react";
import { gql, useQuery } from '@apollo/client';

export const filesQuery = gql `
   {
    files
   }
`;

export const Files = () => {
    const { data, loading } = useQuery(filesQuery);

    if (loading) {
        return <div> loading... </div>;
    }

    return ( <div> {
            data.files.map(x => ( <
                img style = {
                    { width: 200 } }
                key = { x }
                src = { `http://localhost:5000/images/${x}` }
                alt = { x }
                />
            ))
        } </div>
    );
};