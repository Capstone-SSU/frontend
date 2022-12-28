
const pathnameId = (current) => {
    return parseInt(current.split("/")[6]);
};

export default pathnameId;