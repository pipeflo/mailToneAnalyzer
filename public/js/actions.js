/**
* Print out Verse API data for all the action samples
*/
window.addEventListener("message", function(event) {

  if (window.self !== window.top){
    // Add check for the event origin here
    console.log(event);

    if (event.data.verseApiType === "com.ibm.verse.action.clicked"){
      var mailContext = event.data;
      console.log("MailContext:", event.data);
      var texto = extractContent(mailContext.verseApiData.context.body);
      $('#texto').val($('#texto').val() + "\n" + texto);
    }

    /**
     * Message from Verse to check whether your web application is ready.
     */
    if (event.data.verseApiType === "com.ibm.verse.ping.application.loaded") {
      var loaded_message = {
        verseApiType: 'com.ibm.verse.application.loaded'
      };
      /**
       * Your application must send a message back to Verse
       * to identify that it's ready to receive data from Verse.
       */
      event.source.postMessage(loaded_message, event.origin);
    }
  }
}, false);

function extractContent(s) {
  var span = document.createElement('span');
  span.innerHTML = s;
  return span.textContent || span.innerText;
};
