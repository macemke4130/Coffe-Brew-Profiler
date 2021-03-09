const formatFromSeconds = (seconds: number) => {
    seconds = Number(seconds);
    return Math.floor(seconds / 60) + ":" + (seconds % 60)
};

export default formatFromSeconds;