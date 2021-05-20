/**
 * @param {Topic} topic 
 * @param {User} user deep populate 된 user. User.findByStudentNumber 를 사용할 것 
 * @returns {Boolean} true면 중복된 유저임
 */
const roomJoinGuard = (topic, user) => {
  return user.joinIn.some((userJoinedRoom) => {
    return userJoinedRoom.topic.category === topic.category;
  })
}

export default roomJoinGuard;