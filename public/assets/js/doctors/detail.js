(()=>{"use strict";$(document).ready((function(){var t=moment().startOf("week"),e=moment().endOf("week"),a=$("#patientAppointmentDateFilter");function n(t,e){a.html(t.format("YYYY-MM-DD")+" - "+e.format("YYYY-MM-DD"))}a.daterangepicker({startDate:t,endDate:e,ranges:{Today:[moment(),moment()],Yesterday:[moment().subtract(1,"days"),moment().subtract(1,"days")],"This Week":[moment().startOf("week"),moment().endOf("week")],"Last 30 Days":[moment().subtract(29,"days"),moment()],"This Month":[moment().startOf("month"),moment().endOf("month")],"Last Month":[moment().subtract(1,"month").startOf("month"),moment().subtract(1,"month").endOf("month")]}},n),n(t,e);var o=1==doctorRole?route("doctors.doctors.appointment"):route("doctors.appointment"),c=$("#doctorAppointmentDataTable").DataTable({deferRender:!0,processing:!0,serverSide:!0,searchDelay:500,language:{lengthMenu:"Show _MENU_"},order:[1,"desc"],ajax:{url:o,data:function(t){t.status=$("#appointmentStatus").find("option:selected").val(),t.doctorId=doctorID,t.filter_date=a.val()}},columnDefs:[{targets:[0],width:"30%"},{targets:[1],width:"30%"},{targets:[2],width:"20%"},{targets:[3],width:"8%",className:"text-center pr-0"}],columns:[{data:function(t){return'<div class="symbol symbol-circle symbol-50px overflow-hidden me-3">\n                        <div class="symbol-label">\n                            <img src="'.concat(t.patient.profile,'" alt=""\n                                 class="w-100 object-cover">\n                        </div>\n                    </div>\n                    <div class="d-inline-block align-top">\n                        <a href="').concat(1==doctorRole?route("doctors.patient.detail",t.patient.id):route("patients.show",t.patient.id),'"\n                           class="text-primary-800 mb-1 d-block">').concat(t.patient.user.full_name,'</a>\n                           <span class="d-block text-muted fw-bold">').concat(t.patient.user.email,"</span>\n                    </div>")},name:"patient.user.full_name"},{data:function(t){return'<span class="badge badge-light-info">'.concat(moment(t.date).format("Do MMM, Y ")," ").concat(t.from_time," ").concat(t.from_time_type," - ").concat(t.to_time," ").concat(t.to_time_type,"</span>")},name:"date"},{data:function(t){var e=t.status;return'\n                            <div class="w-150px d-flex align-items-center">\n                            <span class="slot-color-dot bg-'.concat(["danger","primary","success","warning","danger"][e],' rounded-circle me-2"></span>\n                            <select class="form-select-sm form-select-solid form-select status-change appointment-status" data-id="').concat(t.id,'">\n                                    <option class="booked" disabled value="').concat(book,'" ').concat(t.status==book?"selected":"",'>Booked</option>\n                                    <option value="').concat(checkIn,'" ').concat(t.status==checkIn?"selected":""," ").concat(t.status==checkIn?"selected":""," ").concat(t.status==cancel||t.status==checkOut?"disabled":"",'>Check In</option>\n                                    <option value="').concat(checkOut,'" ').concat(t.status==checkOut?"selected":""," ").concat(t.status==cancel||t.status==book?"disabled":"",'>Check Out</option>\n                                    <option value="').concat(cancel,'" ').concat(t.status==cancel?"selected":""," ").concat(t.status==checkIn?"disabled":""," ").concat(t.status==checkOut?"disabled":"",">Cancelled</option>\n                            </select>\n                            </div>")},name:"status"},{data:function(t){var e=[{id:t.id,role:userRole,showUrl:route("appointments.show",t.id)}];return prepareTemplateRender("#appointmentsTemplate",e)},name:"id"}],fnInitComplete:function(){$("#appointmentStatus").change((function(){$("#filter").removeClass("show"),$("#filterBtn").removeClass("show"),$("#doctorAppointmentDataTable").DataTable().ajax.reload(null,!0)})),$("#patientAppointmentDateFilter").change((function(){$("#doctorAppointmentDataTable").DataTable().ajax.reload(null,!0)}))},drawCallback:function(){$(".appointment-status").select2()}});handleSearchDatatable(c)})),$(document).on("click",".delete-btn",(function(t){var e=$(t.currentTarget).data("id"),a=isEmpty(userRole)?route("appointments.destroy",e):route("patients.appointments.destroy",e);deleteItem(a,"#doctorAppointmentDataTable","Appointment")})),$(document).on("change",".status-change",(function(){var t=$(this).val(),e=$(this).data("id"),a=$(this);$.ajax({url:route("change-status",e),type:"POST",data:{appointmentId:e,appointmentStatus:t},success:function(t){$(a).children("option.booked").addClass("hide"),$("#doctorAppointmentDataTable").DataTable().ajax.reload(null,!0),displaySuccessMessage(t.message)}})})),$(document).on("click","#resetFilter",(function(){$("#appointmentStatus").val(book).trigger("change"),$("#patientAppointmentDateFilter").val(moment().startOf("week").format("MM/DD/YYYY")+" - "+moment().endOf("week").format("MM/DD/YYYY")).trigger("change")}))})();