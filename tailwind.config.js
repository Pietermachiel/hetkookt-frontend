module.exports = {
  important: true,
  theme: {
    extend: {
      minHeight: {
        "220": "220px",
        "250": "250px",
        full70: "calc(100% - 70px)",
      },
      colors: {
        offblack: "#1d1d1d",
        badge: "#e6e6e6",
        week: "#c5c5c5",
        rose: {
          100: "#f1e7e6",
          200: "mistyrose",
        },
        papier: "#f9f3dc",
        rood: "red",
        background: "#eff2f5",
        kookschrift: "#d8d1ce",
        footer: "#b3b5bb",
        voorraad: "#b57602",
        red: {
          100: "#ffe4e1", // #f5c5c5
          200: "#ff9191",
          300: "#f57676",
          400: "#ff5c5c",
          500: "#ff3030",
          600: "#e82d2d",
          700: "#c52626",
          800: "#901d1d",
          900: "#2b1515",
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
        indigo: {
          100: "#ebf4ff",
          200: "#c3dafe",
          300: "#a3bffa",
          400: "#7f9cf5",
          500: "#667eea",
          600: "#3b4de2",
          700: "#4c51bf",
          800: "#434190",
          900: "#3c366b",
        },
        gray: {
          300: "#e3e8ef",
          400: "#ced3d8",
          500: "#808080",
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
        "13": "13px",
        "14": "14px",
        "15": "15px",
        "16": "16px",
        "17": "17px",
        "18": "18px",
        "20": "20px",
        "21": "21px",
        "24": "24px",
        "25": "25px",
        "28": "28px",
        "30": "30px",
        "32": "32px",
        "36": "36px",
        "40": "40px",
        "42": "42px",
        "45": "45px",
        "48": "48px",
        "50": "50px",
        "54": "54px",
        "60": "60px",
        "70": "70px",
        "72": "72px",
        "80": "80px",
        "90": "90px",
        "100": "100px",
        "125": "125px",
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
        "15": "15px",
        "16": "16px",
        "17": "17px",
        "18": "18px",
        "19": "19px",
        "20": "20px",
        "21": "21px",
        "22": "22px",
        "23": "23px",
        "24": "24px",
        "28": "28px",
        "30": "30px",
        "32": "32px",
        "36": "36px",
        "40": "40px",
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
        "70": "70px",
        "550": "550px",
      }),
      zIndex: {
        auto: "auto",
        "0": "0",
        "10": "10",
        "20": "20",
        "30": "30",
        "40": "40",
        "50": "50",
        "100": "100",
      },
    },
  },
  variants: {},
  plugins: [],
};
