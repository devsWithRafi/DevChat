const getPrivateRoomId = (id1, id2) => {
    return [id1, id2].sort().join('--with--');
};
export default getPrivateRoomId;
//# sourceMappingURL=getPrivateRoomId.js.map