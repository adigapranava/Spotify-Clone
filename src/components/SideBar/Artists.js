import React from 'react'
import Artist from './Artist'


function Artists(props) {
    let renderFavArtist = props.artists.map((artist) =>{
        return (
                <Artist
                    key={artist.id}
                    artist = {artist}
                    setArtist={props.setArtist}/>
        )
    })
    
    return (
        <div className="item2-part">
            <div className="item2-head">
                <h4>Artists You Follow</h4>
            </div>
            <div className="fav-artists-div">
                {props.artists.length>0? 
                    renderFavArtist :
                    <h3 style={{color:"#a3a3a3"}}>You Follow No Artist!?<br></br>: (</h3>}
            </div>
        </div>
    )
}

export default Artists
