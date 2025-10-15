const UserProfilePage = ({ username }) => {
  return <h1>{username}</h1>;
};

export default UserProfilePage;

export async function getServerSideProps({ params, req, res }) {
  return {
    props: {
      username: "Max",
    },
  };
}
