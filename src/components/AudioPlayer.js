import React, { useRef, useState, useEffect } from 'react'
import './audioPlayer.css'
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai'

const AudioPlayer = (props) => {
    // state
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [index, setIndex] = useState(0)
    const [songList, setSongList] = useState(props.songList)
    const [currentSong, setCurrentSong] = useState(songList[index].fileUrl)
    // references
    const audioPlayer = useRef(); // for audio component
    const progressBar = useRef(); // for progress bar
    const audioVolume = useRef(); // for audio 
    const animationRef = useRef();

    useEffect(() => {
        // formatando a duração para secundos
        const seconds = Math.floor(audioPlayer.current.duration)
        setDuration(seconds);
        progressBar.current.max = seconds;
    }, 
    [
        audioPlayer?.current?.loadedmetadata,
        audioPlayer?.current?.readyState
    ])

    const calculateTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${returnedMinutes} : ${returnedSeconds}`

    }
    const togglePlayPause = () => {
        // criando essa variavel vc resolve o problema de 
        // assincronidade
        const prevValue = isPlaying;
        setIsPlaying(!prevValue);
        if (!prevValue) {
            audioPlayer.current.play();
            animationRef.current = requestAnimationFrame(whilePlaying)
            
        } else {
            audioPlayer.current.pause();
            cancelAnimationFrame(animationRef.current);
        }
    }

    const whilePlaying = () => {
        progressBar.current.value = audioPlayer.current.currentTime;
        changePlayerCurrentTime();
        animationRef.current = requestAnimationFrame(whilePlaying)
    }

    const changeRange = () => {
        audioPlayer.current.currentTime = progressBar.current.value;
        changePlayerCurrentTime();
    }
    
    const changePlayerCurrentTime = () => {
        progressBar.current.style.setProperty('--seek-before-width',
            `${progressBar.current.value / duration * 100}%`)
        setCurrentTime(progressBar.current.value)
    }

    const backThirty = () => {
        progressBar.current.value = Number(progressBar.current.value) - 15
        changeRange();
    }

    const forwardThirty = () => {
        progressBar.current.value = Number(progressBar.current.value) + 15
        changeRange();
    }

    const changeVolume = () => {
        let volume = audioVolume.current.value
        audioPlayer.current.volume = volume / 100;
    }

    const backSong = () => {
        if(index == 0){
            setIndex(songList.length - 1)
        }else{
            setIndex(index - 1)
        }
    }

    const forwardSong = () => {
        if(index == songList.length - 1){
            setIndex(0)
        }else{
            setIndex(index + 1)
        }
    }

    const nextSong = () => {
        // criando essa variavel vc resolve o problema de 
        // assincronidade
        const prevValue = isPlaying;
        setIsPlaying(prevValue);
        if (prevValue) {
            audioPlayer.current.play();
            animationRef.current = requestAnimationFrame(whilePlaying)
        } else {
            audioPlayer.current.pause();
            cancelAnimationFrame(animationRef.current);
        }
    }

    const changeSong = (e) => {
        setIndex(e.target.value)
        console.log(e.target.value)
    }

    useEffect(()=>{
        setCurrentSong(songList[index].fileUrl)    
        nextSong() 
    }, [index])

    useEffect(()=>{
        nextSong() 
        calculateTime()
    }, [currentSong])

    return (
        <div className='wrapper'>
            <div className='audioPlayer'>
                <audio ref={audioPlayer} src={currentSong} preload='metadata'></audio>
                <ul>
                    {songList.map((songs, index) => {
                        return (
                            <div className={`songItem ${currentSong == songs.fileUrl ? 'active' : ''}`}
                            >                       
                                <li 
                                    key={songs.title}
                                    value={index} onClick={changeSong}
                                    >
                                    {index} - {songs.title} 
                                </li>
                                <p><span>Artist:</span> {songs.artistName}</p>
                                <p><span>Album: </span>{songs.albumTitle}</p>
                            </div>
                        )
                    })}
                </ul>
            </div>
            <div className='playerWrapper'>
                <div className='leftPlayer'>
                    <p>{songList[index].title}<br/>
                    <span>{songList[index].artistName}</span></p>
                </div>
                <div className='centerPlayer'>
                <div className='playerControls'>
                    <button
                        onClick={backSong}
                    >
                    <AiOutlineArrowLeft />
                    Musica Anterior</button>
                    
                    <button
                        onClick={backThirty}
                    ><AiOutlineArrowLeft /> - 15 </button>

                    <button onClick={togglePlayPause}>
                        {isPlaying ? <AiFillPauseCircle /> : <AiFillPlayCircle />}
                    </button>

                    <button
                        onClick={forwardThirty}
                    > 15 + <AiOutlineArrowRight /></button>

                    <button
                        onClick={forwardSong}
                    >Próxima musica<AiOutlineArrowRight /></button>
                </div>
                <div>
                    {/* current time */}
                    {calculateTime(currentTime)}
                    {/* progress bar */}
                        <input className={'progressBar'} type='range'
                            defaultValue="0"
                            ref={progressBar}
                            onChange={changeRange}
                        />
                    {/* duration */}
                    {(duration && !isNaN(duration)) && calculateTime(duration)}
                </div>

                </div>
                <div className='rightPlayer'>
                    <p>Volume:</p>
                    <div>
                        <input className={'progressBar'} type='range'
                            defaultValue="100"
                            min={0}
                            max={100}
                            ref={audioVolume}
                            onChange={changeVolume}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export { AudioPlayer }
