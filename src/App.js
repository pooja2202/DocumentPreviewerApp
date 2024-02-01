import React, { useState } from "react";
import "./App.css";
import DocumentPreviewer from "./component/DocumentPreviewer/DocumentPreviewer";
import FormSection from "./component/FormSection/FormSection";
import documentData from "./section.json"; // Importing document data from a JSON file
import Header from "./component/Header/Header";

const App = () => {
  const [sectionsDataState, setSectionsDataState] = useState(
    documentData.data.sections // Initializing state with document data
  );
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [highlightPosition, setHighlightPosition] = useState(null);
  const [selectedField, setSelectedField] = useState(null);
  // Image source for document previewer
  const imageSrc = `${process.env.PUBLIC_URL + "/assets/highlighter.jpg"}`;

  // Function to handle field selection
  const handleFieldSelect = (field) => {
    setSelectedField(field);
    setSelectedLabel(field?.content?.value);
    setHighlightPosition(field?.content?.position);

    // Check the corresponding checkbox
    const updatedSectionsData = sectionsDataState.map((section) => ({
      ...section,
      children: section.children.map((child) => ({
        ...child,
        isChecked:
          field && child.id === field.id ? !child.isChecked : child.isChecked,
      })),
    }));
    setSectionsDataState(updatedSectionsData);
  };

  // Function to handle click on div in form field
  const handleDivClick = (label, value, position) => {
    setHighlightPosition(position);
    setSelectedLabel(value);
  };

  return (
    <>
      <Header />
      <div className="app-container">
        <div className="left-section">
          <FormSection
            section={sectionsDataState}
            selectedLabel={selectedLabel}
            handleDivClick={handleDivClick}
            sectionsData={sectionsDataState}
            setSectionsData={setSectionsDataState}
          />
        </div>
        <div className="right-section">
          <DocumentPreviewer
            src={imageSrc}
            highlightPosition={highlightPosition}
            selectedLabel={selectedLabel}
            onFieldSelect={handleFieldSelect}
            sectionsData={sectionsDataState}
          />
        </div>
      </div>
    </>
  );
};

export default App;
