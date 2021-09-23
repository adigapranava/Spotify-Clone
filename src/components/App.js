import Headder from './Headder';
import Main from './Main';
import SideBar from './SideBar';
import MusicPlayer from './MusicPlayer';
import React, { useState, useEffect} from 'react';
import '../App.css';
import Spotify from "../api/Spotify"

function App() {
  const favArtistsKey = "favArtists";
  const favSongsKey = "favSongs";

  const storedFavArtist = JSON.parse(localStorage.getItem(favArtistsKey)) || [];
  // from local storage
  const [favArtist, setfavArtist] = useState(storedFavArtist)

  // from api
  const storedFavSongs = JSON.parse(localStorage.getItem(favSongsKey)) || [];
  const [artist, setArtist] = useState()
  const [tracks, setTracks] = useState([])

  const [favSongs, setfavSongs] = useState(storedFavSongs)
  const [song, setSong] = useState()
  const [audio, setAudio] = useState()
  const [playing, setPlaying] = useState(false)

  const toggleFavoriteArtist = (artistObj) => {
    if(followingArtist(artistObj)){
      const newFavArtist = favArtist.filter(
        (artist) => artist.id !== artistObj.id);
      localStorage.setItem(favArtistsKey, JSON.stringify(newFavArtist))
      setfavArtist(newFavArtist)
    }else{
      setfavArtist(oldArray => {
        localStorage.setItem(favArtistsKey, JSON.stringify([...oldArray, artistObj]))
        return [artistObj, ...oldArray]
      });
    }
  }

  const followingArtist = (artistObj) =>{
    var following=false
    favArtist.forEach(artist =>{
      if(artist.id == artistObj.id)
        following = true;
    })
    return following;
  }
  
  const addFavoriteArtist = (artistObject) => {
    setfavArtist(oldArray => {
      localStorage.setItem(favArtistsKey, JSON.stringify([...oldArray, artistObject]))
      return [artistObject, ...oldArray]
    });
  }

  const removeFavoriteArtist = (artistObjectId) => {
    const newFavArtist = favArtist.filter(
    (artist) => artist.id !== artistObjectId);
      localStorage.setItem(favArtistsKey, JSON.stringify(newFavArtist))
      setfavArtist(newFavArtist)
  }
  
    // remove from state TODO remove from local storage
    const toggleFavSong = (songObject) => {
      if(isSongFav(songObject)){
        const newFavSongs = favSongs.filter(
        (song) => song.id !== songObject.id);
        setfavSongs(newFavSongs)
        localStorage.setItem(favSongsKey, JSON.stringify(newFavSongs));
      }else{
          setfavSongs(oldArray => {
              localStorage.setItem(favSongsKey, JSON.stringify([songObject, ...oldArray]));
              return [songObject, ...oldArray]
          });
      }
    }

    // search for artist using the qwery
    const searchForArtist = async (artistQuery) => {
        var found = true;
        if(artistQuery==="")
          return
        const response = await Spotify.get(`/artist/${artistQuery}`)
                                      .catch(()=>{
                                        found=false;
                                        // alert("Sorry!! No Artist found for the qwery"+ artistQuery)
                                        return;
                                      })
        if(found){
          var data = response.data;
          data = data.artists.items[0];
          if(data){
            var name = data.name;
            var id = data.id;
            var followers = data.followers.total;
            var imgUrl = data.images[0]? data.images[0].url :"https://github.com/adigapranava/courseKart/blob/main/static/images/boy.png?raw=true";
            var artistObj = {
              id,
              name,
              imgUrl,
              followers
            }
            setArtist(artistObj)
            return;
          }
        }else{
          alert("Sorry!! No Artist found for the qwery '"+ artistQuery+"'")
        }
    }

    const isSongFav = (songObj) =>{
      const id = songObj.id
      var fav=false
      favSongs.forEach(sng =>{
          if(sng.id === id)
              fav = true;
      })
      return fav;
    }

  useEffect(async ()=>{
    if(artist){
      setTracks([])
      const response = await Spotify.get(`/artist/${artist.id}/top-tracks`);
      const data = response.data; 
      let tracksList =[]
      data.tracks.forEach(fullTrack=>{
        var name = fullTrack.name;
        var priviewUrl = fullTrack.preview_url;
        var imgUrl = fullTrack.album.images.length > 0? fullTrack.album.images[0].url :"https://d1csarkz8obe9u.cloudfront.net/posterpreviews/neon-smoke-artistic-video-album-art-design-template-e46f6c8f94615dc12b347ad51ccc1cd0.jpg?ts=1591105904";
        var id = fullTrack.id
        var releaseDate = fullTrack.album.release_date
        tracksList.push({
          id,name, priviewUrl, imgUrl, artist, releaseDate
        })

      })
      setTracks(tracksList);      
    }
  },[artist])

  useEffect(()=>{
    if(audio){
      audio.pause();
    }
    if(song){
      setAudio(new Audio(song.priviewUrl));
    }
  },[song])

  useEffect(()=>{
    if(audio){
        audio.play();
        setPlaying(true);
        // console.log("audio added");
        audio.addEventListener('ended',function(){
          setTimeout(()=>{
            setSong()
            setPlaying(false);
          }, 2000)
        })
    }
  },[audio])

  return (
    <div className="App">
      <Headder />
      <SideBar 
        favArtist={favArtist}
        setArtist={setArtist}
        song={song}
        setSong={setSong}
        toggleFavSong={toggleFavSong}
        favSongs={favSongs}
        />
      <Main 
        searchForArtist={searchForArtist}
        artist={artist}
        tracks={tracks}
        song={song}
        setSong={setSong}
        followingArtist={followingArtist}
        toggleFavoriteArtist={toggleFavoriteArtist}
        toggleFavSong={toggleFavSong}
        isSongFav={isSongFav}/>
      {song && <MusicPlayer 
                song={song} 
                audio={audio}
                playing={playing}
                setPlaying={setPlaying}
                toggleFavSong={toggleFavSong}
                isSongFav={isSongFav}/>}
    </div>
  );
}

export default App;
