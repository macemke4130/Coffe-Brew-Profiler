const formatFromSeconds = (source: number) => {
    source = Number(source);

    let minutes = Math.floor(source / 60);
    let seconds = source % 60;

    if (seconds < 10) {
        return minutes + ":0" + seconds;
    } else {
        return minutes + ":" + seconds;
    }
};

export default formatFromSeconds;