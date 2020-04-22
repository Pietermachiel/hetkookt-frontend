module.exports = {
  important: true,
  theme: {
    extend: {
      minHeight: {
        "250": "250px",
        full70: "calc(100% - 70px)",
      },
      colors: {
        badge: "#e6e6e6",
        week: "#c5c5c5",
        rose: "mistyrose",
        red: {
          100: "#fff5f5",
          200: "#fed7d7",
          300: "#feb2b2",
          400: "#fc8181",
          500: "#f56565",
          600: "#e53e3e",
          700: "#c53030",
          800: "#9b2c2c",
          900: "#742a2a",
        },
        orange: {
          100: "#fffaf0",
          200: "#feebc8",
          300: "#fbd38d",
          400: "#f6ad55",
          500: "#ed8936",
          600: "#dd6b20",
          700: "#c05621",
          800: "#9c4221",
          900: "#7b341e",
        },
      },
      borderRadius: {
        "50": "50%",
      },
      spacing: {
        "0": "0",
        "1": "1px",
        "2": "2px",
        "3": "3px",
        "4": "4px",
        "5": "5px",
        "6": "6px",
        "7": "7px",
        "8": "8px",
        "9": "9px",
        "10": "10px",
        "11": "11px",
        "12": "12px",
        "14": "14px",
        "15": "15px",
        "16": "16px",
        "18": "18px",
        "20": "20px",
        "21": "21px",
        "24": "24px",
        "25": "25px",
        "28": "28px",
        "30": "30px",
        "36": "36px",
        "40": "40px",
        "48": "48px",
        "50": "50px",
        "54": "54px",
        "60": "60px",
        "70": "70px",
        "72": "72px",
        "80": "80px",
        "90": "90px",
        "100": "100px",
        "150": "150px",
        "200": "200px",
        "250": "250px",
        "500": "500px",
      },
      fontFamily: {
        sans: ["MuseoSans"],
        mono: ["Fira Mono"],
      },
      fontSize: {
        "12": "12px",
        "14": "14px",
        "16": "16px",
        "18": "18px",
        "19": "19px",
        "20": "20px",
        "21": "21px",
        "22": "22px",
        "23": "23px",
        "24": "24px",
        "28": "28px",
        "30": "30px",
        "36": "36px",
        "42": "42px",
        "48": "48px",
        "54": "54px",
        "60": "60px",
        "72": "72px",
      },
      fontWeight: {
        "100": "100",
        "200": "200",
        "300": "300",
        "400": "400",
        "500": "500",
        "600": "600",
        "700": "700",
        "800": "800",
        "900": "900",
      },
      width: (theme) => ({
        ...theme("spacing"),
        "1/2/10": "calc(50% - 10px)",
        "1/2/15": "calc(50% - 15px)",
        "1/3/15": "calc(33.333333% - 15px)",
        "1/4/15": "calc(25% - 15px)",
        "50": "50%",
      }),
    },
  },
  variants: {},
  plugins: [],
};
