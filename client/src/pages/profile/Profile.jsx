import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import Update from "../../components/update/Update";
import { useState } from "react";
import RightBar from "../../components/rightBar/RightBar";

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const userId = parseInt(useLocation().pathname.split("/")[2]);

  const { isLoading, error, data } = useQuery(["user"], () =>
    makeRequest.get("/users/find/" + userId).then((res) => {
      // console.log(error);
      return res.data;
    })
  );

  const { isLoading: rIsLoading, data: relationshipData } = useQuery(
    ["relationship"],
    () =>
      makeRequest.get("/relationships?followedUserId=" + userId).then((res) => {
        // console.log("here: "+ data);
        return res.data;
      })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (following) => {
      // console.log(following)
      if (following)
        return makeRequest.delete("/relationships?userId=" + userId);
      return makeRequest.post("/relationships", { userId });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["relationship"]);
      },
    }
  );

  const handleFollow = () => {
    mutation.mutate(relationshipData.includes(currentUser.id));
  };

  return (
      <div className="profile">
        {isLoading ? (
          "loading"
        ) : (
          <>
            <div className="images">
              {data.profilePic}
              <img src={(data.coverPic !== null) ? "https://raw.githubusercontent.com/Parathps7/Images_by_users/main/" + data.coverPic : "https://raw.githubusercontent.com/Parathps7/Images_by_users/main/cover.png"} alt="" className="cover" />
              <img src={(currentUser.profilePic !== null) ? ("https://raw.githubusercontent.com/Parathps7/Images_by_users/main/" + currentUser.profilePic) : "https://raw.githubusercontent.com/Parathps7/Images_by_users/main/170880668526934AD2.jpg"} alt="" className="profilePic" />
            </div>
            <div className="profileContainer">
              <div className="uInfo">
                <div className="left">
                  <a href="http://facebook.com">
                    <FacebookTwoToneIcon fontSize="large" />
                  </a>
                  <a href="http://instagram.com">
                    <InstagramIcon fontSize="large" />
                  </a>
                  <a href="http://x.com">
                    <TwitterIcon fontSize="large" />
                  </a>
                  <a href="http://linkedin.com">
                    <LinkedInIcon fontSize="large" />
                  </a>
                  <a href="http://pinterest.com">
                    <PinterestIcon fontSize="large" />
                  </a>
                </div>
                <div className="center">
                  <span>{data.name}</span>
                  <div className="info">
                    <div className="item">
                      <PlaceIcon />
                      <span>{data.city}</span>
                    </div>
                    <div className="item">
                      <LanguageIcon />
                      <span>{data.website}</span>
                    </div>
                  </div>
                  {rIsLoading ? (
                    "loading"
                  ) : userId === currentUser.id ? (
                    <button onClick={() => setOpenUpdate(true)}>update</button>
                  ) : (
                    <button onClick={handleFollow}>
                      {relationshipData.includes(currentUser.id)
                        ? "Following"
                        : "Follow"}
                    </button>
                  )}
                </div>
                <div className="right">
                  <EmailOutlinedIcon />
                  <MoreVertIcon />
                </div>
              </div>
              <Posts userId={userId} />
            </div>
          </>
        )}
        {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
      </div>
  );
};

export default Profile;
