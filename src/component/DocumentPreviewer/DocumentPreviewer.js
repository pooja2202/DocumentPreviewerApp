import React, { useState } from "react";
import documentData from "../../section.json";

const DocumentPreviewer = ({
  src,
  highlightPosition,
  selectedLabel,
  onFieldSelect,
  sectionsData,
  handleDivClick,
}) => {
  const [zoomLevel, setZoomLevel] = useState("fit");

  const handleZoomChange = (e) => {
    setZoomLevel(e.target.value);
  };

  //Function to handle zoom on document
  const calculateZoomStyle = () => {
    switch (zoomLevel) {
      case "fit":
        return { width: "100%", height: "auto" };
      case "75%":
        return { width: "75%", height: "auto" };
      case "100%":
        return { width: "100%", height: "auto" };
      default:
        return { width: "100%", height: "auto" };
    }
  };

  // Function to handle image click
  const handleImageClick = (event) => {
    const x = event.nativeEvent.offsetX;
    const y = event.nativeEvent.offsetY;
    for (const section of documentData?.data?.sections || []) {
      for (const field of section?.children || []) {
        if (
          field?.content?.position &&
          x >= field.content.position[0] / 1.33 &&
          x <= field.content.position[2] / 1.33 &&
          y >= field.content.position[1] / 1.33 &&
          y <= field.content.position[3] / 1.33
        ) {
          onFieldSelect(field); // Update the selected field
          return;
        }
      }
    }
    // If no corresponding field is found, clear the selection
    onFieldSelect(null);
  };

  return (
    <div className="document-previewer">
      <div className="zoom-dropdown">
        <label htmlFor="zoom-select">Zoom:</label>
        <select id="zoom-select" value={zoomLevel} onChange={handleZoomChange}>
          <option value="fit">Fit</option>
          <option value="75%">75%</option>
          <option value="100%">100%</option>
        </select>
      </div>
      <div className="image-container" onClick={handleImageClick}>
        <img
          src={src}
          alt="Previewed Document"
          className="highlighted-image"
          style={calculateZoomStyle()}
        />
        {highlightPosition && (
          <div
            className="highlight-box"
            style={{
              position: "absolute",
              left: highlightPosition[0] / 1.33, // since image's aspect ratio is changed then same calculation applied for plotting highlighting box
              top: highlightPosition[1] / 1.33,
              right: highlightPosition[2] / 1.33,
              bottom: highlightPosition[3] / 1.33,
              width: highlightPosition[2] / 1.33 - highlightPosition[0] / 1.33,
              height: highlightPosition[3] / 1.33 - highlightPosition[1] / 1.33,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default DocumentPreviewer;
