import Banner from "../../components/hero/Hero"
import Header from "../../components/navigation/Navigation"
import BlogComponent from "../../components/blog/BlogComponent"
const Blogs = () => {
    return (
        <>
            <Header />
            <Banner section={'blogs'} />
            <BlogComponent />
        </>
    )
}
export default Blogs