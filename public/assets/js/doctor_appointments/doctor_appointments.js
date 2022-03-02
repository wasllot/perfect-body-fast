(()=>{"use strict";$(document).ready((function(){var t=moment().startOf("week"),e=moment().endOf("week"),a=$("#appointmentDate");function n(t,e){a.html(t.format("YYYY-MM-DD")+" - "+e.format("YYYY-MM-DD"))}a.daterangepicker({startDate:t,endDate:e,ranges:{Today:[moment(),moment()],Yesterday:[moment().subtract(1,"days"),moment().subtract(1,"days")],"This Week":[moment().startOf("week"),moment().endOf("week")],"Last 30 Days":[moment().subtract(29,"days"),moment()],"This Month":[moment().startOf("month"),moment().endOf("month")],"Last Month":[moment().subtract(1,"month").startOf("month"),moment().subtract(1,"month").endOf("month")]}},n),n(t,e);var o=$("#doctorAppointmentTable").DataTable({processing:!0,serverSide:!0,searchDelay:500,language:{lengthMenu:"Show _MENU_"},order:[[1,"desc"]],ajax:{url:route("doctors.appointments"),data:function(t){t.status=$("#doctorAppointmentStatus").find("option:selected").val(),t.payment_type=$("#doctorPaymentStatus").find("option:selected").val(),t.filter_date=a.val()}},columnDefs:[{targets:[0],width:"25%"},{targets:[1],width:"20%"},{targets:[3],width:"15%",className:"text-center",searchable:!1},{targets:[4],orderable:!1,searchable:!1},{targets:[5],className:"text-center",orderable:!1}],columns:[{data:function(t){return'<div class="symbol symbol-circle symbol-50px overflow-hidden me-3">\n                            <div class="symbol-label">\n                                <img src="'.concat(t.patient.profile,'" alt=""\n                                     class="w-100 object-cover  ">\n                            </div>\n                    </div>\n                    <div class="d-inline-block align-top">\n                        <a class="text-primary-800 mb-1 d-block">').concat(t.patient.user.full_name,'</a>\n                        <span class="d-block text-muted fw-bold">').concat(t.patient.user.email,"</span>\n                    </div>")},name:"patient.user.full_name"},{data:function(t){return'<div class="badge badge-light-info">\n                                <div class="mb-2">'.concat(t.from_time," ").concat(t.from_time_type," - ").concat(t.to_time," ").concat(t.to_time_type,'</div>\n                                <div class="">').concat(moment(t.date).format("Do MMM, Y "),"</div>\n                            </div>")},name:"date"},{data:function(t){return currencyIcon+" "+addCommas(t.payable_amount)},name:"payable_amount"},{data:function(t){return'\n                        <select class="form-select-sm form-select-solid form-select change-payment-status payment-status" data-id="'.concat(t.id,'">\n                                <option value="').concat(paid,'" ').concat(t.payment_type==paid?"selected":"",'>Paid</option>\n                                <option value="').concat(pending,'" ').concat(t.payment_type==paid?"disabled":"selected",">Pending</option>\n                        </select>")},name:"payment_type"},{data:function(t){var e=t.status;return'\n                            <div class="w-150px d-flex align-items-center">\n                            <span class="slot-color-dot bg-'.concat(["danger","primary","success","warning","danger"][e],' rounded-circle me-2"></span>\n                            <select class="form-select-sm form-select-solid form-select status-change doctor-appointment-status" data-id="').concat(t.id,'">\n                                    <option class="booked" disabled value="').concat(book,'" ').concat(t.status==book?"selected":"",'>Booked</option>\n                                    <option value="').concat(checkIn,'" ').concat(t.status==checkIn?"selected":""," ").concat(t.status==checkIn?"selected":""," ").concat(t.status==cancel||t.status==checkOut?"disabled":"",'>Check In</option>\n                                    <option value="').concat(checkOut,'" ').concat(t.status==checkOut?"selected":""," ").concat(t.status==cancel||t.status==book?"disabled":"",'>Check Out</option>\n                                    <option value="').concat(cancel,'" ').concat(t.status==cancel?"selected":""," ").concat(t.status==checkIn?"disabled":""," ").concat(t.status==checkOut?"disabled":"",">Cancelled</option>\n                            </select>\n                            </div>")},name:"status"},{data:function(t){var e=[{id:t.id,showUrl:route("doctors.appointment.detail",t.id)}];return prepareTemplateRender("#appointmentsTemplate",e)},name:"id"}],fnInitComplete:function(){$("#doctorAppointmentStatus").change((function(){$("#filter").removeClass("show"),$("#filterBtn").removeClass("show"),$("#doctorAppointmentTable").DataTable().ajax.reload(null,!0)})),$("#doctorPaymentStatus").change((function(){$("#filter").removeClass("show"),$("#filterBtn").removeClass("show"),$("#doctorAppointmentTable").DataTable().ajax.reload(null,!0)})),$("#appointmentDate").change((function(){$("#doctorAppointmentTable").DataTable().ajax.reload(null,!0)}))},drawCallback:function(){$(".payment-status, .doctor-appointment-status").select2()}});handleSearchDatatable(o),$(document).on("click","#resetFilter",(function(){$("#doctorPaymentStatus").val(allPaymentCount).trigger("change"),$("#doctorAppointmentStatus").val(book).trigger("change"),a.data("daterangepicker").setStartDate(moment().startOf("week").format("MM/DD/YYYY")),a.data("daterangepicker").setEndDate(moment().endOf("week").format("MM/DD/YYYY"))}))})),$(document).on("change",".status-change",(function(){var t=$(this).val(),e=$(this).data("id"),a=$(this);$.ajax({url:route("doctors.change-status",e),type:"POST",data:{appointmentId:e,appointmentStatus:t},success:function(t){$(a).children("option.booked").addClass("hide"),$("#doctorAppointmentTable").DataTable().ajax.reload(null,!0),displaySuccessMessage(t.message)}})})),$(document).on("change",".change-payment-status",(function(){var t=$(this).val(),e=$(this).data("id");$("#paymentStatusModal").modal("show").appendTo("body"),$("#paymentStatus").val(t),$("#appointmentId").val(e)})),$(document).on("submit","#paymentStatusForm",(function(t){t.preventDefault();var e=$("#paymentStatus").val(),a=$("#appointmentId").val(),n=$("#paymentType").val();$.ajax({url:route("doctors.change-payment-status",a),type:"POST",data:{appointmentId:a,paymentStatus:e,paymentMethod:n},success:function(t){t.success&&(displaySuccessMessage(t.message),$("#paymentStatusModal").modal("hide"),location.reload())},error:function(t){displayErrorMessage(t.responseJSON.message)}})}))})();