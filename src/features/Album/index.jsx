import React from 'react';
import { useQuery, gql } from '@apollo/client';
import AlbumList from './components/AlbumList';


const pullQuery = gql`
    query getMusics {
        getMusics {
            id
            name
            thumbnailUrl
        }
    }
`;

function AlbumFeature(props) {
    const { loading, error, data } = useQuery(pullQuery);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return(
        <div>
            <AlbumList albumList={data.getMusics} />
        </div>
    );
}

export default AlbumFeature;
