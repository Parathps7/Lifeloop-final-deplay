import "./rightBar.scss";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useLocation } from "react-router-dom";

const RightBar = () => {
  const { currentUser } = useContext(AuthContext);
  // const [isFollowing, setIsFollowing] = useState(false);
  const queryClient = useQueryClient();

  // Function to handle follow/unfollow
  const handleFollow = async (userIdToFollow) => {
    console.log(userIdToFollow)
    try {
      if (relationshipData.includes(userIdToFollow)) {
        await makeRequest.delete("/relationships?userId=" + userIdToFollow);
      } else {
        await makeRequest.post("/relationships", { userId: userIdToFollow });
      }
      
      // Invalidate and refetch relationship data
      queryClient.invalidateQueries(["relationship"]);
      // setIsFollowing(!isFollowing); // Toggle the follow state
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Fetch relationship data using React Query
  const { isLoading: rIsLoading, data: relationshipData } = useQuery(
    ["relationship"],
    () => {
      return makeRequest
        .get("/relationships/abc?followerUserId=" + currentUser.id)
        .then((res) => {
          console.log(res.data);
          return res.data;
        });
    }
  );
  

  const { isLoading, error, data } = useQuery(["users"], () =>
    makeRequest.get("/users").then((res) => res.data)
  );

  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Cinophiles</span>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error.message}</p>
          ) : (
            <div>
              {data.map((user) => (
                (user.id !== currentUser.id) &&
                (<div className="user" key={user.id}>
                  <div className="userInfo">
                    <img
                      src={
                        user.profilePic !== null
                          ? "https://raw.githubusercontent.com/Parathps7/Images_by_users/main/" +
                            user.profilePic
                          : "https://raw.githubusercontent.com/Parathps7/Images_by_users/main/170880668526934AD2.jpg"
                      }
                      alt={user.name}
                    />
                    <span>{user.username}</span>
                  </div>
                  <div className="buttons">
                    {
                      console.log(relationshipData)
                    }
                    <button onClick={() => handleFollow(user.id)}>
                      {
                        console.log(relationshipData, user.id)
                      }
                      {
                        relationshipData && 
                      relationshipData.includes(user.id) ? "Following" : "Follow"
                      }

                    </button>
                  </div>
                </div>)
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RightBar;
