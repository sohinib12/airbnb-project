export default function ReviewUser({ user }) {
  return (
    <div className="review-user-container">
      {/* <i className="fas fa-user-circle avatar" /> */}
      <i className="fas fa-user-circle" />
      <div>{user.firstName}</div>
      <div>{user.lastName}</div>
    </div>
  );
}
