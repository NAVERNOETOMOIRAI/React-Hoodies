import ContentLoader from "react-content-loader";
import React from "react";
const Loader = () => {
    return(<div className='card'>
    <ContentLoader
        speed={2}
        width={160}
        height={265}
        viewBox="0 0 165 265"
        backgroundColor="#ecebeb"
        foregroundColor="#f3f3f3"

    >
        <rect x="0" y="0" rx="10" ry="10" width="155" height="112"/>
        <rect x="0" y="125" rx="5" ry="5" width="155" height="20"/>
        <rect x="1" y="160" rx="5" ry="5" width="100" height="20"/>
        <rect x="0" y="230" rx="5" ry="5" width="80" height="25"/>
        <rect x="116" y="223" rx="10" ry="10" width="30" height="32"/>
    </ContentLoader>
        </div>
    )
}
export default Loader;