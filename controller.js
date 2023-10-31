function toggleIsFingerOrToeDone(index) {
    model.fingersAndToes[index].isDone = !model.fingersAndToes[index].isDone;
    updateView();
}