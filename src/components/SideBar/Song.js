import React from 'react'

function Song(props) {
    const {id, name , imgUrl, releaseDate} = props.song;
    var year = new Date(releaseDate);
    return (
        <div className="fav-song" 
            onDoubleClick={()=>{props.toggleFavSong(props.song)}}
            onClick={()=>props.setSong(props.song)}
            >
           <div className="fav-song-img">
               <img src={`${imgUrl}`} alt="" />
           </div>
            <div className="track-name">
                <h4>{`${name}`}</h4>
                <p>{`${year.getFullYear()} • Album`}</p>
            {props.playingSong && props.playingSong.id == id? <div className="currently-playing"></div>: "" }
            </div>
        </div>
    )
}

export default Song
