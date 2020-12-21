const getRoomCode = (path: string) => {
  const splited = path.split("/"),
    splitedLength = splited.length;
    
  let codeName = splitedLength > 2 ? splited[2] : "";

  return codeName;
};

export default getRoomCode;