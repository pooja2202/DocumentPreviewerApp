import React, { useState } from "react";
import Popup from "../Popup/Popup";
import classes from "./FormSection.module.css";
import { generateRandomColor, getInitials } from "../../utils/utils";

const FormSection = ({
  section,
  selectedLabel,
  handleDivClick,
  sectionsData,
  setSectionsData,
}) => {
  const [selectedFields, setSelectedFields] = useState([]);
  const [showDropdowns, setShowDropdowns] = useState([]);
  const [selectAllText, setSelectAllText] = useState("Select All");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Function to toggle popup
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  // Function to handle checkbox change
  const handleCheckboxChange = (field) => {
    const selectedIndex = selectedFields.findIndex(
      (selectedField) => selectedField.id === field.id
    );
    if (selectedIndex === -1) {
      setSelectedFields([...selectedFields, field]);
      handleDivClick(
        field?.label,
        field?.content?.value,
        field?.content?.position
      );
    } else {
      const updatedSelectedFields = [...selectedFields];
      updatedSelectedFields.splice(selectedIndex, 1);
      setSelectedFields(updatedSelectedFields);
      //   handleDivClick("", "", []);
    }
  };

  // Function to handle select all
  const handleSelectAll = () => {
    if (selectedFields.length === sectionsData.length) {
      setSelectedFields([]);
      setSelectAllText("Select All");
      // Uncheck all checkboxes
      const updatedSectionsData = sectionsData.map((section) => ({
        ...section,
        children: section.children.map((child) => ({
          ...child,
          isChecked: false,
        })),
      }));
      setSectionsData(updatedSectionsData);
    } else {
      setSelectedFields([...sectionsData]);
      setSelectAllText("Deselect All");
      // Check all checkboxes
      const updatedSectionsData = sectionsData.map((section) => ({
        ...section,
        children: section.children.map((child) => ({
          ...child,
          isChecked: true,
        })),
      }));
      setSectionsData(updatedSectionsData);
    }
  };

  // Function to handle confirm action
  const handleConfirm = () => {
    togglePopup();
    console.log("Confirm button clicked");
  };

  // Function to handle remove action
  const handleRemove = (field, index) => {
    const updatedSelectedFields = selectedFields.filter(
      (selectedField) => selectedField.id !== field.id
    );
    setSelectedFields(updatedSelectedFields);

    const updatedSectionsData = sectionsData.map((section) => ({
      ...section,
      children: section.children.filter((child) => child.id !== field.id),
    }));
    setSectionsData(updatedSectionsData);
    toggleDropdown(index);
  };

  // Function to toggle ... remove dropdown
  const toggleDropdown = (index) => {
    const updatedDropdowns = [...showDropdowns];
    updatedDropdowns.fill(false);
    updatedDropdowns[index] = !showDropdowns[index];
    setShowDropdowns(updatedDropdowns);
  };

  return (
    <>
      <div className={classes.position_rel}>
        <div key={section.id} className="section">
          {sectionsData.map((section) => (
            <div key={section.id} className={classes.fieldContainer}>
              {section.children.map((field, fieldIndex) => (
                <div key={field.id} className={classes.fieldContainer}>
                  <div
                    className={`field ${
                      selectedLabel === field?.content?.value ? "selected" : ""
                    } ${classes.inner_section_config}`}
                  >
                    <div
                      className={`${classes.initial_letter_div_config} ${classes.color_black}`}
                      style={{
                        backgroundColor: `${generateRandomColor()}7F`, // Alpha opacity : corresponds to approximately 50% opacity.
                        opacity: 1,
                      }}
                    >
                      {getInitials(field?.label)}
                    </div>

                    <div className={classes.display_label_config}>
                      <label>{field?.label}: </label>
                      <p className={classes.margin_3}>
                        {field?.content?.value}
                      </p>
                    </div>
                    <div className={classes.display_fl_config}>
                      <div style={{ flexGrow: 1 }}>
                        <label
                          htmlFor={`field_${field.id}`}
                          aria-labelledby={`field_${field.id}`}
                          name={`field_${field.id}`}
                        ></label>
                        <input
                          id={`field_${field.id}`}
                          name={`field_${field.id}`}
                          type="checkbox"
                          className={classes.input_checkbox}
                          onChange={() => handleCheckboxChange(field)}
                          checked={field.isChecked} // Add checked property
                          aria-labelledby={`field_${field.id}`}
                        />
                      </div>
                      <div className={classes.position_rel}>
                        <button
                          onClick={() => toggleDropdown(fieldIndex)}
                          className={classes.more_btn_config}
                        >
                          ...
                        </button>
                        {showDropdowns[fieldIndex] && (
                          <div className={classes.remove_btn_config}>
                            <label
                              className={classes.color_white}
                              onClick={() => handleRemove(field, fieldIndex)}
                            >
                              Remove
                            </label>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className={classes.footer_btn_group}>
          <button
            onClick={handleSelectAll}
            className={`${classes.w_50} ${classes.btn_all_config}`}
          >
            {selectAllText}
          </button>
          <button
            className={`${classes.w_50} ${classes.btn_config}`}
            onClick={handleConfirm}
            disabled={selectedFields.length === 0}
            style={{
              background:
                selectedFields.length === 0
                  ? "#d2d2d2  0% 0% no-repeat padding-box"
                  : "#28a745 0% 0% no-repeat padding-box",
            }}
          >
            Confirm
          </button>
          {isPopupOpen && <Popup onClose={togglePopup} />}
        </div>
      </div>
    </>
  );
};

export default FormSection;
