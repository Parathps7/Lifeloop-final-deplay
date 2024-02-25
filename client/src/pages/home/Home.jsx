import Stories from "../../components/stories/Stories"
import Posts from "../../components/posts/Posts"
import Share from "../../components/share/Share"
import RightBar from "../../components/rightBar/RightBar"
import "./home.scss"

const Home = () => {
  return (
    <div className="home" style={{display:"flex"}}>
      <div>
        <Share />
        <Posts />
      </div>
        <RightBar />
    </div>
  )
}

export default Home