export default {
  control: {
    fontSize: 14,
    fontWeight: "normal",
    backgroundColor: "transparent",
    borderRadius: "5px"
  },

  "&multiLine": {
    control: {
      fontFamily: "monospace",
      minHeight: 63,
    },
    highlighter: {
      padding: 9,
      border: "1px solid transparent",
    },
    input: {
      padding: 9,
      border: "1px solid silver",
    },
  },

  "&singleLine": {
    display: "flex",
    width: "100%",
    flex: "1 1 0%",
    outlineStyle: "none",
    marginTop: "0.5rem",

    highlighter: {
      padding: 1,
      border: "2px inset transparent",
    },
    input: {
      padding: 1,
      border: "none",
      backgroundColor: "transparent",
      borderRadius: "5px"
    },
  },

  suggestions: {
    list: {
      backgroundColor: "white",
      border: "1px solid rgba(0,0,0,0.15)",
      fontSize: 14,
      position: "absolute",
      bottom: "10px",
      width: "170px"
    },
    item: {
      padding: "5px 15px",
      borderBottom: "1px solid rgba(0,0,0,0.15)",
      minWidth: "170px",
      "&focused": {
        backgroundColor: "#cee4e5",
      },
    },
  },
};
