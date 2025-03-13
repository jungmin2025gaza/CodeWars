window.addEventListener("load", () => {
  CodeMirror.fromTextArea(document.getElementById("code"), {
    mode: "javascript",
    matchedBrackets: true,
    lineNumbers: true,
  });

  document.getElementById("submitBtn").addEventListener("click", () => {
    const code = CodeMirror.getValue(document.getELementById("code"));
    document.getElementById("code").value = code;
  });
});
