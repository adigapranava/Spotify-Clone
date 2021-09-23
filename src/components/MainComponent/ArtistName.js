import React from 'react'

function ArtistName(props) {
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const {id, name, imgUrl, followers} = props.artist;
    return (
        <div className="selected-artist">
            <div className="img">
                <img src={`${imgUrl}`} alt={`${name}`}  />
            </div>
            <div className="profile">
                <h2>{`${name}`}</h2>
                <p>{`${numberWithCommas(followers)} monthly listeners`}</p>
                <button 
                    className={`${props.followingArtist(props.artist)?"following" : "follow"}`}
                    onClick={()=>props.toggleFavoriteArtist(props.artist)}>
                    {`${props.followingArtist(props.artist)?"following" : "follow"}`}
                </button>
            </div>
        </div>
    )
}

export default ArtistName
