const formateTimes = (time: string | Date) => {
    const now = new Date(time);
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';

    // Convert 24-hour time to 12-hour time
    hours = hours % 12;
    hours = hours ? hours : 12; // '0' hour should be '12'

    // Add leading zero to minutes if needed
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

    const formattedTime = hours + ':' + formattedMinutes + ampm;

    return formattedTime;
};

export default formateTimes;
