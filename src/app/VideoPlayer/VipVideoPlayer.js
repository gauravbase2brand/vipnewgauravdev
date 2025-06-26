"use client";
import React, { useState, useEffect, useContext } from "react";
import "./video.css"; // Ensure your CSS is loading properly
import { AppStateContext } from "../contexts/AppStateContext/AppStateContext";
import { MyRegisterSignInContext } from "../contexts/MyRegisterSignInContext/MyRegisterSignInContext";
import Image from "next/image";
import usePageLoadDelay from "../usePageLoadDelay";
const VipVideoPlayer = () => {
  const { searchPopup } = useContext(AppStateContext);
  const { activeSignInWithOtp } = useContext(MyRegisterSignInContext);
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  const [isActive, setIsActive] = useState(false);
  const [player, setPlayer] = useState(null);
  const videoId = "HbQ1eeq71Jg"; // YouTube Video ID
  const [hideInfo, setHideInfo] = useState(false);
  const aniamtionHide = localStorage.getItem("videoWatched");
  const showVipVideoPlayer =
    window.location.pathname === "/" ||
    window.location.pathname === "/search-results" ||
    window.location.pathname === "/subcategory" ||
    window.location.pathname.split("/")[1] === "category";
  const [isSliderReady, setIsSliderReady] = useState(false);
  const isPageLoaded = usePageLoadDelay(7000);
  useEffect(() => {
    // Simulating the data fetching and setting slider ready
    if (isPageLoaded) {
      setTimeout(() => {
        setIsSliderReady(true);
      }, 1000); // Adjust delay as needed
    }
  }, [isPageLoaded]);
  useEffect(() => {
    const videoClosed = localStorage.getItem("videoClosed");
    if (videoClosed === "true") {
      setHideInfo(true); // If 'videoClosed' is true, hide the info
    }
  }, []);
  const handlePlayClick = () => {
    setIsActive(true);
  };

  const handleCloseClick = () => {
    setIsActive(false);
    if (player) {
      player.stopVideo(); // Stop video when closing
    }
  };

  useEffect(() => {
    const loadYouTubeAPI = () => {
      if (window.YT) {
        initializePlayer();
      } else {
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        script.onload = initializePlayer;
        document.body.appendChild(script);
      }
    };

    const initializePlayer = () => {
      if (!window.YT || !window.YT.Player) {
        console.error("YouTube API not loaded properly");
        return;
      }

      const newPlayer = new window.YT.Player("video-player", {
        height: "390",
        width: "640",
        videoId: videoId,
        playerVars: {
          rel: 0, // Prevent showing related videos
          autoplay: 1, // Auto-play the video
          modestbranding: 1, // Minimal YouTube branding
          controls: 1, // Show video controls
          showinfo: 0, // Disable video information
          iv_load_policy: 3, // Hide annotations
          fs: 1, // Allow fullscreen
          disablekb: 1, // Disable keyboard shortcuts
        },
        events: {
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              // Video ended, set item in localStorage
              localStorage.setItem("videoWatched", "true");
            }
          },
        },
      });

      setPlayer(newPlayer);
    };

    loadYouTubeAPI();

    return () => {
      if (player) {
        player.destroy();
      }
    };
  }, [isActive]);
  const handleClose = () => {
    localStorage.setItem("videoClosed", "true");
    setHideInfo(true);
  };

  return (
    <>
      {showVipVideoPlayer && isSliderReady && (
        <>
          {!aniamtionHide && !searchPopup && !activeSignInWithOtp && (
            <div>
              <div className="gkrelativeq">
                {!hideInfo && (
                  <div className="user-msg">
                    <span className="user-cross" onClick={handleClose}>
                      <Image
                        className="icon-size"
                        src=""
                        alt="cross icon"
                        width={300}
                        height={100}
                        priority="true"
                      />
                    </span>
                    <span> 👋 Hi i have Information for you 👇</span>
                  </div>
                )}
              </div>
              <div className="container-player-rs">
                <div className="button-player-rs" onClick={handlePlayClick}>
                  <Image
                    src={`${panelImg}/assets/img/vip-images/ezgif.com-animated-gif-maker_27_pgoadq.gif`}
                    alt="acroll arrow"
                    width={300}
                    height={100}
                    style={{
                      width: "auto",
                      height: "auto",
                    }}
                    priority="true"
                  />
                  {/* <Image
                    src="/assets/ezgif.com-animated-gif-maker (27).gif"
                    width={1000}
                    height={300}
                    alt="hi! animation"
                    priority="true"
                  /> */}
                </div>
                {isActive && (
                  <div
                    className={`clip-player-rs ${
                      isActive ? "active-player-rs" : ""
                    }`}
                  >
                    <div className="video-cont-rs">
                      <div id="video-player"></div>
                      <div className="gk-relative">
                        <button
                          className="close-modal-rs cls__icon-rs"
                          onClick={handleCloseClick}
                          aria-label="cross"
                        >
                          x
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default VipVideoPlayer;
