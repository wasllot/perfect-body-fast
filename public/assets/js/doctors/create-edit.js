(()=>{"use strict";$(document).ready((function(){$("#dob").flatpickr({maxDate:new Date,disableMobile:!0});var e,t,a,i,r,n=!1,o=[],l=1;$(".showQualification").hide(),$(document).on("click","#addQualification",(function(){n=!1,$("#degree").val(""),$("#university").val(""),$("#year").val("").trigger("change"),$(".showQualification").slideToggle(500)})),$(document).on("click","#cancelQualification",(function(){$(".showQualification").slideUp(500)})),$(document).on("click","#saveQualification",(function(o){o.preventDefault(),e=$("#degree").val(),t=$("#university").val(),a=$("#year").val();var s=$("#doctorQualificationTbl tr:last-child td:first-child").html();++s&&(l=s);var c={id:r,degree:e,year:a,university:t},d={id:l,degree:e,year:a,university:t},u=""===$("#degree").val().trim().replace(/ \r\n\t/g,""),g=""===$("#university").val().trim().replace(/ \r\n\t/g,""),p=""===$("#year").val().trim().replace(/ \r\n\t/g,"");if(u)return displayErrorMessage("The degree field is required."),!1;if(g)return displayErrorMessage("The university is required."),!1;if(p)return displayErrorMessage("The year is required."),!1;null==i?qualification.push(c):qualification[i-1]=c;var v=prepareTemplateRender("#qualificationTemplateData",d);if(0==n)$("tbody").append(v),l++;else if(1==n){var f=prepareTemplateRender("#qualificationTemplateData",{id:i,degree:e,year:a,university:t}),m=$("table tbody");$(m).find("tr").each((function(e,t){(e+=1)==i&&$("tbody").find(t).replaceWith(f)}))}$(".showQualification").slideUp(500),$("#degree").val(""),$("#university").val(""),$("#year").val("")})),$(document).on("click",".delete-btn-qualification",(function(e){$("#degree").val(""),$("#university").val(""),$("#year").val("").trigger("change"),qualification.pop([0]),$(".showQualification").slideUp(500);var t=$(this),a=$(this).data("id"),i="Qualification";Swal.fire({title:"Delete !",text:'Are you sure want to delete this "'+i+'" ?',type:"warning",icon:"warning",showCancelButton:!0,closeOnConfirm:!1,confirmButtonColor:"#266CB0",showLoaderOnConfirm:!0,cancelButtonText:"No, Cancel",confirmButtonText:"Yes, Delete!"}).then((function(e){e.isConfirmed&&(o.push(a),$("#deletedQualifications").val(o),t.parent().parent().remove().remove(),Swal.fire({title:"Deleted!",text:i+" has been deleted.",icon:"success",confirmButtonColor:"#266CB0",timer:2e3}))}))})),$(document).on("click",".edit-btn-qualification",(function(){$("#degree").val(""),$("#university").val(""),$("#year").val(""),i=$(this).data("id"),r=$(this).data("primary-id");var e=$(this).closest("tr"),t=e.find("td:eq(1)").text(),a=e.find("td:eq(2)").text(),o=e.find("td:eq(3)").text();$("#degree").val(t),$("#university").val(a),$("#year").val(o).trigger("change"),n=!0,$(".showQualification").slideToggle(500)})),$(document).on("submit","#editDoctorForm",(function(e){e.preventDefault();var t=new FormData($(this)[0]);t.append("qualifications",JSON.stringify(qualification)),$.ajax({url:route("doctors.update",uId),type:"POST",data:t,contentType:!1,processData:!1,success:function(e){e.success&&(window.location.href=route("doctors.index"))},error:function(e){displayErrorMessage(e.responseJSON.message)}})})),$("input[type=radio][name=gender]").on("change",(function(){var e=$("#profilePicture").val();isEmpty(e)&&(1==this.value?$(".image-input-wrapper").attr("style","background-image:url("+manAvatar+")"):2==this.value&&$(".image-input-wrapper").attr("style","background-image:url("+womanAvatar+")"))})),$("#countryId").on("change",(function(){$.ajax({url:route("get-state"),type:"get",dataType:"json",data:{data:$(this).val()},success:function(e){$("#stateId").empty(),$("#stateId").append($('<option value=""></option>').text("Select State")),$.each(e.data,(function(e,t){$("#stateId").append($("<option></option>").attr("value",e).text(t))})),isEdit&&stateId&&$("#stateId").val(stateId).trigger("change")}})})),$("#stateId").on("change",(function(){$.ajax({url:route("get-city"),type:"get",dataType:"json",data:{state:$(this).val(),country:$("#countryId").val()},success:function(e){$("#cityId").empty(),$.each(e.data,(function(e,t){$("#cityId").append($("<option ></option>").attr("value",e).text(t))})),isEdit&&cityId&&$("#cityId").val(cityId).trigger("change")}})})),isEdit&countryId&&$("#countryId").val(countryId).trigger("change")})),$(document).on("keyup","#twitterUrl",(function(){this.value=this.value.toLowerCase()})),$(document).on("keyup","#linkedinUrl",(function(){this.value=this.value.toLowerCase()})),$(document).on("keyup","#instagramUrl",(function(){this.value=this.value.toLowerCase()})),$("#createDoctorForm,#editDoctorForm").on("submit",(function(){var e=$("#twitterUrl").val(),t=$("#linkedinUrl").val(),a=$("#instagramUrl").val(),i=new RegExp(/^(https?:\/\/)?((m{1}\.)?)?((w{2,3}\.)?)twitter.[a-z]{2,3}\/?.*/i),r=new RegExp(/^(https?:\/\/)?((w{2,3}\.)?)linkedin\.[a-z]{2,3}\/?.*/i),n=new RegExp(/^(https?:\/\/)?((m{1}\.)?)?((w{2,3}\.)?)instagram.[a-z]{2,3}\/?.*/i);return""!=e&&!e.match(i)?(displayErrorMessage("Please enter a valid Twitter Url"),!1):""!=t&&!t.match(r)?(displayErrorMessage("Please enter a valid Linkedin Url"),!1):""==a||!!a.match(n)?""!==$("#error-msg").text()?($("#phoneNumber").focus(),displayErrorMessage("Contact number is "+$("#error-msg").text()),!1):void 0:(displayErrorMessage("Please enter a valid Instagram Url"),!1)})),$(document).on("click",".removeAvatarIcon",(function(){$("#bgImage").css("background-image",""),$("#bgImage").css("background-image","url("+backgroundImg+")"),$("#removeAvatar").remove()}))})();