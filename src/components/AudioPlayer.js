import React, { useRef, useState, useEffect } from 'react'
import './audioPlayer.css'
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai'

const AudioPlayer = () => {
    // state
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [index, setIndex] = useState(0)
    const [songList, setSongList] = useState([
        {
          title: 'Promenade Allegro giusto nel modo russico senza allegrezza ma',
          artistName: 'Skidmore College Orchestra',
          albumTitle: "Mussorgsky's Pictures at an Exhibition",
          fileUrl:
            'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/MusOpen/Skidmore_College_Orchestra/Mussorgskys_Pictures_at_an_Exhibition/Skidmore_College_Orchestra_-_01_-_Promenade_Allegro_giusto_nel_modo_russico_senza_allegrezza_ma.mp3',
        },
        {
          title: 'I. Gnomus Vivo',
          artistName: 'Skidmore College Orchestra',
          albumTitle: "Mussorgsky's Pictures at an Exhibition",
          fileUrl:
            'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/MusOpen/Skidmore_College_Orchestra/Mussorgskys_Pictures_at_an_Exhibition/Skidmore_College_Orchestra_-_02_-_I_Gnomus_Vivo.mp3',
        },
        {
          title: 'Promenade Moderato comodo e con delicatezza',
          artistName: 'Skidmore College Orchestra',
          albumTitle: "Mussorgsky's Pictures at an Exhibition",
          fileUrl:
            'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/MusOpen/Skidmore_College_Orchestra/Mussorgskys_Pictures_at_an_Exhibition/Skidmore_College_Orchestra_-_03_-_Promenade_Moderato_comodo_e_con_delicatezza.mp3',
        },
        {
          title: 'II. Il vecchio castello Andante',
          artistName: 'Skidmore College Orchestra',
          albumTitle: "Mussorgsky's Pictures at an Exhibition",
          fileUrl:
            'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/MusOpen/Skidmore_College_Orchestra/Mussorgskys_Pictures_at_an_Exhibition/Skidmore_College_Orchestra_-_04_-_II_Il_vecchio_castello_Andante.mp3',
        },
        {
          title: 'Promenade Moderato non tanto pesante',
          artistName: 'Skidmore College Orchestra',
          albumTitle: "Mussorgsky's Pictures at an Exhibition",
          fileUrl:
            'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/MusOpen/Skidmore_College_Orchestra/Mussorgskys_Pictures_at_an_Exhibition/Skidmore_College_Orchestra_-_05_-_Promenade_Moderato_non_tanto_pesante.mp3',
        },
        {
          title: 'III. Tuileries Allegretto non troppo capriccioso',
          artistName: 'Skidmore College Orchestra',
          albumTitle: "Mussorgsky's Pictures at an Exhibition",
          fileUrl:
            'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/MusOpen/Skidmore_College_Orchestra/Mussorgskys_Pictures_at_an_Exhibition/Skidmore_College_Orchestra_-_06_-_III_Tuileries_Allegretto_non_troppo_capriccioso.mp3',
        },
        {
          title: 'IV. Bydlo Sempre moderato pesante',
          artistName: 'Skidmore College Orchestra',
          albumTitle: "Mussorgsky's Pictures at an Exhibition",
          fileUrl:
            'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/MusOpen/Skidmore_College_Orchestra/Mussorgskys_Pictures_at_an_Exhibition/Skidmore_College_Orchestra_-_07_-_IV_Bydlo_Sempre_moderato_pesante.mp3',
        },
        {
          title: 'Promenade Tranquillo',
          artistName: 'Skidmore College Orchestra',
          albumTitle: "Mussorgsky's Pictures at an Exhibition",
          fileUrl:
            'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/MusOpen/Skidmore_College_Orchestra/Mussorgskys_Pictures_at_an_Exhibition/Skidmore_College_Orchestra_-_08_-_Promenade_Tranquillo.mp3',
        },
        {
          title: 'V. Ballet des poussins dans leurs coques Scherzino. Vivo leggiero',
          artistName: 'Skidmore College Orchestra',
          albumTitle: "Mussorgsky's Pictures at an Exhibition",
          fileUrl:
            'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/MusOpen/Skidmore_College_Orchestra/Mussorgskys_Pictures_at_an_Exhibition/Skidmore_College_Orchestra_-_09_-_V_Ballet_des_poussins_dans_leurs_coques_Scherzino_Vivo_leggiero.mp3',
        },
        {
          title: 'VI. Samuel Goldenberg and Schmuyle Andante',
          artistName: 'Skidmore College Orchestra',
          albumTitle: "Mussorgsky's Pictures at an Exhibition",
          fileUrl:
            'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/MusOpen/Skidmore_College_Orchestra/Mussorgskys_Pictures_at_an_Exhibition/Skidmore_College_Orchestra_-_10_-_VI_Samuel_Goldenberg_and_Schmuyle_Andante.mp3',
        },
        {
          title: 'VII. Limoges. Le March? Allegretto vivo sempre scherzando',
          artistName: 'Skidmore College Orchestra',
          albumTitle: "Mussorgsky's Pictures at an Exhibition",
          fileUrl:
            'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/MusOpen/Skidmore_College_Orchestra/Mussorgskys_Pictures_at_an_Exhibition/Skidmore_College_Orchestra_-_11_-_VII_Limoges_Le_March_Allegretto_vivo_sempre_scherzando.mp3',
        },
        {
          title: 'VIII. Catacombae. Sepulcrum romanum Largo',
          artistName: 'Skidmore College Orchestra',
          albumTitle: "Mussorgsky's Pictures at an Exhibition",
          fileUrl:
            'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/MusOpen/Skidmore_College_Orchestra/Mussorgskys_Pictures_at_an_Exhibition/Skidmore_College_Orchestra_-_12_-_VIII_Catacombae_Sepulcrum_romanum_Largo.mp3',
        },
        {
          title: 'Cum mortuis in lingua mortua Andante non troppo con lamento',
          artistName: 'Skidmore College Orchestra',
          albumTitle: "Mussorgsky's Pictures at an Exhibition",
          fileUrl:
            'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/MusOpen/Skidmore_College_Orchestra/Mussorgskys_Pictures_at_an_Exhibition/Skidmore_College_Orchestra_-_13_-_Cum_mortuis_in_lingua_mortua_Andante_non_troppo_con_lamento.mp3',
        },
        {
          title: 'IX. La Cabane sur des pattes de poule Allegro con brio feroce An',
          artistName: 'Skidmore College Orchestra',
          albumTitle: "Mussorgsky's Pictures at an Exhibition",
          fileUrl:
            'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/MusOpen/Skidmore_College_Orchestra/Mussorgskys_Pictures_at_an_Exhibition/Skidmore_College_Orchestra_-_14_-_IX_La_Cabane_sur_des_pattes_de_poule_Allegro_con_brio_feroce_An.mp3',
        },
        {
          title: 'X. La grande porte de Kiev Allegro alla breve. Maestoso. Con gran',
          artistName: 'Skidmore College Orchestra',
          albumTitle: "Mussorgsky's Pictures at an Exhibition",
          fileUrl:
            'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/MusOpen/Skidmore_College_Orchestra/Mussorgskys_Pictures_at_an_Exhibition/Skidmore_College_Orchestra_-_15_-_X_La_grande_porte_de_Kiev_Allegro_alla_breve_Maestoso_Con_gran.mp3',
        },
      ]
      )
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
    }, [audioPlayer?.current?.loadedmetadata,
    audioPlayer?.current?.readyState
    ])

    const calculateTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const returnedMinutes = minutes < 10 ? `0${minutes}` : `{minutes}`;
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `{seconds}`;
        return `${returnedMinutes}:${returnedSeconds}`

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
        progressBar.current.value = Number(progressBar.current.value) - 30
        changeRange();
    }

    const forwardThirty = () => {
        progressBar.current.value = Number(progressBar.current.value) + 30
        changeRange();
    }

    const changeVolume = () => {
        let volume = audioVolume.current.value
        audioPlayer.current.volume = volume / 200;
    }

    // const changeSong = (e) => {
    //     console.log(e.target.value)
    //     if (e.target.src.value === currentSong) {
    //         e.preventDefault()
    //     } else if (e.target.value != currentSong) {
    //         e.preventDefault()
    //         setCurrentSong(e.target.src.value)
    //         setCurrentSongName(e.target.name.value)
    //         setCurrentAuthorName(e.target.artist.value)
    //         setIsPlaying(false);
    //     }
    // }
    
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

    const changeSong = (e) => {
        setIndex(e.target.value)
        console.log(e.target.value)
    }

    useEffect(()=>{
        setCurrentSong(songList[index].fileUrl)
        setIsPlaying(false);
    }, [index])

    return (
        <div className='wrapper'>
            <div className='audioPlayer'>
                <audio ref={audioPlayer} src={currentSong} preload='metadata'></audio>

                {/* <form onSubmit={changeSong}> */}
                {/* {songList.map(songs => {
                    return (
                        <form>
                            <input name='name'
                            value={songs.name}   
                            />
                            <input name='artist'
                            value={songs.artist}  
                            />
                            <button name='src' value={songs.src}>Play</button>
                        </form>
                    )
                })}         */}
                {/* {index}<br/>
                {songList.length} */}
                <ul>
                    {songList.map((songs, index) => {
                        return (
                            <div className='songItem' >
                                <p>{songList.index}</p>
                                <li 
                                    key={songs.title}
                                    value={index} onClick={changeSong}
                                    >
                                    {songs.title} 
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
                    ><AiOutlineArrowLeft /> - 30 </button>

                    <button onClick={togglePlayPause}>
                        {isPlaying ? <AiFillPauseCircle /> : <AiFillPlayCircle />}
                    </button>

                    <button
                        onClick={forwardThirty}
                    > 30 + <AiOutlineArrowRight /></button>

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
                            max={200}
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
