export default function ReviewUser({ user }) {
  return (
    <div className="review-user-container">
      <i className="fas fa-user-circle avatar" />
      <div>{user.firstName}</div>
      <div>{user.lastName}</div>
    </div>
  );
}
