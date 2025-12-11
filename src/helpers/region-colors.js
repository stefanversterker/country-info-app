//

function regionColor(region) {
    switch (region) {
        case 'americas' :
        case 'europe' :
        case 'asia' :
        case 'oceania' :
        case 'antarctic' :
            return region;
        default :
            return "region-not-recognized"
    }
}

export default regionColor;