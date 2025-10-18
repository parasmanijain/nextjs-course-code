import { UserProfile } from "@/components/profile/UserProfile";
import { getSession } from "next-auth/react";

function ProfilePage({session}) {
  return <UserProfile session={session} />;
}

export async function getServerSideProps({ req }) {
 const session = await getSession({ req });

 if(!session) {
  return {
    redirect:{
      destination: '/auth',
      permanent:false
    }
  }
 }

 return  {
  props:{
    session
  }
 }
}

export default ProfilePage;
