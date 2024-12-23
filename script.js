console.log("Welcome to Spotify");

let songIndex=0;
let audioElement=new Audio('songs/1.mp3');
let masterPlay=document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let masterSongName=document.getElementById('masterSongName');
let songItems=Array.from(document.getElementsByClassName('songItem'));


let songs=[
{songName:"You are beautiful", filePath:"songs/1.mp3",coverPath:"covers/1.jpg"},
{songName:"Hey Jude", filePath:"songs/2.mp3",coverPath:"covers/2.jpg"},
{songName:"Blank Space", filePath:"songs/3.mp3",coverPath:"covers/3.jpg"},
{songName:"Counting Stars", filePath:"songs/4.mp3",coverPath:"covers/4.jpg"},
{songName:"Hello", filePath:"songs/5.mp3",coverPath:"covers/5.jpg"},
{songName:"Thinking out Loud", filePath:"songs/6.mp3",coverPath:"covers/6.jpg"},
{songName:"Light Again", filePath:"songs/7.mp3",coverPath:"covers/7.jpg"},
{songName:"Rockstar", filePath:"songs/8.mp3",coverPath:"covers/8.jpg"},
{songName:"Favorite", filePath:"songs/9.mp3",coverPath:"covers/9.jpg"},
{songName:"Girls", filePath:"songs/10.mp3",coverPath:"covers/10.jpg"},
]
songItems.forEach((element, i) => {
    console.log(element, i); // Use index provided by forEach
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText=songs[i].songName;
});


masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;

        // Sync the currently playing song's button
        document.getElementById(songIndex).classList.remove('fa-circle-play');
        document.getElementById(songIndex).classList.add('fa-circle-pause');
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;

        // Sync the currently playing song's button
        document.getElementById(songIndex).classList.remove('fa-circle-pause');
        document.getElementById(songIndex).classList.add('fa-circle-play');
    }
});

//Listen to events
audioElement.addEventListener('timeupdate',()=>{
    // console.log('timeupdate');
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    // console.log(progress);
    myProgressBar.value=progress;
});

myProgressBar.addEventListener('input', () => {
    const newTime = (myProgressBar.value / 100) * audioElement.duration;
    audioElement.currentTime = newTime;
});
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        const clickedSongIndex = parseInt(e.target.id);

        if (songIndex === clickedSongIndex && !audioElement.paused) {
            // Pause the current song if the same song's button is clicked
            audioElement.pause();
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            gif.style.opacity = 0;
        } else {
            // Play the selected song
            makeAllPlays(); // Reset all buttons
            songIndex = clickedSongIndex;
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            loadSong(songIndex);
        }
    });
});

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=9){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    audioElement.src=`songs/${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
})
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=0;
    }
    else{
        songIndex-=1;
    }
    audioElement.src=`songs/${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
}) 
const loadSong = (index) => {
    audioElement.src = songs[index].filePath;
    masterSongName.innerText = songs[index].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
};

audioElement.addEventListener('ended', () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songIndex);
});
// // Function to handle sharing a song
// // Function to handle sharing a song via Gmail with a playable link
// const shareSong = (songIndex) => {
//     const song = songs[songIndex];
//     const subject = `Check out this song: ${song.songName}`;
    
//     // Ensure your song files are hosted online
//     const songLink = `https://drive.google.com/drive/folders/1PD91EcrjI5gArOhQNtGPbtyd0R-153UY?usp=sharing${song.songName.replace(/\s+/g, '-').toLowerCase()}.mp3`;  // Replace this with the actual hosted link to your song
//     const body = `Hi! I wanted to share this amazing song with you: ${song.songName}. You can listen to it here: ${songLink}\n\nMessage from me: I hope you enjoy it!`;

//     // Encode the subject and body to make sure it's URL safe
//     const encodedSubject = encodeURIComponent(subject);
//     const encodedBody = encodeURIComponent(body);

//     // Create a Gmail compose link
//     const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=&su=${encodedSubject}&body=${encodedBody}`;

//     // Open Gmail compose window
//     window.open(gmailLink, '_blank');
// };

// // Add event listeners for share buttons
// Array.from(document.getElementsByClassName('shareBtn')).forEach((element, i) => {
//     element.addEventListener('click', () => {
//         shareSong(i); // Share the song at the current index
//     });
// });

// songItems.forEach((element, i) => {
//     console.log(element, i); // Use index provided by forEach
//     element.getElementsByTagName('img')[0].src = songs[i].coverPath;
//     element.getElementsByClassName('songName')[0].innerText = songs[i].songName;

//     // Dynamically add the share button event listener
//     const shareButton = element.querySelector('.shareBtn');
//     shareButton.addEventListener('click', () => {
//         shareSong(i); // Pass the index of the song to the shareSong function
//     });
// });



  
  