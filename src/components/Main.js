import ArtistName from './MainComponent/ArtistName';
import React, { useState, useEffect} from 'react';
import TrackContent from './MainComponent/TrackContent';


function Main(props) {
    // from form
    const [artistQuery, setArtistQuery] = useState("")
    const [loading, setLoading] = useState(false)


    const handelFormSubmition = async (e) =>{
        e.preventDefault();
        setLoading(true);
        await props.searchForArtist(artistQuery)
        setLoading(false);
    }

    const showArtist = () =>{
        return props.artist ? <ArtistName 
                                followingArtist={props.followingArtist}
                                toggleFavoriteArtist={props.toggleFavoriteArtist}
                                artist={props.artist}/>: <div><h1 style={{color:"#a3a3a3"}}>Nothing To Show : (</h1></div>
    }

    const getTracks = ()=>{
        let tracksList = props.tracks.map((track) =>{
            return (
                    <TrackContent
                        track={track}
                        setSong={props.setSong}
                        song={props.song}
                        toggleFavSong={props.toggleFavSong}
                        isSongFav={props.isSongFav}
                        key={track.id}/>
            )
        })
        return tracksList
    }
    
    return (
        <div className="item item3">
            <div className="item3-search">
                <form onSubmit={handelFormSubmition}>
                    <input 
                        type="text" 
                        name="" 
                        id="searchArtist" 
                        placeholder="Search By Artist" 
                        value={artistQuery}
                        onChange={(e)=>{setArtistQuery(e.target.value)}}
                        autoFocus/>
                    <label htmlFor="searchArtist">
                        <i className="fa fa-search"></i>
                    </label>
                </form>
            </div>
            <div className="artist-stage">
                {loading ? <div class="loader"></div>: showArtist()}
            </div>
            <div className="tracks-stage">
                {loading ? <div></div>: getTracks()}
            </div>
        </div>
    )
}

export default Main
