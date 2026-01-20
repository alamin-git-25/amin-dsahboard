
export const toggleFullScreen = (element = document.documentElement) => {
    if (!document.fullscreenElement) {
        element.requestFullscreen?.() ||
            element.mozRequestFullScreen?.() ||
            element.webkitRequestFullscreen?.() ||
            element.msRequestFullscreen?.();
    } else {
        document.exitFullscreen?.() ||
            document.mozCancelFullScreen?.() ||
            document.webkitExitFullscreen?.() ||
            document.msExitFullscreen?.();
    }
};
