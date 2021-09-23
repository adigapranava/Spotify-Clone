import React from 'react'
import Song from './Song'

function Songs(props) {
    let renderFavSongs = props.favSongs.map((song) =>{
        return (
                <Song
                    key={song.id}
                    song = {song}
                    playingSong={props.song}
                    toggleFavSong={props.toggleFavSong}
                    setSong={props.setSong}/>
        )
    })
    return (
        <div className="item2-part">
            <div className="item2-head">
                <h4>Songs You 🤍</h4>
            </div>
            <div className="fav-songs-div">
                {props.favSongs.length>0? 
                    renderFavSongs :
                    <h3 style={{
                        color:"#a3a3a3", 
                        display:"flex", 
                        justifyContent:"center",
                        alignContent:"center"}}>You 🖤 No Songs!?<br></br>: (</h3>}
            </div>
        </div>
    )
}

export default Songs
