function getTextWidth(text, ref) {
    const font = getCanvasFont(ref.current);
    // re-use canvas object for better performance
    const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    const context = canvas.getContext("2d");
    context.font = font;
    const metrics = context.measureText(text);
    return metrics.width;
}

function getCssStyle(element, prop) {
    return window.getComputedStyle(element, null).getPropertyValue(prop);
}

function getCanvasFont(el = document.body) {
    const fontWeight = getCssStyle(el, 'font-weight') || 'normal';
    const fontSize = getCssStyle(el, 'font-size') || '16px';
    const fontFamily = getCssStyle(el, 'font-family') || 'Times New Roman';

    return `${fontWeight} ${fontSize} ${fontFamily}`;
}

function getTrimmedText(text, ref, directory = false){
    const widthRatio = getTextWidth(text, ref) / (directory ? ref.current.offsetWidth - 16 : ref.current.offsetWidth);

    if(widthRatio < 0.98) return text;

    const textLength = text.length / widthRatio - 4;
    return text.substring(0, textLength) + "...";
}

export {getTrimmedText};