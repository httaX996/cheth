import React from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import Lottie from "lottie-react";
import playIcon from "../../public/icons/play-icon.json";

// MUI
import {
    Box,
    Typography
} from "@mui/material";

// props
import { SearchCardProps } from "../interfaces/props";

const SearchCard: React.FC<SearchCardProps>
    = ({ id,
        poster_path,
        title,
        release_date,
        first_air_date,
        vote_average,
        type }) => {
        const navigate = useNavigate();
        const [imageLoaded, setImageLoaded] = React.useState(false);

        const navigateToScreen = () => {
            if (type === "movie") {
                const data = { id: id.toString() };
                const queryString = new URLSearchParams(data).toString();
                // send user
                navigate(`/screen/movie?${queryString}`);
            }
            else {
                const data = { id: id.toString() };
                const queryString = new URLSearchParams(data).toString();
                // send user
                navigate(`/screen/tv?${queryString}`);
            }
        }

        return (
            <>
                <Box sx={{
                background: 'none',
                ml: .35,
                mr: .35,
                position: 'relative',
                // border: '1px solid red'
            }}>
                <Box className={type == "movie" ? "_movie_poster_container" : "_tv_poster_container"}
                    style={{
                        overflow: 'hidden',
                        borderRadius: 12,
                        position: 'relative',
                    }}>
                    {!imageLoaded && (
                        <Box style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: '#1a1a1a',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}><Box className="loading-spinner card-loading-spinner"></Box>
                        </Box>
                    )}

                    {window.innerWidth > 1200 && (
                        <Lottie className="play-icon"
                            onClick={navigateToScreen}
                            style={{
                                opacity: 0,
                                width: 85,
                                position: 'absolute',
                                left: '50%',
                                top: '55%',
                                transform: 'translate(-50%, -50%)',
                                zIndex: 1,
                                cursor: 'pointer'
                            }} animationData={playIcon} loop={true} />
                    )}
                    <img
                        loading="lazy"
                        className="poster"
                        onClick={navigateToScreen}
                        onLoad={() => setImageLoaded(true)}
                        style={{
                            width: '100%',
                            borderRadius: 8,
                            objectFit: 'cover',
                            aspectRatio: type == "movie" ? (3 / 4.5) : (16 / 10),
                            cursor: 'pointer',
                            opacity: imageLoaded ? 1 : 0,
                        }}
                        src={poster_path}
                        alt={title} />
                </Box>

                <Box sx={{ alignItems: 'flex-end' }}>
                    {/* title */}
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <Typography
                            className="_movie_title"
                            sx={{
                                color: 'white',
                                fontSize: { xs: 13, md: 13, lg: 13 },
                                fontWeight: 380,
                                fontFamily: 'Rubik',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                maxWidth: '70%',
                                mb: -.25,
                                mt: 1
                            }}>{type === "movie" ? title : title}</Typography>

                        <Typography sx={{
                            color: '#a2ff00',
                            fontSize: { xs: 11, lg: 10 },
                            fontWeight: 420,
                            fontFamily: 'Rubik',
                            opacity: .9,
                            mr: 1.25,
                            textTransform: 'capitalize',
                            mt: 1
                        }}>{type == "movie" ? "movie" : "TV Show"}</Typography>
                    </Box>

                    <Box sx={{
                        display: "inline-flex",
                        alignItems: "center",
                    }}>
                        <Typography sx={{
                            color: 'white',
                            fontSize: { xs: 10, lg: 10 },
                            fontWeight: 400,
                            fontFamily: 'Rubik',
                            opacity: .8
                        }}>{type === "movie" ? String(release_date).length > 0 ? String(release_date).slice(0, 4) : "--"
                            :
                            String(first_air_date).length > 0 ? String(first_air_date).slice(0, 4) : "--"}
                            &nbsp;&nbsp; ·
                        </Typography>

                        <Typography sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            color: "white",
                            fontSize: { xs: 10, lg: 10 },
                            fontWeight: 400,
                            fontFamily: "Rubik",
                            opacity: 0.8,
                        }}>
                            &nbsp;&nbsp;&nbsp; <FaStar style={{ color: "#a2ff00", marginRight: 5, fontSize: 10 }} />
                            <span style={{ letterSpacing: 2 }}>{vote_average ? (Math.round(vote_average * 10) / 10) : "--"}</span>
                        </Typography>
                    </Box>
                </Box>

                {/* tag */}
                <Box sx={{
                    position: 'absolute',
                    left: 10.75,
                    top: 10.75,
                    width: '100%',
                    zIndex: 2
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <Box sx={{
                            height: 20,
                            width: 2.35,
                            bgcolor: '#a2ff00',
                            mr: .75,
                            borderRadius: 10,
                        }}></Box>
                        <Typography
                            sx={{
                                color: 'white',
                                textTransform: 'capitalize',
                                fontSize: { xs: 9, lg: 9.5 },
                                fontWeight: { xs: 450, lg: 420 },
                                fontFamily: 'Rubik',
                                lineHeight: 1.25,
                                opacity: .9,
                                width: 'fit-content',
                            }}>Stream now <br /> on <span style={{ color: '#a2ff00' }}>CK CineMAX</span>
                        </Typography>
                    </Box>
                </Box>

                {/* shader */}
                <Box sx={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    background: 'linear-gradient(to bottom, rgba(0,0,0,.9) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0) 100%)',
                    width: '100%',
                    height: 100,
                    zIndex: 1
                }}></Box>
            </Box>
            </>
        )
    }

export default SearchCard;
