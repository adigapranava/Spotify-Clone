import React from 'react'

function MusicPlayer(props) {
    // props.audio && console.log(props.audio.duration,"sad");
    const {id, name , imgUrl, releaseDate} = props.song
    var year = new Date(releaseDate);

    const playPauseHandler = ()=>{
        if(props.audio.paused){
            props.setPlaying(true);
            props.audio.play();
        }
        else{
            props.setPlaying(false);
            props.audio.pause();
        }
    }
   
    return (
        <div className="music-player">
            <div className="top">
                <div className="img">
                    <img src={`${imgUrl}`} alt={`${name}`} srcset="" />
                </div>
                <div className="track-name">
                    <h4>{`${name}`}</h4>
                    <p>{`${year.getFullYear()} • Album`}</p>
                </div>
                <div className="play-like">
                    <div className="play-icon" onClick={() =>{playPauseHandler()}}>
                        <i className={`fa ${props.playing? "fa-pause": "fa-play"}`}></i>
                    </div>
                    <div className="like-icon" onClick={()=>{props.toggleFavSong(props.song)}}>
                        <i className={`${props.isSongFav(props.song)?"fas":"far"} fa-heart`}></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MusicPlayer
