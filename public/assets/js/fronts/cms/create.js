(()=>{"use strict";$(document).ready((function(){$("#shortDescription").on("keyup",(function(){$("#shortDescription").attr("maxlength",800)})),$("#shortDescription").attr("maxlength",800);var e=new Quill("#termConditionId",{modules:{toolbar:[[{header:[1,2,!1]}],["bold","italic","underline"],["image","code-block"]]},placeholder:"Terms & Conditions",theme:"snow"});e.on("text-change",(function(t,r,i){0===e.getText().trim().length&&e.setContents([{insert:""}])}));var t=new Quill("#privacyPolicyId",{modules:{toolbar:[[{header:[1,2,!1]}],["bold","italic","underline"],["image","code-block"]]},placeholder:"Privacy Policy",theme:"snow"});t.on("text-change",(function(e,r,i){0===t.getText().trim().length&&t.setContents([{insert:""}])}));var r=document.createElement("textarea");r.innerHTML=termConditionData,e.root.innerHTML=r.value,r.innerHTML=privacyPolicyData,t.root.innerHTML=r.value,$(document).on("submit","#addCMSForm",(function(){var r=""===$("#aboutTitleId").val().trim().replace(/ \r\n\t/g,""),i=""===$("#shortDescription").val().trim().replace(/ \r\n\t/g,"");if(r)return displayErrorMessage("About Title field is not contain only white space"),!1;if(i)return displayErrorMessage("About Short Description field is not contain only white space"),!1;if(""===$("#aboutExperience").val())return displayErrorMessage("About Experience field is required."),!1;var n=document.createElement("textarea"),o=e.root.innerHTML;n.innerHTML=o;var a=t.root.innerHTML;return 0===e.getText().trim().length?(displayErrorMessage("The Terms & Conditions is required."),!1):0===t.getText().trim().length?(displayErrorMessage("The Privacy Policy is required."),!1):($("#termData").val(JSON.stringify(o)),void $("#privacyData").val(JSON.stringify(a)))}))}))})();