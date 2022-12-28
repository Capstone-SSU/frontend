
const StartLast = (num) => {
    var lectures2 = '';

    for (var s = Math.round(num); s < 5; s++)
    lectures2 += '⭐';

    return lectures2;
};

export default StartLast;