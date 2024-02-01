export const generateRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color;
  do {
    color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
  } while (color === "#FFFFFF" || color === "#000000");
  return color;
};

export const getInitials = (label) => {
  const words = label.split(" ");
  return words.map((word) => word.charAt(0)).join("");
};
