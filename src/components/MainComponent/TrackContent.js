import React from 'react'

function TrackContent(props) {
    const {id, name, priviewUrl, imgUrl, releaseDate} = props.track;
    var year = new Date(releaseDate);
    return (
        <div 
            className={`track ${props.isSongFav(props.track)? "liked":""}`} 
            onDoubleClick={()=>{props.toggleFavSong(props.track)}}
            onClick={()=>{
                priviewUrl? props.setSong(props.track): alert("Sorry we cant play this try other songs : )")}}>
            <img src={`${imgUrl}`} alt={`${name}`} srcset="" />
            <div className="track-name">
                <h4>{`${name}`}</h4>
                <p>{`${year.getFullYear()} • Album`}</p>
            </div>
            {props.song && props.song.id === id? <div className="currently-playing"></div>:"" }
        </div>
    )
}

export default TrackContent
