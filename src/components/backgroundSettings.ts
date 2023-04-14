export type BackgroundSettings = {
  color: string;
  blur: string;
  opacity: string;
  invert: "1" | "0";
};

// Retrieve the background settings from local storage
const savedBackgroundSettingsString = localStorage.getItem(
  "savedBackgroundSettings"
);

// Define the function to update local storage with the background settings
const updateSavedBackgroundSettings = (
  savedBackgroundSettings: BackgroundSettings
) => {
  localStorage.setItem(
    "savedBackgroundSettings",
    JSON.stringify(savedBackgroundSettings)
  );
};

export const initialBackgroundSettings = savedBackgroundSettingsString
  ? JSON.parse(savedBackgroundSettingsString)
  : {
      savedBackgroundSettings: {
        color: "#000000",
        blur: "0",
        opacity: "1",
        invert: "0",
      },
    };

updateSavedBackgroundSettings(initialBackgroundSettings);
