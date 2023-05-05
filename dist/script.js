// require('dotenv').config()
import playlists from './data.json' assert {type: 'json'};
const FORM = document.getElementById('form');
const ERROR_MSG = document.getElementById('errMsg')
const SEARCH_BAR = document.getElementById('query');
const BOX = document.getElementById('box');

const handleFormSubmission = (e) => {
  e.preventDefault()
  //  Clear pervious search results
  removePlaylistAnchors();

  const query = new RegExp(SEARCH_BAR.value, 'i');
  console.log('query', query);
  const results = playlists.filter(playlist => {
    if (playlist.playlistName.search(query) >= 0) {
      return playlist
    }
  });

  // handle no results case
  if (!results.length) {
    ERROR_MSG.classList.remove('hide')
  } else {
    ERROR_MSG.classList.add('hide')
  }

  results.forEach(playlist => addPlaylistAnchor(playlist));
}

const addPlaylistAnchor = (playlist) => {
  const anchorTag = document.createElement('a');
  const url = `https://music.youtube.com/playlist?list=${playlist.id}`;
  anchorTag.setAttribute('href', url);
  anchorTag.setAttribute('target', '_blank');
  anchorTag.innerText = playlist.playlistName;
  BOX.appendChild(anchorTag);
}

const removePlaylistAnchors = () => {
  while (BOX.firstChild) {
    BOX.removeChild(BOX.firstChild);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  FORM.addEventListener('submit', handleFormSubmission);
})




