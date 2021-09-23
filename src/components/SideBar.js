import React from 'react'
import Artists from './SideBar/Artists'
import Songs from './SideBar/Songs'

function SideBar(props) {
    return (
        <div className="item2 item">
            <Artists 
                artists={props.favArtist}
                setArtist={props.setArtist}/>
            <Songs 
                favSongs={props.favSongs}
                song={props.song}
                setSong={props.setSong}
                toggleFavSong={props.toggleFavSong}/>
        </div>
    )
}

export default SideBar
