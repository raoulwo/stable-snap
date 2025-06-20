import React from "react";
// import ConstructionBegin from '../assets/construction_progress-start.jpg';

const SelectedImageDisplay: React.FC = () => {
    return (
        <div id="SelectedImageDisplay" className="bg-gray-400">
            <b>SelectedImageDisplay</b>
            This shows a proper and large preview of the currently selected image
            // import reactLogo from './assets/react.svg'
            <img src="/construction_progress-start.jpg" />
        </div>
    );
}

export default SelectedImageDisplay;