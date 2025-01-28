import Banner from "../../components/banner/Banner"
import Header from "../../components/header/Header"
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