function updateView() {            
    document.getElementById('app').innerHTML = /*HTML*/`
        ${createHtmlFromFingersAndToes()}
        <h3>Status</h3>
        <div class="checkbox disabled"></div> Venstre hånd<br/>
        <div class="checkbox disabled"></div> Høyre hånd<br/>
        <div class="checkbox disabled"></div> Venstre fot<br/>
        <div class="checkbox disabled"></div> Høyre fot<br/>
        <div class="checkbox disabled"></div> Høyre side<br/>
        <div class="checkbox disabled"></div> Venstre side<br/>
        <div class="checkbox disabled"></div> Begge hender<br/>
        <div class="checkbox disabled"></div> Begge føtter<br/>
        <div class="checkbox disabled"></div> Alt ferdig<br/>
    `;
}

function createHtmlFromFingersAndToes(){
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