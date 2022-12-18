export default function ReviewUser({ user }) {
  return (
    <div className="review-user-container">
      {/* <i className="fas fa-user-circle avatar" /> */}
      <i class="fa-solid fa-user"></i>
      <div>{user.firstName}</div>
      <div>{user.lastName}</div>
    </div>
  );
}
