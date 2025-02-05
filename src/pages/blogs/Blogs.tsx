import { useEffect } from "react";
import Banner from "../../components/hero/Hero"
import Header from "../../components/navigation/Navigation"
import BlogComponent from "../../components/blog/BlogComponent"
import { useWindowScroll } from "../../hooks/useWindowScroll";
const Blogs = () => {
    const { scrollPosition, resetWindowPosition } = useWindowScroll();
    useEffect(() => {
        if (scrollPosition.y > 0)
            resetWindowPosition();
    }, []);
    return (
        <>
            <Header />
            <Banner section={'blogs'} />
            <BlogComponent />
        </>
    )
}
export default Blogs