if(!window.SelectGo){
  SelectGo = {};
}

SelectGo.Selector = {};
SelectGo.Selector.getSelected = function(){
  var text = '';
  if(window.getSelection){
    text = window.getSelection().toString();
  }else if(document.selection){
    text = document.selection.createRange().text;
  }else if(document.getSelection){
    text = document.getSelection().toString();
  }
  return text;
}

SelectGo.Selector.mouseup = function(){
  var text = SelectGo.Selector.getSelected();
  if(text!=''){
    chrome.runtime.sendMessage({
      type: 'tab',
      text: text
    });
    chrome.runtime.sendMessage({
      type: 'copy',
      text: text
    });
  }
}

$(document).ready(function(){
  $(document).on("mouseup", SelectGo.Selector.mouseup);
  // Trigger action on option select
  $("#save").click(function() {
    saveChanges();
  });

});

function saveChanges() {
  var theValue = $("input[name='selectVal']:checked").val();
  alert(theValue); // Debug

  // Save option selected and sync
  chrome.storage.sync.set({'option': theValue}, function() {
    console.log(theValue);
  });
}
