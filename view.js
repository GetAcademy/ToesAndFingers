function updateView() {
    document.getElementById('app').innerHTML = /*HTML*/`
        ${createHtmlFromFingersAndToes()}
        <h3>Status</h3>
        <div class="checkbox ${getCheckedOrDisabled(true, 0)}"></div> Venstre hånd ${getCountText(true, 0)}<br/>
        <div class="checkbox ${getCheckedOrDisabled(false, 0)}"></div> Høyre hånd ${getCountText(false, 0)}<br/>
        <div class="checkbox ${getCheckedOrDisabled(true, 1)}"></div> Venstre fot ${getCountText(true, 1)}<br/>
        <div class="checkbox ${getCheckedOrDisabled(false, 1)}"></div> Høyre fot ${getCountText(false, 1)}<br/>
        <div class="checkbox ${getCheckedOrDisabled(false, null)}"></div> Høyre side ${getCountText(false, null)}<br/>
        <div class="checkbox ${getCheckedOrDisabled(true, null)}"></div> Venstre side ${getCountText(true, null)}<br/>
        <div class="checkbox ${getCheckedOrDisabled(null, 0)}"></div> Begge hender ${getCountText(null, 0)}<br/>
        <div class="checkbox ${getCheckedOrDisabled(null, 1)}"></div> Begge føtter ${getCountText(null, 1)}<br/>
        <div class="checkbox ${getCheckedOrDisabled(null, null)}"></div> Alt ferdig ${getCountText(null, null)}<br/>
    `;
}

function getCount(isLeftSide, type) {
    let total = 0;
    let done = 0;
    for (let fingerOrToe of model.fingersAndToes) {
        if (isLeftSide !== null && fingerOrToe.isLeftSide != isLeftSide) continue;
        if (type !== null && fingerOrToe.type != type) continue;
        total++;
        if (fingerOrToe.isDone) {
            done++;
        }
    }
    return { total, done };
}

function getCountText(isLeftSide, type) {
    const count = getCount(isLeftSide, type);
    return `(${count.done} av ${count.total})`;
}

function getCheckedOrDisabled(isLeftSide, type) {
    const count = getCount(isLeftSide, type);
    const isDone = count.done == count.total;
    return isDone ? 'checked' : 'disabled';
}

function createHtmlFromFingersAndToes() {
    let html = '';
    for (let index = 0; index < model.fingersAndToes.length; index++) {
        let fingerOrToe = model.fingersAndToes[index];
        html += /*HTML*/`
            <div 
                class="checkbox ${fingerOrToe.isDone ? 'checked' : ''}" 
                onclick="toggleIsFingerOrToeDone(${index})"
                >
            </div>
            ${getDescription(fingerOrToe)}
            <br/>
        `;
    }
    return html;
}

function getDescription(fingerOrToe) {
    const side = fingerOrToe.isLeftSide ? 'venstre' : 'høyre';
    const detail = model.names[fingerOrToe.index];

    if (Array.isArray(detail)) {
        return side + ' ' + detail[fingerOrToe.type];
    }
    // anta at detail er tekst
    const entity = fingerOrToe.type == 0 ? 'finger' : 'tå';
    return side + ' ' + detail + entity;
}