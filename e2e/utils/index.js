export const SHORTKEY = process.platform === 'darwin' ? 'Meta' : 'Control';
export function getSelectionInTextNode() {
    const { anchorNode, anchorOffset, focusNode, focusOffset } = document.getSelection();
    return JSON.stringify([
        anchorNode.data,
        anchorOffset,
        focusNode.data,
        focusOffset,
    ]);
}
//# sourceMappingURL=index.js.map