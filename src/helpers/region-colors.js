//

function regionColor(region) {

    const normalized = region?.toLowerCase();

    switch (normalized) {
        case 'americas' :
        case 'europe' :
        case 'asia' :
        case 'oceania' :
        case 'antarctic' :
            return normalized;
        default :
            return "region-not-recognized"
    }
}

export default regionColor;