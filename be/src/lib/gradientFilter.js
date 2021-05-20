import isNil from "lodash/isNil";

class Gradient {
  constructor({ categories } = {}) {
    this.categories = categories || {};
    this.gradientDict = {};
  }

  initialGradientDict(categories = {}) {
    this.setGradientDict(categories, {});
  }

  setGradientDict(categories = {}, initialDict) {
    Object.values(categories)
      .reduce((acc, curr) => {
        if (isNil(acc[curr])) {
          acc[curr] = this.getGradientColor(curr);
        }
        return acc;
      }, initialDict || this.gradientDict);
  }

  get gradient() {
    return this;
  }

  setSingleGradient(categoryName) {
    this.gradientDict[categoryName] = this.getGradientColor(categoryName);
    return this.gradient;
  }

  getGradientSingleColor(categoryName) {
    return this.gradientDict[categoryName];
  }

  getGradientColor(categoryName) {
    switch (categoryName) {
      case "watcha" || "WATCHA":
        return "linear-gradient(90deg, rgba(251,63,138,0.5984768907563025) 0%, rgba(255,48,172,1) 100%)";
      case "netflix" || "NETFLIX":
        return "linear-gradient(90deg, rgba(65,75,75,0.7105217086834734) 0%, rgba(197,206,212,1) 100%)";
      case "etc" || "ETC":
        return "linear-gradient(90deg, rgba(63,245,251,0.7105217086834734) 0%, rgba(70,141,180,1) 100%)";
      case "ktx" || "KTX":
        return "linear-gradient(90deg, rgba(77,63,251,0.7105217086834734) 0%, rgba(70,104,180,1) 100%)";
      case "adobe" || "ADOBE":
        return "linear-gradient(90deg, rgba(251,244,63,0.9990371148459384) 0%, rgba(180,158,70,1) 100%)";
      case "roommate" || "roomMate" || "ROOMMATE":
        return "linear-gradient(90deg, rgba(147,251,63,1) 14%, rgba(70,252,166,1) 100%)";
      case "food" || "FOOD":
        return "linear-gradient(90deg, rgba(251,153,63,0.9990371148459384) 0%, rgba(255,213,48,1) 100%)";
      default:
        return "linear-gradient(90deg, rgba(65,75,75,0.7105217086834734) 0%, rgba(197,206,212,1) 100%)";
    }
  }
}

export default Gradient;