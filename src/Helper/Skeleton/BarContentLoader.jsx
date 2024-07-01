
import React from 'react'
import ContentLoader from "react-content-loader";


function BarContentLoader() {
    return (
        <ContentLoader
            backgroundColor="#ededed"
            foregroundColor="#3b5a81"
            width='100%' height='100%' viewBox="0 20 200 200" cursor='wait' >
            <rect x="0%" y="80%" rx="0" ry="0" width="12.5%" height="20%" />
            <rect x="15%" y="70%" rx="0" ry="0" width="12.5%" height="27.5%" />
            <rect x="30%" y="63%" rx="0" ry="0" width="12.5%" height="37%" />
            <rect x="45%" y="40%" rx="0" ry="0" width="12.5%" height="60%" />
            <rect x="60%" y="71%" rx="0" ry="0" width="12.5%" height="29%" />
        </ContentLoader>
    )
}

export default BarContentLoader;