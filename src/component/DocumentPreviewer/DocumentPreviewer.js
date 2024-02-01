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

  // Function to handle zoom on document
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

  // Function to calculate highlighted box dimensions with respect to zoom
  const calculateHighlightBoxDimensions = () => {
    const zoomFactor = calculateZoomFactor(); // Get the current zoom factor
    const adjustedHighlightPosition = highlightPosition.map(
      (pos) => pos * zoomFactor
    ); // Adjust position based on zoom level
    const width = adjustedHighlightPosition[2] - adjustedHighlightPosition[0];
    const height = adjustedHighlightPosition[3] - adjustedHighlightPosition[1];

    const left = adjustedHighlightPosition[0] / 1.33;
    const top = adjustedHighlightPosition[1] / 1.33;
    const right = adjustedHighlightPosition[2] / 1.33;
    const bottom = adjustedHighlightPosition[3] / 1.33;

    return {
      left,
      top,
      right,
      bottom,
      width,
      height,
    };
  };

  const calculateZoomFactor = () => {
    switch (zoomLevel) {
      case "fit":
        return 1; // no zoom
      case "75%":
        return 0.75; // 75% zoom
      case "100%":
        return 1; // 100% zoom
      default:
        return 1; // default to no zoom
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
              ...calculateHighlightBoxDimensions(), // Apply calculated dimensions
            }}
          />
        )}
      </div>
    </div>
  );
};

export default DocumentPreviewer;
