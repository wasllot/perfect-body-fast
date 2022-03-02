(()=>{"use strict";var e="#doctorTable";$(document).ready((function(){var a=$(e).DataTable({deferRender:!0,processing:!0,serverSide:!0,searchDelay:500,language:{lengthMenu:"Show _MENU_"},order:[[4,"desc"]],ajax:{url:route("doctors.index"),data:function(e){e.status=$("#doctorStatus").find("option:selected").val()}},columnDefs:[{targets:[0],width:"30%"},{targets:[4],width:"20%",className:"text-center"},{targets:[1],width:"5%",orderable:!1,searchable:!1},{targets:[5],width:"13%",class:"text-center",orderable:!1,searchable:!1},{targets:[3],orderable:!1,className:"text-center"},{targets:[2],orderable:!1,searchable:!1}],columns:[{data:function(e){var a=calculateAvgRating(e.reviews);return'<div class="symbol symbol-circle symbol-50px overflow-hidden me-3">\n                        <div class="symbol-label">\n                            <img src="'.concat(e.user.profile_image,'" alt=""\n                                 class="w-100 object-cover">\n                        </div>\n                    </div>\n                    <div class="d-inline-block align-top">\n                        <div class="d-inline-block align-self-center d-flex">\n                            <a href="').concat(route("doctors.show",e.id),'"\n                            class="text-primary-800 mb-1 d-inline-block align-self-center">').concat(e.user.full_name,'</a>\n                            <div class="star-ratings d-inline-block align-self-center ms-2">\n                                <div class="fill-ratings" style="width: ').concat(a,'%;">\n                                    <span>★★★★★</span>\n                                </div>\n                            </div>\n                        </div>\n                        <span class="d-block text-muted fw-bold">').concat(e.user.email,"</span>\n                    </div>")},name:"user.full_name"},{data:function(e){var a=[{id:e.user.id,status:e.user.status}];return prepareTemplateRender("#changeDoctorStatus",a)},name:"user.status"},{data:function(e){return'<div class="form-check form-switch form-check-custom form-check-solid justify-content-center">\n                            <input class="form-check-input h-20px w-30px email-verified" data-id="'.concat(e.user.id,'" type="checkbox" value=""\n                               ').concat(e.user.email_verified_at?"checked":""," />\n                            </div>")},name:"user.id"},{data:function(e){return'<td class=" text-center action-table-btn">\n                        <a title="Impersonate '.concat(e.user.full_name,'" class="btn btn-sm btn-primary" href="').concat(route("impersonate",e.user.id),'">\n                            Impersonate\n                        </a>\n                        </td>')},name:"user.id"},{data:function(e){return e},render:function(e){return null===e.created_at?"N/A":'<span class="badge badge-light-info">'.concat(moment.parseZone(e.created_at).format("Do MMM, Y h:mm A"),"</span>")},name:"created_at"},{data:function(e){var a=[{id:e.id,userId:e.user_id,editUrl:route("doctors.edit",e.id)}];return prepareTemplateRender("#userActionTemplate",a)},name:"id"}],fnInitComplete:function(){$("#doctorStatus").change((function(){$("#filter").removeClass("show"),$("#filterBtn").removeClass("show"),$("#doctorTable").DataTable().ajax.reload(null,!0)}))}});handleSearchDatatable(a)})),$(document).on("click","#resetFilter",(function(){$("#doctorStatus").val(all).trigger("change")})),$(document).on("click",".delete-btn",(function(){var e=$(this).attr("data-id"),a=route("doctors.destroy",e);deleteItem(a,"#doctorTable","Doctor")})),$(document).on("click",".add-qualification",(function(){var e=$(this).attr("data-id");$("#qualificationID").val(e),$("#qualificationModal").modal("show")})),$(document).on("submit","#qualificationForm",(function(a){a.preventDefault(),$.ajax({url:route("add.qualification"),type:"POST",data:$(this).serialize(),success:function(a){a.success&&(displaySuccessMessage(a.message),$("#year").val(null).trigger("change"),$("#qualificationModal").modal("hide"),$(e).DataTable().ajax.reload(null,!1))},error:function(e){displayErrorMessage(e.responseJSON.message)}})})),$("#qualificationModal").on("hidden.bs.modal",(function(){resetModalForm("#qualificationForm"),$("#year").val(null).trigger("change")})),$(document).on("click",".doctor-status",(function(a){var t=$(a.currentTarget).data("id");$.ajax({type:"PUT",url:route("doctor.status"),data:{id:t},success:function(a){$(e).DataTable().ajax.reload(null,!1),displaySuccessMessage(a.message)}})})),$(document).on("change",".email-verified",(function(a){var t=$(a.currentTarget).data("id"),n=$(this).is(":checked")?1:0;$.ajax({type:"POST",url:route("emailVerified"),data:{id:t,value:n},success:function(a){$(e).DataTable().ajax.reload(null,!1),displaySuccessMessage(a.message)}})}))})();