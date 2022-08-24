import React from 'react';
import { useQuery, gql } from '@apollo/client';
import AlbumList from './components/AlbumList';


const Gql_GetMusic = gql`
    query getMusicsFE {
        getMusicsFE {
            id
            name
            thumbnailUrl
        }
    }
`;

function AlbumFeature(props) {
    const { loading, error, data } = useQuery(Gql_GetMusic);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div>
            <AlbumList albumList={data.getMusicsFE} />
        </div>
    );
}

export default AlbumFeature;
