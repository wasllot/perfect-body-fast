(()=>{"use strict";function t(t){$.ajax({type:"POST",url:route("razorpay.failed"),data:{data:t},success:function(t){t.success&&displaySuccessMessage(t.message)},error:function(){}})}$(document).ready((function(){var t,e,a=(new Date).getTimezoneOffset();a=0===a?0:-a,$("#date").flatpickr({minDate:new Date,disableMobile:!0}),setTimeout((function(){isEdit&&($("#date").val(date).trigger("change"),$("#serviceId").trigger("change"))}),1e3),$(".no-time-slot").removeClass("d-none"),$(document).on("change","#date",(function(){t=$(this).val(),$("#slotData").html("");var e=isEmpty(userRole)?route("doctor-session-time"):route("patients.doctor-session-time");$.ajax({url:e,type:"GET",data:{doctorId:$("#doctorId").val(),date:t,timezone_offset_minutes:a},success:function(t){t.success&&$.each(t.data.slots,(function(e,a){isEdit&&fromTime==a?($(".no-time-slot").addClass("d-none"),$("#slotData").append('<span class="time-slot col-2  activeSlot" data-id="'+a+'">'+a+"</span>")):($(".no-time-slot").addClass("d-none"),null==t.data.bookedSlot?$("#slotData").append('<span class="time-slot col-2" data-id="'+a+'">'+a+"</span>"):-1!==$.inArray(a,t.data.bookedSlot)?$("#slotData").append('<span class="time-slot col-2 bookedSlot " data-id="'+a+'">'+a+"</span>"):$("#slotData").append('<span class="time-slot col-2" data-id="'+a+'">'+a+"</span>"))}))},error:function(t){displayErrorMessage(t.responseJSON.message)}})})),$(document).on("click",".time-slot",(function(){$(".time-slot").hasClass("activeSlot")?($(".time-slot").removeClass("activeSlot"),$(this).addClass("activeSlot")):$(this).addClass("activeSlot");var t=$(this).attr("data-id").split("-"),e=t[0],a=t[1];$("#timeSlot").val(""),$("#toTime").val(""),$("#timeSlot").val(e),$("#toTime").val(a)}));var o;parseInt($("#addFees").val());$(document).on("change","#doctorId",(function(){$("#chargeId").val(""),$("#payableAmount").val(""),$("#date").val(""),$("#addFees").val(""),$("#slotData").html(""),$(".no-time-slot").removeClass("d-none");var t=isEmpty(userRole)?route("get-service"):route("patients.get-service");$.ajax({url:t,type:"GET",data:{doctorId:$(this).val()},success:function(t){t.success&&($("#date").removeAttr("disabled"),$("#serviceId").empty(),$("#serviceId").append($('<option value=""></option>').text("Select Service")),$.each(t.data,(function(t,e){$("#serviceId").append($("<option></option>").attr("value",e.id).text(e.name))})))}})})),$(document).on("change","#serviceId",(function(){var t=isEmpty(userRole)?route("get-charge"):route("patients.get-charge");$.ajax({url:t,type:"GET",data:{chargeId:$(this).val()},success:function(t){t.success&&($("#chargeId").val(""),$("#addFees").val(""),$("#payableAmount").val(""),t.data&&($("#chargeId").val(t.data.charges),$("#payableAmount").val(t.data.charges),e=t.data.charges))}})})),$(document).on("keyup","#addFees",(function(t){8!=t.which&&isNaN(String.fromCharCode(t.which))&&t.preventDefault(),o="",o=parseFloat(e)+parseFloat($(this).val()?$(this).val():0),$("#payableAmount").val(o.toFixed(2))}))})),$(document).on("submit","#addAppointmentForm",(function(e){e.preventDefault();var a=new FormData($(this)[0]),o=$(this).find("#submitBtn");setAdminBtnLoader(o),$.ajax({url:$(this).attr("action"),type:"POST",data:a,processData:!1,contentType:!1,success:function(e){if(e.success){var a=e.data.appointmentId;if(displaySuccessMessage(e.message),$("#addAppointmentForm")[0].reset(),$("#doctorId").val("").trigger("change"),e.data.payment_type==paystack)return location.href=e.data.redirect_url;if(e.data.payment_type==paytmMethod&&window.location.replace(route("paytm.init",{appointmentId:a})),e.data.payment_type==authorizeMethod)return location.href=route("authorize.init",{appointmentId:a});if(e.data.payment_type==paypal&&$.ajax({type:"GET",url:route("paypal.init"),data:{appointmentId:a},success:function(t){if(201==t.statusCode){var e="";$.each(t.result.links,(function(t,a){"approve"==a.rel&&(e=a.href)})),location.href=e}},error:function(t){},complete:function(){}}),e.data.payment_type==manually&&setTimeout((function(){location.href=e.data.url}),1500),e.data.payment_type==stripeMethod){var o=e.data[0].sessionId;stripe.redirectToCheckout({sessionId:o}).then((function(t){manageAjaxErrors(t)}))}e.data.payment_type==razorpayMethod&&$.ajax({type:"POST",url:route("razorpay.init"),data:{appointmentId:a},success:function(e){if(e.success){var o=e.data,s=o.id,n=o.amount,i=o.name,r=o.email,d=o.contact;options.amount=n,options.order_id=s,options.prefill.name=i,options.prefill.email=r,options.prefill.contact=d,options.prefill.appointmentID=a;var c=new Razorpay(options);c.open(),c.on("payment.failed",t)}},error:function(t){},complete:function(){}})}},error:function(t){displayErrorMessage(t.responseJSON.message)},complete:function(){setAdminBtnLoader(o)}})}))})();