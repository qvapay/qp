
// Calculate time since data
const timeSince = (date) => {

    const now = new Date();
    const secondsPast = (now.getTime() - date.getTime()) / 1000;

    if (secondsPast < 60) {
        const seconds = parseInt(secondsPast);
        return `${seconds} segundo${seconds > 1 ? 's' : ''}`;
    }
    if (secondsPast < 3600) {
        const minutes = parseInt(secondsPast / 60);
        return `${minutes} minuto${minutes > 1 ? 's' : ''}`;
    }
    if (secondsPast <= 86400) {
        const hours = parseInt(secondsPast / 3600);
        return `${hours} hora${hours > 1 ? 's' : ''}`;
    }
    if (secondsPast > 86400) {
        const day = parseInt(secondsPast / 86400);
        return `${day} dia${day > 1 ? 's' : ''}`;
    }
    if (secondsPast > 604800) {
        const week = parseInt(secondsPast / 604800);
        return `${week} semana${week > 1 ? 's' : ''}`;
    }
}

// String reduce function from P2P_796a9e71-3d67-4a42-9dc2-02a5d069fa23 to P2P_796a9e71
const reduceString = (string) => {
    return string.substring(0, 24);
}

// Get a long format date and return a short format date time
const getShortDateTime = (date) => {
    desiredDate = new Date(date);
    return desiredDate.toLocaleString('es-ES', { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true });
}

// get a QR data and parse it, get the usernam, amount and transactionUUID
const parseQRData = (data) => {

    // Require qp:// as protocol
    if (!data.startsWith('qp://')) {
        return null;
    }

    const params = data.replace('qp://', '').split(':');
    const parsedData = {};

    for (let i = 0; i < params.length; i += 2) {
        const key = params[i];
        const value = params[i + 1];

        switch (key) {
            case 'u':
                parsedData.username = value;
                break;
            case 'a':
                parsedData.amount = value;
                break;
            case 't':
                parsedData.transactionUUID = value;
                break;
            default:
                break;
        }
    }

    return parsedData;
};

// Check for a valid QR data
const isValidQRData = (parsedData) => {
    if (parsedData === null) {
        return false;
    }
    if ('transactionUUID' in parsedData) {
        return true;
    }
    return 'username' in parsedData && 'amount' in parsedData;
};

// export timeSince function
export { timeSince, reduceString, getShortDateTime, parseQRData, isValidQRData };