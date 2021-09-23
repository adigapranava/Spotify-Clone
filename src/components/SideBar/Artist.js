import React from 'react'

function Artist(props) {
    const {id, name, imgUrl} = props.artist;
    return (
        <div className="item2-artist" 
            onClick={()=>props.setArtist(props.artist)}>
            <img src={`${imgUrl}`} alt={`${name}`} />
            <p>{`${name}`}</p>
        </div>
    )
}

export default Artist
