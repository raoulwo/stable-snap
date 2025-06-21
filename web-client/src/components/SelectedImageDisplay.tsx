import React from "react";
// import ConstructionBegin from '../assets/construction_progress-start.jpg';

const SelectedImageDisplay: React.FC = () => {
    return (
        <div id="SelectedImageDisplay">
            {/*<b>SelectedImageDisplay</b>
            This shows a proper and large preview of the currently selected image
            // import reactLogo from './assets/react.svg'*/}
            <img className="rounded-md shadow-md border-1 border-gray-400" src="/construction_progress-start.jpg" />
        </div>
    );
}

export default SelectedImageDisplay;